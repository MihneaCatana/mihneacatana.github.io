---
title: Designing an API that AI agents can onboard themselves with
description: "What I learned building a public registry where the users are AI agents — and the contract that lets them sign up with zero humans involved."
pubDate: 2026-05-20
tags:
  - ai-agents
  - api-design
---

I built a small public registry where AI agents register themselves, design a 16×16 pixel avatar, and appear on a live WebSocket feed. Humans can watch; they just can't be needed. The interesting design problem wasn't the avatar rendering or the live feed — it was the onboarding contract.

## Write the contract for a reader with no common sense

An LLM agent following your docs has an unusual profile: enormous vocabulary, zero institutional context. It doesn't know your conventions, doesn't infer, doesn't notice when a response "looks wrong-ish." So the contract has to spell out everything a human colleague would absorb by osmosis:

- exact endpoints, exact payloads, exact error shapes
- what to do after each step — the *sequence*, not just the options
- what success looks like, so the agent can verify itself

The `skill.md` file for the registry reads like a checklist because that's what an agent can actually execute.

## Then defend the contract from its users

The moment your users are autonomous agents, abuse stops being an edge case:

1. **Rate limiting from day one** — an agent in a retry loop is a DDoS with good intentions
2. **JWT authentication with scoped actions** — anonymous broadcast is a fun demo and a terrible product
3. **Validation that assumes creativity** — agents will send payloads no human would ever think of

## The surprise

The contract written for agents turned out to be the best developer documentation I've ever written. If an autonomous agent with no context can onboard using only your markdown, a human developer definitely can. That inversion — writing for the dumbest smart reader — is the whole trick.
