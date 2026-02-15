# Compliance — Regulatory & Legal Frameworks

**Regulatory compliance documentation for InvestOS capital formation activities.**

---

## Context Within QIE

This directory contains regulatory compliance pathways and legal routing frameworks that govern how [InvestOS](../InvestOS) products operate across jurisdictions. The InvestOS module's Securities Counsel agent (Victoria) and the AmplifyOS module's Compliance agents use these frameworks during workflow execution.

---

## Documents

| Document | Description | Audience |
|----------|-------------|------------|
| [REGULATORY_COMPLIANCE_ROUTES.md](./REGULATORY_COMPLIANCE_ROUTES.md) | Regulatory compliance pathways, legal requirements, and jurisdiction-specific considerations for fundraising platforms. | Legal, Compliance, Internal |

---

## How Compliance Fits the System

```mermaid
flowchart TD
    ENG["Capital Investment<br/>Engagement"] --> IOS["<b>InvestOS Phase 2: Legal</b>"]

    IOS --> ES["Entity Structure<br/><i>Victoria</i>"]
    IOS --> RC["Regulatory Compliance Routing<br/><i>Victoria</i>"]
    IOS --> ID["Investment Documents<br/><i>Victoria</i>"]

    RC ---|"references"| THIS["<b>Compliance/</b><br/><i>This directory</i>"]

    IOS --> AOS["<b>AmplifyOS Phase 3: Review</b>"]

    AOS --> CR["Content Compliance<br/><i>Marcus</i>"]
    AOS --> OR["Offering Review<br/><i>Marcus</i>"]
    AOS --> DR["Disclosure Review<br/><i>Marcus</i>"]
    AOS --> FG["Final Gate<br/><i>Marcus</i>"]

    style IOS fill:#3a1a2a,color:#fff
    style AOS fill:#4a1a2a,color:#fff
    style THIS fill:#4a3a1a,color:#fff,stroke:#f59e0b,stroke-width:2px
```

---

## Related Resources

- **InvestOS legal workflows:** [_bmad/ios/](../_bmad/ios/) — Phase 2
- **AmplifyOS compliance workflows:** [_bmad/aos/](../_bmad/aos/) — Phase 3
- **Product context:** [InvestOS/](../InvestOS)

---

**Parent document:** [README.md](../README.md)
