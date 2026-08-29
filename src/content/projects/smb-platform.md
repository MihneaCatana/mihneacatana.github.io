---
title: SMB Management Platform
description: A multi-tenant SaaS platform for small-business management — appointments, CRM, and scheduling — with one physically isolated PostgreSQL database per tenant.
year: 2026
role: Solo — architecture, backend, frontend, infrastructure
stack:
  - React
  - Fastify
  - TypeScript
  - PostgreSQL
  - Docker
repo: https://github.com/MihneaCatana/multi-tenants-scheduler-app
image: /images/projects/smb-platform.svg
order: 2
featured: true
---

Small businesses run on appointments, customers, and calendars — and most of the software that ties those together treats them as an afterthought. This platform is my take: a multi-tenant SaaS for SMB management where each business gets its own subdomain, its own data, and a scheduling engine that doesn't drop the thread.

It's the most infrastructure-serious thing I've built alone, and the interesting parts are exactly the ones you can't see from the UI. The whole architecture is documented — what follows is the short version.

## Under the hood

### Two clusters, one request

Every tenant's business data lives in **its own PostgreSQL database** on a dedicated tenant cluster, physically separate from the global cluster that holds the control plane (tenant registry, platform admins, sessions, feature flags). Tenant identity is resolved per-request by a Fastify hook:

```text
acme.platform.example                 ← subdomain = tenant
   │
   ▼
tenantPlugin (onRequest)
   1. extract subdomain from Host
   2. look up tenants table (global DB)
   3. resolve per-tenant feature flags
   │
   ▼
req.tenant      ← tenant row (id, dbName, status)
req.tenantDb    ← Drizzle instance for tenant_acme
req.tenantFlags ← { appointments: true, ... }
```

From that point down, a request physically cannot touch another tenant's data — there is no `WHERE tenant_id = ?` to forget, because there's no shared database at all.

### Provisioning a tenant, end to end

Creating a tenant is a seven-step transactional flow: validate the subdomain (format + uniqueness), create the database **from a template**, create the tenant's PostgreSQL roles, apply grants, run migrations, register the tenant in the global registry, and seed its owner account. If any step fails after the database exists, the flow drops the database and both roles — no orphans, and a retry starts clean.

### Credentials with no vault to rob

Per-tenant database passwords are never stored. They're derived on demand:

```text
owner_pw = HMAC-SHA256(OWNER_MASTER_KEY, tenantId)
app_pw   = HMAC-SHA256(APP_MASTER_KEY,   tenantId)
```

A leaked global dump is useless without the master keys; the master keys alone are useless without tenant IDs; rotation is one key change plus an `ALTER ROLE` loop. Each tenant gets two roles — `owner` (DDL) and `app` (DML only) — and the same app/migrate/admin privilege split protects the global cluster. The blast radius is deliberate: a compromised tenant `app` credential reaches exactly one tenant's data and nothing else, and even the global cluster's superuser cannot reach the tenant cluster, because they're separate PostgreSQL instances.

### Trust, but rate-limit

- **Anti-enumeration** — unknown subdomains return 404, not 403, so probes can't distinguish "doesn't exist" from "exists but hidden"; a per-IP limiter starts returning 429 after a handful of unknown-subdomain probes per minute.
- **Auth** — EdDSA JWTs, access token held in memory only, refresh through an HttpOnly cookie, with the refresh-token hash stored server-side so sessions can be revoked.
- **Suspension** — suspending a tenant flips its status and revokes every refresh token in one move.

### The appointment engine

Scheduling is a proper state machine — `requested → confirmed → checked_in → in_progress → completed` — driven by a single `PATCH` endpoint whose actions are a discriminated union, so the API surface stays one route while the transitions stay explicit and auditable. Every status change writes to a history table: who, what, when.

### The layer around the logic

The backend is Fastify 5 in strict layers — plugins (security, auth, tenant, errors) → thin declarative routes → controllers → framework-agnostic domain modules → Drizzle ORM — with per-tenant connection pools behind an LRU cache and Zod-validated configuration. The frontend is React 18 with PrimeReact and TanStack Query, built for the table-and-form workflows a management platform actually is. Operations: GPG-encrypted `pg_dump` backups per cluster on daily rotation, Docker Compose on a single VPS, nginx/Caddy doing TLS and host routing.

## Outcome

- A tenant provisions end-to-end — subdomain, isolated database, roles, owner account — with no manual steps and no orphaned state on failure
- Scheduling, CRM, staff, availability, and resource booking running against the isolated data model
- A written operations manual covering deployment, backups and restore, database access, and the isolation model — written for future-me, useful for anyone else

## What I'd do differently

Feature flags and the admin provisioning flow went in later than they should have. On a multi-tenant system, the mechanics of turning things on and off per tenant deserve to be architecture, not an afterthought.
