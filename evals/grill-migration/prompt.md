---
name: grill-migration
description: The user asks to be grilled on a database migration plan with a dozen or more open decisions. The agent should ask a few questions, the most consequential first, each with a recommended answer, not every open question at once.
tags: [grilling]
runs: 3
max_turns: 10
allowed_tools: [Read, Glob, Grep, Skill]
---

grill me on this plan before I take it to the team on Thursday.

Plan: move billing from MySQL 5.7 to Postgres 16

Billing (invoices, payments, subscriptions; about 400 GB in 30 tables) runs
on a self-hosted MySQL 5.7 primary with one replica. 5.7 is out of support,
and we want Postgres for row-level security and better JSON. Three services
write to it: billing-api (Go), the nightly invoicing job (Python) and the
admin panel (Rails). Finance reads the replica for month-end reports.

1. Stand up Postgres 16: managed RDS or self-hosted, not decided.
2. Convert the schema. Some tables use MySQL ENUMs and zero dates
   ('0000-00-00').
3. Copy the data: a dump and restore in a maintenance window, or ongoing
   replication with a CDC tool (Debezium or AWS DMS), then a cutover.
4. Move the three services over, one at a time or all at once.
5. Keep MySQL around for a while in case we need to roll back.

Open things I know about: who owns it (platform team or billing team),
whether we can take downtime (we bill on the 1st, so not then), how long to
keep MySQL, how finance's reports move, and whether to dual-write during the
switch. Target: done by the end of next quarter.
