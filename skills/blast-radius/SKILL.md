---
name: blast-radius
description: Determine what a proposed or completed change could break beyond its immediate diff and prove the key safety assumptions. Use explicitly for blast-radius or "what could this break?" analysis, and narrowly for contract, schema, event, serialization, or migration changes with non-obvious downstream consumers.
---

# Blast Radius

Trace breakage beyond direct callers. The goal is not a long speculative risk list; it is a small set of credible failure paths and evidence for the facts on which safety depends.

## Map the changed contract

Read the proposal or diff and identify what changes semantically, including defaults, ordering, timing, error behavior, permissions, performance expectations, and removals. Inventory direct callers, then continue across boundaries that ordinary symbol search misses:

- public APIs, SDKs, CLIs, webhooks, and integrations;
- database schemas, stored values, migrations, readers, writers, and rollback paths;
- events, queues, retries, deduplication, ordering, and delayed consumers;
- serialized names, configuration, feature flags, caches, and generated artifacts;
- scheduled jobs, infrastructure, deployment order, observability, alerts, and runbooks;
- other services, repositories, languages, versions, and human operating procedures.

Use repository evidence, pinned dependency source, schemas, history, and available operational evidence. Never invent a consumer or treat a search that found nothing as proof that none exists.

## Find the load-bearing facts

For each credible failure path, state the fact that must hold for the change to be safe. Push that fact as far down this evidence ladder as is proportionate:

1. hypothesis only;
2. supported by an exact source location or authoritative contract;
3. failure path traced and shown unreachable;
4. real code exercised by a deterministic test or probe;
5. reproduced on the representative running system.

Prefer one small executable proof over a persuasive paragraph. Run probes in a safe local, test, or disposable environment. Do not mutate production, external accounts, shared data, or third-party systems without explicit authorization. If proof would be unsafe or expensive, stop at the strongest available level and label the fact unproven.

## Calibrate and report

For every remaining risk, give:

- the breakage path and affected surface;
- supporting evidence;
- likelihood and impact;
- detection method;
- the cheapest preventive test, rollout guard, or rollback measure.

Separate **confirmed risks**, **cleared risks**, and **unknowns**. Lead with the one or two load-bearing safety facts, their evidence level, and the proof output. Include deployment-order or compatibility constraints when relevant.

Blast-radius analysis is read-only by default. A request to assess a change does not authorize fixing it, modifying external systems, deploying, or notifying consumers. Temporary local probes are acceptable when safe; persist tests or implementation changes only when requested.
