---
name: contract-testing
description: Design or verify provider-consumer contracts at HTTP, message, or typed service boundaries. Use when compatibility between independently changing components is the question; do not use as a substitute for ordinary unit, integration, or end-to-end testing.
license: MIT
---

# Contract Testing

A contract test proves that a consumer's concrete expectations match a provider's production boundary behavior. First identify the provider, each consumer, the boundary owner, the transported representation, and the compatibility policy.

Match actions to the request. A design, review, or compatibility assessment is read-only. Create or update local contract code and artifacts only when the user asked for implementation. Publishing to a broker, registry, CI service, or other external system; changing provider state outside a disposable test environment; and triggering remote verification are separate mutations that require explicit authorization. Local implementation permission does not imply any of them.

## Anchor the contract to production shapes

Trace both sides before adding a fixture:

- On the consumer side, exercise the production client, decoder, or message handler far enough to capture only fields and semantics the consumer actually uses.
- On the provider side, verify the published expectation through the production router, serializer, handler, or event publisher. Substitute infrastructure behind that boundary only as needed for deterministic setup.
- Generate schemas or interaction artifacts from the same types, validators, or serialization path used by production when the repository supports this. A hand-maintained duplicate is evidence only if drift is itself detected.

Do not mock the boundary being contracted. Do not call an internal method that bypasses transport mapping and describe it as provider verification. Framework metadata, compile-time assignability, or a shared DTO package alone does not prove the wire representation.

## Specify observable obligations

Record only behavior that affects interoperability:

- request or message shape, required metadata, and semantic constraints;
- response, emitted event, status, and error variants the consumer handles;
- provider state or fixture prerequisites expressed in domain terms;
- matching rules for optional fields, arrays, identifiers, timestamps, and extensible values;
- version and ownership information needed to relate the evidence to exact revisions.

Avoid incidental ordering, generated identifiers, irrelevant fields, or literal values where a semantic matcher is correct. Cover each meaningful variant separately rather than building one oversized interaction.

## Prove both directions

Consumer evidence must come from executing the real consumer boundary path. Provider evidence must replay the same published contract against the provider revision intended for release. A green consumer test without provider verification is an unverified proposal; a provider-only schema check says nothing about actual consumer needs.

For a breaking change, make compatibility explicit. Prefer additive evolution, tolerate unknown additive fields where the protocol permits it, and use an overlap period when old and new revisions may coexist. Removal, renaming, stricter validation, changed defaults, and narrowed value sets require evidence for every supported consumer or an agreed version transition.

Report the exact consumer and provider revisions, contract artifact identity, verified variants, and final provider result. Treat stale, missing, pending, or revision-mismatched evidence as non-terminal rather than success.
