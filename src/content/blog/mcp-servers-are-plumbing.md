---
title: MCP servers are the plumbing of enterprise AI
description: "After a year of building MCP servers into Lenovo's Atlassian tooling, I'm convinced they matter less as technology and more as agreement."
pubDate: 2026-07-14
tags:
  - ai
  - mcp
  - engineering
---

<!--
  DRAFT — derived from your CV's Lenovo work. Review, edit in your own voice,
  adjust or remove any claim you're not comfortable publishing, then delete this comment.
-->

When people ask what I do with AI at work, the most useful answer is also the least impressive one: I build pipes. Model Context Protocol servers — MCP — are how our AI tooling reaches internal systems in a controlled way, and a year into that work at Lenovo I've formed a strong opinion: their value isn't technical sophistication. It's *agreement*.

## The problem before the protocol

Every AI integration we'd sketched had its own bespoke connection to internal data: different auth, different shapes, different failure modes. Any time someone wanted to swap a model or add a tool, they rewired the house. That's fine for one demo and impossible for thirty.

## What MCP actually buys you

With a standard layer between models and internal systems, three things changed:

1. **Tools became reusable.** A server written for one workflow serves all of them.
2. **Security got one place to live.** Credentials, scopes and audit points sit in the layer, not scattered across scripts.
3. **Model choice became a swap, not a project.** When everything speaks the same protocol, trying a different LLM — including a local Ollama model for sensitive workloads — stops being a rewrite.

## The boring lesson

The Atlassian extension I built (skills, agents, hooks, MCP servers) cut time lost across the department by 65%. None of that came from a smarter model. It came from plumbing that didn't leak — and from the whole team agreeing on the shape of the pipe before building thirty versions of it.

> The protocol you all actually use beats the perfect one nobody agrees on.
