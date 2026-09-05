# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured for this Astro portfolio: Session Replay, Error Tracking, and Support are enabled, alongside health, error, and support signal sources. Six scheduled scouts and two Replay Vision monitors are armed; findings will begin appearing in the [Self-driving inbox](https://eu.posthog.com/project/267045/inbox) within about 30 minutes once data is available.

## AI data processing

Approved by the organization-level wizard gate.

## GitHub

Connected before this setup through the PostHog GitHub App. GitHub Issues was not selected as a Self-driving source in this run.

## Products enabled

| Product | Result | Client check / note |
| --- | --- | --- |
| Session Replay | enabled | Web app uses `posthog-js`; its init has no `disable_session_recording: true` override. No recordings existed at setup time. |
| Error Tracking | enabled | Web app init has no `capture_exceptions: false` override. |
| Support | enabled | Connect an inbound email, inbox, or Slack channel in PostHog before tickets can arrive. |

## Signal sources

| Signal source | Action | Details |
| --- | --- | --- |
| `signals_scout` / `cross_source_issue` | enabled by default | No config row is required; scout findings can reach the inbox. |
| `health_checks` / `health_issue` | enabled | Source id `01a07279-fb2d-7818-82a5-f87465e548d3`. |
| `error_tracking` / `issue_created` | enabled | Source id `01a07279-fc44-7043-b0a4-955543205a2b`. |
| `error_tracking` / `issue_reopened` | enabled | Source id `01a07279-fbfb-733a-98c3-2ed01bd7005b`. |
| `error_tracking` / `issue_spiking` | enabled | Source id `01a07279-fb10-747d-a309-2c539bf40b90`. |
| `conversations` / `ticket` | enabled | Source id `01a07279-fbe2-7d54-841e-a6ceb56db99b`; remains idle until an inbound Support channel is connected. |
| Replay Vision | configured separately | The two scanner configurations below are its signal route; no signal-source row is needed. |

## Connected tools

No external connected-tool sources were selected. GitHub Issues, Linear, Jira, Sentry, and Zendesk are therefore not used as Self-driving responders.

## Scout troop

**Run budget:** 100 runs/day; 0 used at setup and 100 remaining. Announcement: “Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.”

### Active scouts

| Scout | What it watches |
| --- | --- |
| `signals-scout-general` | Cross-product patterns and surfaces without a specialist. |
| `signals-scout-web-analytics` | Traffic, attribution, landing-page health, bounce, and 404 changes. |
| `signals-scout-web-vitals` | Page-level Core Web Vitals regressions. |
| `signals-scout-product-analytics` | Visitor-flow metrics and saved product-analysis flows. |
| `signals-scout-contact-intent` | Contact-address opens and copies, normalized by healthy traffic. |
| `signals-scout-portfolio-conversion` | Case-study views to live/source-link click-through, per project and link type. |

### Disabled built-in scouts

| Scout | Reason |
| --- | --- |
| `signals-scout-ai-observability` | No LLM observability evidence. |
| `signals-scout-anomaly-detection` | No established dashboard or insight inventory yet. |
| `signals-scout-apm` | No tracing/APM evidence. |
| `signals-scout-conversations` | Support source is enabled, but no inbound channel exists yet. |
| `signals-scout-csp-violations` | No CSP reporting evidence. |
| `signals-scout-customer-analytics` | No account/group analytics evidence. |
| `signals-scout-data-pipelines` | No pipeline or export evidence. |
| `signals-scout-data-warehouse` | No warehouse source is connected. |
| `signals-scout-error-tracking` | Covered by the native Error Tracking source. |
| `signals-scout-experiments` | No active experiment evidence. |
| `signals-scout-feature-flags` | No feature-flag evidence. |
| `signals-scout-health-checks` | Native health source already captures setup health. |
| `signals-scout-inbox-validation` | Fresh setup has no resolved reports to validate. |
| `signals-scout-insight-alerts` | No configured insight alerts. |
| `signals-scout-logs` | No Logs product evidence. |
| `signals-scout-mcp-tool-calls` | No MCP-tool telemetry surface in this project. |
| `signals-scout-observability-gaps` | Kept selective while the two custom conversion scouts establish coverage. |
| `signals-scout-replay-vision` | No accumulated Replay Vision observations yet. |
| `signals-scout-revenue-analytics` | No payment or revenue evidence. |
| `signals-scout-session-replay` | Covered by the Replay Vision scanners below. |
| `signals-scout-skills-store` | No skills-store maintenance surface was identified. |
| `signals-scout-surveys` | No surveys exist. |
| `signals-scout-tasks` | No PostHog Tasks usage was identified. |

## Custom scouts

| Scout | Surface and discriminator | Why it is distinct |
| --- | --- | --- |
| `signals-scout-contact-intent` | Contact actions per healthy traffic, plus the address-open versus copy-method split. | Built-in web analytics detects traffic changes but does not detect contact conversion dropping while traffic holds. |
| `signals-scout-portfolio-conversion` | Outbound live/source-link click-through per case-study view, including project and link-type share shifts. | Built-in product analytics monitors saved flows; this is the portfolio’s explicit, source-defined case-study conversion journey. |

Both were explicitly approved. They use aggregate data only, require schema confirmation before querying, keep personal data out of reports and memory, and treat ingested content as untrusted data. If either becomes noisy, set its config `emit` value to `false` in PostHog to switch it to dry-run.

Considered but ruled out: a blog-engagement scout lacks a concrete terminal engagement action beyond navigation; generic traffic and vitals are already covered by active built-ins. Revenue, surveys, AI, flags, logs, CSP, experiments, and customer analytics lacked repository or server evidence.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes clear defects to the inbox. These are the only configurations in this setup that consume Replay Vision quota. Findings enter at half weight and require corroboration before promotion into an inbox report.

| Scanner | Status | Scope and rationale | Sampling | Estimate |
| --- | --- | --- | --- | --- |
| Portfolio case-study breakage | created | Recordings whose URL contains `/work`, covering the case-study journey where a visitor evaluates work and follows a live or source link. Watches failed image/content loads, broken links, and unresponsive next-project navigation. | 50% | 0 observations/month, 0 credits/month at setup. |
| Portfolio navigation frustration | created | Recordings with `$rageclick` only; keeps its frustration query distinct from the URL-scoped breakage monitor. Watches repeated attempts to open projects, links, the email-copy control, or case-study navigation. | 100% | 0 observations/month, 0 credits/month at setup. |

Replay Vision had 2,500 credits remaining and was not exhausted. No recordings existed during setup, so both scanners are armed and will start scanning once new recordings arrive.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled ticket responder can receive tickets.
- [ ] Generate normal visitor sessions after deployment so Replay Vision and the new scouts can establish their baselines.
- [ ] Reauthorize the PostHog MCP connection with `property_definition:read` if direct event-schema validation from the setup environment is needed; the custom scouts validate their event schema at run time.
- [ ] The project profile was not yet built, so product-usage ranking was based on the repository’s `posthog-js` integration and event surfaces rather than server-side profile data.

## What happens next

Fresh scout configurations are picked up by the coordinator within about 30 minutes and draw from the verified daily budget. Findings cluster into reports in the [Self-driving inbox](https://eu.posthog.com/project/267045/inbox); immediately actionable reports can begin coding tasks.

## Files modified or created

- Created `posthog-self-driving-report.md`.
- No application source files were changed.
