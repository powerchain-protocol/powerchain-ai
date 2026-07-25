## Repository Roadmap

### Phase 1 — Foundation

This establishes the core infrastructure that every other program depends on.

```
powerchain-programs/
├── Anchor.toml
├── Cargo.toml
├── package.json
├── tsconfig.json
├── programs/
│   ├── asset-registry/
│   ├── generator-registry/
│   ├── settlement/
│   └── pwrc-token/
├── sdk/
├── tests/
├── scripts/
└── docs/
```

Deliverables:

* Workspace configuration
* Shared types
* Shared error definitions
* Shared PDA utilities
* CI configuration
* Deployment scripts
* Initial documentation

---

### Phase 2 — Renewable Certificates

Programs:

* REC NFT
* Guarantee of Origin
* Carbon Registry

---

### Phase 3 — Financial Layer

Programs:

* Treasury
* Marketplace
* Escrow

---

### Phase 4 — Governance

Programs:

* Governance DAO
* Multisig
* Permissions

---

### Phase 5 — Enterprise

Programs:

* Compliance
* Audit
* ESG Reporting

---

### Phase 6 — Interoperability

Programs:

* Solana ↔ Sui bridge
* Cross-chain settlement

---

### Phase 7 — AI Integration

Off-chain services with on-chain verification:

* PowerChain AI Risk Engine
* GridOS verification
* Oracle consensus
* Digital Twin validation

## Development Standards

Every program should include:

* `Cargo.toml`
* Anchor `lib.rs`
* Instructions
* Account definitions
* PDA derivation
* Events
* Custom error codes
* Unit tests
* Integration tests
* TypeScript client
* Generated IDL
* README
* Security notes

## Suggested Milestone Order

1. Workspace
2. Asset Registry
3. Generator Registry
4. Settlement Engine
5. PWRC Token
6. REC NFT
7. Carbon Registry
8. GO Registry
9. Treasury
10. Marketplace
11. Governance
12. Compliance
13. ESG Reporting
14. Bridge
15. SDKs and example applications

## Packaging

Once all milestones are complete, the repository can be packaged with:

* Complete Cargo workspace
* Anchor workspace
* TypeScript SDK
* Rust SDK
* Test suite
* CI/CD workflows
* Docker development environment
* Deployment scripts
* Documentation
* Example applications

