---
title: IoT Manager
description: A centralised platform to register, monitor, and control IoT devices spread across different physical sites — real-time telemetry over Kafka, remote control from one interactive dashboard. Also my master's thesis.
year: 2024
role: Solo — architecture, backend, dashboard
stack:
  - React
  - Node.js
  - TypeScript
  - MongoDB
  - Kafka
repo: https://github.com/MihneaCatana/IoT-Manager
image: /images/projects/iot-manager.svg
order: 3
featured: true
---

Real IoT fleets are messy: different sensor types, different sites, different ways of failing. The off-the-shelf tools either assumed you bought all your devices from one vendor, or reduced everything to tables and filters.

IoT Manager is a centralised platform to register, monitor, and control devices across sites: real-time data flows through Kafka, and everything surfaces in an interactive dashboard with live telemetry and remote control. The project became my master's thesis at ASE Bucharest (*IoT Management Application*) and kept growing after the defense.

## Under the hood

A TypeScript monorepo with three pieces that each do one job:

- **`back-end/`** — Node.js + TypeScript REST API. Full CRUD for devices, device types and sites; handles registration and the real-time data flow.
- **`front-end/`** — React 19 + TypeScript dashboard: device status, a location map with every device on it, live telemetry, and remote-control actions.
- **`docker-compose.yml`** — one command starts MongoDB and Kafka, so the whole stack runs locally.

Telemetry moves over Kafka topics, which keeps ingestion decoupled from the dashboard — the UI subscribes, devices publish, and neither depends on the other. The most useful piece turned out to be the **mock server**: it generates synthetic Kafka messages, meaning simulated devices that can fail on demand. It became the fastest way to demo the system without hardware, and the best tool for reproducing failure scenarios.

## What came out of it

- A complete lifecycle tool: registration → live monitoring → remote control, across sites and sensor types
- An event-driven backbone that held up against real device behavior
- A demo rig (the mock server) that's reusable well beyond this project

## What I'd do differently

Design the event backbone first. The live dashboard originally ran on polling; moving it onto the Kafka flow made everything feel instant. Next time I'd build the foundation first instead of retrofitting it.
