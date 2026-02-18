# Platform Integration Specifications

## Third-Party Integration Architecture for the Raise Platform

This document defines the external service integrations required to power the transaction and lifecycle layers of the Raise platform.

---

## 1. Payment Processing -- Stripe

**Purpose:** Process investor funding (ACH, wire), sponsor subscription payments, distribution payments

**Integration Points:**
- Stripe Connect -- multi-party payment flows (investor -> escrow -> sponsor entity)
- Stripe Identity -- identity verification layer
- ACH debits/credits for investor funding and distributions
- Wire transfer initiation and tracking
- Subscription billing for sponsor SaaS fees

**Key Capabilities:**
- Hold funds in escrow until raise close conditions met
- Split payments between platform fee and sponsor entity
- Automate distribution payments to investor bank accounts
- Handle international payments (future: cross-border raises)
- PCI compliance handled by Stripe

**Data Exchanged:**
- Payment status (pending, completed, failed, returned)
- Transaction amounts and timestamps
- Bank account verification status
- ACH return codes and failure reasons

---

## 2. Banking & Account Verification -- Plaid

**Purpose:** Verify investor bank accounts, enable ACH funding, monitor account status

**Integration Points:**
- Plaid Link -- investor bank account connection
- Auth -- account and routing number verification
- Balance -- verify sufficient funds before ACH pull
- Identity -- cross-reference bank account holder with investor identity

**Key Capabilities:**
- Instant bank account verification (no micro-deposits needed)
- Real-time balance checks before funding
- Account holder identity matching
- Multi-bank support for investors with multiple accounts

---

## 3. Investor Accreditation -- Verify Investor / Parallel Markets

**Purpose:** SEC-compliant accreditation verification for Reg D 506(c) offerings

**Integration Points:**
- API-based accreditation verification request
- Document upload for income/net worth verification
- Third-party verification letter generation
- Professional certification verification (Series 7/65/82, CPA, etc.)

**Accreditation Methods Supported:**
1. **Income test:** $200K individual / $300K joint for last 2 years + reasonable expectation
2. **Net worth test:** $1M+ excluding primary residence
3. **Professional certification:** Series 7, 65, or 82 license holders
4. **Entity test:** $5M+ in assets (for entity investors)
5. **Knowledgeable employee:** For private fund investments
6. **Third-party letter:** CPA, attorney, registered broker-dealer, or investment adviser

**Data Exchanged:**
- Verification status (verified, pending, denied, expired)
- Verification method used
- Expiration date (typically 90 days)
- Verification letter (PDF)

---

## 4. Identity Verification (KYC/AML) -- Persona

**Purpose:** Know Your Customer, Anti-Money Laundering screening, identity verification

**Integration Points:**
- Government ID verification (driver's license, passport)
- Selfie verification (liveness check)
- SSN/EIN verification
- OFAC sanctions screening
- PEP (Politically Exposed Person) screening
- Adverse media screening
- Watchlist monitoring (ongoing)

**Key Capabilities:**
- Real-time identity verification (under 60 seconds)
- Document fraud detection
- Ongoing monitoring for sanctions list changes
- Entity verification (for LLC, trust, IRA investors)
- Beneficial ownership identification (for entity investors)

**Compliance Standards:**
- BSA/AML compliance
- USA PATRIOT Act requirements
- CIP (Customer Identification Program) requirements
- FinCEN beneficial ownership rule

---

## 5. E-Signature -- SignNow

**Purpose:** Digital signing of subscription agreements, operating agreements, and other legal documents

**Integration Points:**
- Document upload with signature field placement
- Signing invitation via email
- Embedded signing experience (in-platform, no redirect)
- Signature status tracking
- Signed document retrieval and storage
- Countersignature workflows (investor signs -> sponsor countersigns)

**Key Capabilities:**
- ESIGN Act and UETA compliant signatures
- Audit trail with timestamps and IP addresses
- Sequential signing (investor first, then GP)
- Bulk sending for multiple investors on same deal
- Template-based signing for standardized documents
- Mobile-friendly signing experience

**Existing Asset:** SignNow integration already exists in brand-factory tooling (`tooling/signnow/signnow.py`) -- can be adapted for platform use.

---

## 6. Tax Document Preparation -- API Partner (TBD)

**Purpose:** K-1 generation, tax basis tracking, depreciation schedule management

**Integration Options:**
- **Tax Caddy** -- K-1 delivery platform
- **Avantax** -- Tax document management
- **Custom build** -- K-1 data compilation for CPA handoff

**Key Capabilities:**
- Compile K-1 data from distribution records and property financials
- Track investor tax basis (initial investment, distributions, depreciation)
- Generate K-1 draft data for CPA review
- Deliver K-1s to investors through platform (PDF + e-delivery)
- Track delivery and investor acknowledgment
- Handle UBIT flagging for tax-exempt investors (IRAs, foundations)

**Data Required:**
- Investor ownership percentages
- Distribution amounts by type (return of capital, ordinary income, capital gain)
- Depreciation allocations
- Property-level tax return data
- Cost segregation study results

---

## 7. Escrow Services -- Partnership (TBD)

**Purpose:** Hold investor funds during raise period, release upon close conditions

**Integration Options:**
- **North Capital** -- integrated escrow for securities offerings
- **Prime Trust** -- fintech escrow and custody
- **Millennium Trust** -- SDIRA and escrow services
- **Traditional bank escrow** -- Wells Fargo, US Bank escrow accounts

**Key Capabilities:**
- Automated escrow account creation per deal
- Investor funding into escrow (ACH/wire)
- Conditional release upon close (minimum raise met, all docs signed)
- Return of funds if raise fails (investor protection)
- Interest bearing vs. non-interest bearing options
- Escrow statement generation

---

## 8. Document Storage & Management

**Purpose:** Secure storage, versioning, and access control for all deal documents

**Architecture:**
- AWS S3 or equivalent for encrypted document storage
- Document versioning with audit trail
- Role-based access control (sponsor sees own deals, investors see invested deals)
- Watermarking for investor-specific documents
- PDF generation from platform-generated documents (PPM, sub docs, reports)
- Bulk download capability for data room export

**Security Requirements:**
- AES-256 encryption at rest
- TLS 1.3 encryption in transit
- Access logging for compliance audit trail
- Data retention policies per regulation (Reg A+ requires 2 years post-offering)
- GDPR-ready for future international expansion

---

## 9. Communication Infrastructure

**Purpose:** Investor notifications, sponsor communications, platform alerts

**Integration Points:**
- **Email:** SendGrid or AWS SES for transactional and marketing email
- **SMS:** Twilio for time-sensitive alerts (distribution notice, document ready)
- **In-App:** WebSocket-based real-time notifications
- **Calendar:** Google Calendar / iCal integration for investor meetings, deadlines

**Communication Types:**
| Type | Channel | Trigger |
|------|---------|---------|
| New deal available | Email | Deal published on platform |
| Document ready for signing | Email + in-app | Sub docs generated |
| Signature reminder | Email + SMS | 48 hours unsigned |
| Funding confirmation | Email + in-app | Wire/ACH received |
| Distribution notice | Email | 5 days before distribution |
| Distribution payment | Email + SMS | Payment sent |
| Quarterly report | Email + in-app | Report published |
| K-1 available | Email + SMS | K-1 uploaded |
| Capital call | Email + SMS | Capital call issued |
| Raise milestone | Email (sponsor) | 25%, 50%, 75%, 100% committed |

---

## 10. Analytics & Monitoring

**Purpose:** Platform performance monitoring, user behavior analytics, business metrics

**Integration Points:**
- **Product analytics:** Mixpanel or Amplitude for user behavior
- **Error monitoring:** Sentry for error tracking and alerting
- **Infrastructure:** Datadog or New Relic for system monitoring
- **Business intelligence:** Metabase or Looker for internal dashboards

**Key Metrics to Track:**
- Sponsor acquisition and activation rates
- Deal creation to launch conversion
- Raise velocity (capital committed per day/week)
- Investor onboarding completion rate
- Document signing completion rate
- Funding success rate (committed -> funded)
- Post-close engagement (report views, distribution satisfaction)
- Platform NPS and sponsor retention

---

## Integration Priority Order

| Priority | Integration | Why First |
|----------|-------------|-----------|
| 1 | SignNow (e-signature) | Already exists, critical for MVP |
| 2 | Persona (KYC/AML) | Required for any investor onboarding |
| 3 | Verify Investor (accreditation) | Required for 506(c) offerings |
| 4 | Stripe (payments) | Required for funding and distributions |
| 5 | Plaid (banking) | Required for bank account verification |
| 6 | SendGrid (email) | Required for all communications |
| 7 | AWS S3 (document storage) | Required for document management |
| 8 | Escrow partner | Required for compliant fund holding |
| 9 | Tax partner | Required for K-1 generation (Year 1 tax season) |
| 10 | Analytics stack | Required for platform intelligence |
