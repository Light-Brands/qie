# Real Estate Capital Formation Playbook

## Master Reference for ROS Agents

This playbook is the core intelligence file for the RealEstateOS module. Every agent in ROS should reference this document for RE-specific domain knowledge, terminology, standards, and best practices.

---

## 1. Deal Types & Their Capital Formation Requirements

### Acquisition Deals

| Deal Type | Typical Raise Size | Common Structure | Typical Hold | Target Returns |
|-----------|-------------------|------------------|-------------|----------------|
| Multifamily (Value-Add) | $2-50M equity | LP/LLC, Reg D 506(b) | 3-5 years | 15-20% IRR, 1.8-2.2x EM |
| Multifamily (Core/Stabilized) | $5-100M equity | LP, Reg D 506(b/c) | 5-10 years | 8-12% IRR, 1.5-1.8x EM |
| Commercial Office | $5-75M equity | LP/LLC | 5-7 years | 12-18% IRR |
| Industrial/Warehouse | $3-50M equity | LP/LLC | 5-7 years | 12-16% IRR |
| Self-Storage | $1-20M equity | LLC | 3-5 years | 15-22% IRR |
| Mobile Home Parks | $1-15M equity | LLC | 5-7 years | 12-18% IRR |
| Senior Living | $5-50M equity | LP | 5-7 years | 14-20% IRR |
| Student Housing | $3-30M equity | LP/LLC | 3-5 years | 14-20% IRR |
| Hospitality/Hotels | $5-100M equity | LP | 5-10 years | 15-25% IRR |
| Medical Office | $3-30M equity | LP/LLC | 5-7 years | 10-15% IRR |
| Retail (NNN) | $2-20M equity | LLC/DST | 5-10 years | 8-12% IRR |
| Mixed-Use | $5-50M equity | LP/LLC | 5-7 years | 14-20% IRR |

### Development Deals

| Deal Type | Typical Raise Size | Common Structure | Timeline | Target Returns |
|-----------|-------------------|------------------|----------|----------------|
| Ground-Up Multifamily | $5-75M equity | LP, multiple capital calls | 2-4 years build + 1-2 stabilize | 18-25% IRR, 2.0-2.5x EM |
| Ground-Up Commercial | $10-100M equity | LP | 2-5 years | 18-30% IRR |
| Adaptive Reuse | $3-30M equity | LP/LLC | 1-3 years | 16-22% IRR |
| Land Entitlement | $1-10M equity | LLC | 1-3 years | 20-40% IRR (high risk) |
| Subdivision | $2-20M equity | LLC | 1-3 years | 18-25% IRR |

### Fund Structures

| Structure | Typical Size | Regulation | Investor Types | Key Differences |
|-----------|-------------|------------|----------------|-----------------|
| Single-Asset Syndication | $1-50M | Reg D 506(b/c) | Accredited | One property, one raise |
| Blind Pool Fund | $10-500M | Reg D 506(c) | Accredited/QP | Multiple properties, deploy over time |
| Reg A+ Offering | Up to $75M | Reg A+ Tier 2 | Non-accredited OK | SEC qualification required, ongoing reporting |
| Opportunity Zone Fund | $5-100M | Reg D + OZ rules | Accredited | Capital gains deferral incentive |
| DST (1031 Exchange) | $10-100M | Reg D 506(b/c) | Accredited, 1031 | Passive ownership, max 35 investors per property |

---

## 2. Entity Structure Decision Tree

```
START: What kind of deal?
    │
    ├── Single Property Syndication
    │   ├── < 35 investors → LLC (simpler)
    │   ├── 35-99 investors → LP (standard)
    │   └── 100+ investors → LP + Reg A+ consideration
    │
    ├── Multiple Properties (Portfolio)
    │   ├── Same strategy/market → Single LP/LLC
    │   ├── Different strategies → Series LLC or separate entities
    │   └── Ongoing acquisition → Blind Pool Fund (LP)
    │
    ├── 1031 Exchange Target
    │   ├── Passive investors → DST (Delaware Statutory Trust)
    │   └── Active investors → TIC (Tenancy in Common, max 35)
    │
    ├── Opportunity Zone
    │   └── QOZF (Qualified Opportunity Zone Fund) as LP or LLC
    │
    └── Development Deal
        ├── Single project → LP with capital call provisions
        └── Multiple projects → Fund with deployment period

JURISDICTION:
    ├── Delaware → Default for LPs and LLCs (best case law, privacy, flexibility)
    ├── Wyoming → Alternative for privacy-focused structures
    └── State of property → May be required for certain registrations
```

---

## 3. Regulatory Pathway Selection

### Reg D 506(b)
- **Max raise:** Unlimited
- **Investor types:** Up to 35 non-accredited (sophisticated) + unlimited accredited
- **General solicitation:** NOT allowed -- must have pre-existing relationship
- **SEC filing:** Form D within 15 days of first sale
- **Ongoing reporting:** None required (but best practice)
- **State filing:** Notice filing in states where investors reside
- **Best for:** Sponsors with existing investor relationships, repeat sponsors
- **Time to launch:** 2-4 weeks (fastest)

### Reg D 506(c)
- **Max raise:** Unlimited
- **Investor types:** Accredited ONLY (must verify)
- **General solicitation:** ALLOWED -- can advertise, use platform
- **SEC filing:** Form D within 15 days
- **Accreditation verification:** REQUIRED -- third-party verification or financial statement review
- **Best for:** Platform-based raises, sponsors building new investor base
- **Time to launch:** 3-6 weeks

### Reg A+ (Tier 2)
- **Max raise:** $75M per 12-month period
- **Investor types:** Non-accredited allowed (with investment limits)
- **General solicitation:** ALLOWED
- **SEC filing:** Offering Circular (Form 1-A), SEC qualification required
- **Ongoing reporting:** Annual, semi-annual, current event reports
- **Best for:** Large raises wanting broad investor access, brand building
- **Time to launch:** 3-6 months (SEC review)
- **Cost:** $50-150K+ in legal/filing costs

### Reg CF (Crowdfunding)
- **Max raise:** $5M per 12-month period
- **Investor types:** Non-accredited allowed (with investment limits)
- **Platform:** MUST use registered funding portal or broker-dealer
- **SEC filing:** Form C
- **Ongoing reporting:** Annual reports
- **Best for:** Smaller raises, community-focused projects, testing demand
- **Time to launch:** 4-8 weeks

---

## 4. Distribution Waterfall Structures

### Standard Preferred Return Waterfall (Most Common)

```
CASH FLOW DISTRIBUTION:
    │
    ├── Tier 1: Return of Capital
    │   └── 100% to LPs until all contributed capital returned
    │
    ├── Tier 2: Preferred Return
    │   └── 100% to LPs until [X]% cumulative preferred return achieved
    │   └── Common rates: 6%, 7%, 8%, 10% (annualized, compounded)
    │
    ├── Tier 3: Catch-Up (GP)
    │   └── 100% to GP until GP has received [Y]% of total distributions
    │   └── Common: 20-30% catch-up until GP at target promote share
    │
    └── Tier 4: Residual Split
        └── [A]% to LPs / [B]% to GP
        └── Common: 70/30, 75/25, 80/20
```

### Multi-Hurdle Waterfall (Institutional)

```
CASH FLOW DISTRIBUTION:
    │
    ├── Tier 1: Return of Capital → 100% to LPs
    │
    ├── Tier 2: Preferred Return (8%) → 100% to LPs
    │
    ├── Tier 3: First Promote Hurdle (8-12% IRR)
    │   └── 80% LP / 20% GP
    │
    ├── Tier 4: Second Promote Hurdle (12-15% IRR)
    │   └── 70% LP / 30% GP
    │
    └── Tier 5: Above Second Hurdle (15%+ IRR)
        └── 60% LP / 40% GP
```

### Common Variations
- **Lookback / Clawback:** GP returns excess promote if final returns don't meet hurdles
- **Compounding:** Preferred return may compound quarterly, annually, or not at all
- **Accrual:** Unpaid preferred return accrues and must be paid before promote
- **Capital call deals:** Preferred return clock starts at each capital call, not initial close

---

## 5. Key Financial Metrics & Calculations

### Acquisition Metrics

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **NOI** | Gross Revenue - Operating Expenses (excl. debt service) | Property's operating income before financing |
| **Cap Rate** | NOI / Purchase Price | Market's valuation of income stream |
| **Going-In Cap Rate** | Year 1 NOI / Purchase Price | What you're buying at |
| **Exit Cap Rate** | Projected NOI at sale / Projected Sale Price | What you're assuming you sell at |
| **Cash-on-Cash** | Annual Cash Flow / Total Equity Invested | Cash yield on invested equity |
| **DSCR** | NOI / Annual Debt Service | Lender safety margin (1.25x+ typical minimum) |
| **LTV** | Loan Amount / Property Value | Leverage level (60-75% typical) |
| **Debt Yield** | NOI / Loan Amount | Lender risk metric (8-10%+ typical minimum) |
| **Break-Even Occupancy** | (Operating Expenses + Debt Service) / Gross Potential Rent | Minimum occupancy to cover obligations |
| **GRM** | Purchase Price / Annual Gross Rent | Quick valuation sanity check |
| **Price Per Unit** | Purchase Price / Number of Units | Comp metric for multifamily |
| **Price Per SF** | Purchase Price / Total Rentable SF | Comp metric for commercial |
| **OER** | Operating Expenses / Effective Gross Income | Operating efficiency |

### Return Metrics

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **IRR** | Discount rate that makes NPV of all cash flows = 0 | Time-weighted total return |
| **Equity Multiple** | Total Distributions / Total Equity Invested | Total return on capital (not time-weighted) |
| **Average Annual Return** | (Equity Multiple - 1) / Hold Period | Simple annualized return |
| **Net Asset Value (NAV)** | Property Value - Debt - Closing Costs | What investor's equity is worth today |

### Development Metrics

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **Total Development Cost** | Land + Hard Costs + Soft Costs + Financing + Contingency | All-in project cost |
| **Cost Per Unit** | Total Dev Cost / Number of Units | Development efficiency metric |
| **Cost Per SF** | Total Dev Cost / Total Buildable SF | Development efficiency metric |
| **Yield on Cost** | Stabilized NOI / Total Development Cost | Return on development investment |
| **Development Spread** | Yield on Cost - Market Cap Rate | Value creation through development |
| **Profit Margin** | (Stabilized Value - Total Dev Cost) / Total Dev Cost | Development profit as % |

---

## 6. Due Diligence Checklist (Property-Level)

### Physical Due Diligence
- [ ] Property Condition Assessment (PCA) / Engineering Report
- [ ] Phase I Environmental Site Assessment (ESA)
- [ ] Phase II Environmental (if Phase I triggers)
- [ ] ALTA Survey
- [ ] Roof inspection and warranty review
- [ ] MEP systems assessment (mechanical, electrical, plumbing)
- [ ] ADA compliance review
- [ ] Seismic assessment (where applicable)
- [ ] Flood zone determination / FEMA map review
- [ ] Asbestos / lead paint inspection (pre-1978 buildings)
- [ ] Mold assessment

### Financial Due Diligence
- [ ] Trailing 12-month (T-12) operating statements
- [ ] 3 years historical operating statements
- [ ] Current rent roll with lease terms
- [ ] Utility bill analysis (12 months minimum)
- [ ] Property tax assessment and history
- [ ] Insurance quotes and loss history
- [ ] Capital expenditure history
- [ ] Accounts receivable aging report
- [ ] Service contract inventory
- [ ] Real estate tax appeal status

### Legal Due Diligence
- [ ] Title commitment and title search
- [ ] Title insurance quote
- [ ] Existing liens and encumbrances
- [ ] Zoning verification letter
- [ ] Certificate of occupancy
- [ ] Building permits (issued and pending)
- [ ] Existing lease agreements (all tenants)
- [ ] Tenant estoppel certificates
- [ ] Subordination, non-disturbance, and attornment agreements (SNDAs)
- [ ] Existing loan documents (if assuming debt)
- [ ] HOA/condo association documents (if applicable)
- [ ] Litigation search
- [ ] Code violation history

### Market Due Diligence
- [ ] Comparable sales analysis (last 12-24 months)
- [ ] Comparable rent analysis (current market)
- [ ] Supply pipeline analysis (planned/under construction)
- [ ] Submarket demographic trends
- [ ] Employment and population growth data
- [ ] Absorption and vacancy trends
- [ ] Largest employer concentration risk
- [ ] School district ratings (residential)
- [ ] Crime statistics
- [ ] Transportation and infrastructure plans

---

## 7. Investor Personas (RE-Specific)

### Persona 1: The Experienced Accredited Individual
- **Profile:** HNW individual ($1-10M investable), has done 3-10 RE investments
- **Motivation:** Cash flow, tax benefits (depreciation), portfolio diversification
- **Typical check size:** $50K-$250K
- **Decision factors:** Sponsor track record, market fundamentals, deal structure clarity
- **Communication preference:** Quarterly updates, annual meetings, direct sponsor access
- **Pain points:** Lack of deal flow, difficulty comparing opportunities, scattered reporting

### Persona 2: The First-Time RE Investor
- **Profile:** Accredited but new to private RE, may come from stock market background
- **Motivation:** Higher returns than public markets, tangible asset ownership
- **Typical check size:** $25K-$100K
- **Decision factors:** Education, transparency, simplicity, brand trust
- **Communication preference:** Monthly updates (more frequent early on), educational content
- **Pain points:** Intimidated by PPMs, unfamiliar with RE terminology, trust concerns

### Persona 3: The Self-Directed IRA Investor
- **Profile:** Using SDIRA or Solo 401(k) for RE investments
- **Motivation:** Tax-advantaged growth, retirement portfolio diversification
- **Typical check size:** $50K-$200K
- **Decision factors:** SDIRA/custodian compatibility, UBIT considerations, hold period alignment with retirement timeline
- **Communication preference:** Standard quarterly, needs custodian-compatible documentation
- **Pain points:** Complex SDIRA rules, custodian processing delays, UBIT tax exposure

### Persona 4: The 1031 Exchange Investor
- **Profile:** Recently sold property, needs to place capital within exchange timeline
- **Motivation:** Tax deferral (capital gains), maintain real estate allocation
- **Typical check size:** $100K-$2M+ (size of their exchanged equity)
- **Decision factors:** Timeline urgency (45-day identification, 180-day close), DST/TIC compatibility
- **Communication preference:** Fast response, streamlined process, timeline-aware communications
- **Pain points:** Extreme time pressure, limited DST inventory, high minimum investments

### Persona 5: The Family Office Allocator
- **Profile:** Single or multi-family office with $50M+ AUM, dedicated RE allocation
- **Motivation:** Consistent yield, inflation hedge, generational wealth preservation
- **Typical check size:** $500K-$10M+
- **Decision factors:** Institutional reporting, co-investment rights, fee transparency, alignment of interest
- **Communication preference:** Institutional-grade quarterly reports, annual audited financials, direct GP access
- **Pain points:** Deal quality screening, GP evaluation, reporting standardization across sponsors

### Persona 6: The High-Frequency Syndicator
- **Profile:** Repeat investor who invests in 5-15 deals per year across multiple sponsors
- **Motivation:** Portfolio construction, diversification across markets/strategies/sponsors
- **Typical check size:** $25K-$100K per deal (diversified across many)
- **Decision factors:** Deal velocity, platform consolidation, portfolio-level reporting
- **Communication preference:** Consolidated dashboard, minimal per-deal communication, exceptions-only alerts
- **Pain points:** Managing 20+ sponsor relationships, scattered K-1s, no portfolio-level view

### Persona 7: The Institutional Allocator
- **Profile:** Pension fund, endowment, or insurance company with RE allocation targets
- **Motivation:** Portfolio allocation targets, risk-adjusted returns, institutional mandates
- **Typical check size:** $5M-$100M+
- **Decision factors:** Track record depth, AUM, institutional reporting, audit history, fund structure
- **Communication preference:** Quarterly institutional reports, annual audits, GIPS-compliant performance
- **Pain points:** GP evaluation at scale, due diligence cost, reporting inconsistency across managers

---

## 8. Common Risk Factors (PPM Library)

### Market Risks
- General real estate market conditions and cycles
- Local market economic conditions and employment
- Interest rate fluctuations affecting property values and financing
- Competition from existing and planned properties
- Changes in supply and demand for the property type
- Demographic shifts affecting tenant demand
- Natural disaster risk (flood, earthquake, hurricane, wildfire)
- Climate change impacts on property values and insurance

### Property-Specific Risks
- Physical condition of the property and unforeseen repair costs
- Environmental contamination and remediation liability
- Tenant concentration risk (over-reliance on single tenant)
- Lease rollover risk and re-leasing uncertainty
- Construction cost overruns and delays (development deals)
- Entitlement and permitting risk (development deals)
- Property tax reassessment following acquisition
- Insurance availability and cost increases

### Financial Risks
- Inability to achieve projected rents or occupancy levels
- Operating expense increases exceeding projections
- Inability to refinance existing debt at maturity
- Interest rate risk on variable-rate debt
- Capital call risk (inability to fund required calls)
- Illiquidity of the investment (no secondary market)
- Dilution from additional capital raises
- Currency risk (international investments)

### Regulatory and Legal Risks
- Changes in tax laws affecting depreciation, 1031 exchanges, or REIT status
- Rent control or rent stabilization legislation
- Zoning changes or building code requirements
- Environmental regulations and compliance costs
- Fair housing law compliance
- ADA accessibility requirements
- State and local landlord-tenant law changes
- Securities law compliance (ongoing filing requirements)

### Sponsor/Management Risks
- Key person dependency
- Conflicts of interest (sponsor investments in competing properties)
- Limited operating history (emerging sponsors)
- GP/manager removal provisions and their limitations
- Fee structure and alignment of interests
- Related party transactions
- Sponsor financial condition and personal guarantees
- Successor management uncertainty

### Tax Risks
- Loss of favorable tax treatment or depreciation benefits
- UBIT exposure for tax-exempt investors
- State tax obligations in property jurisdiction
- Passive activity loss limitation rules
- At-risk rules limiting loss deductions
- Changes to Qualified Opportunity Zone legislation
- K-1 delivery timing and complexity
- Potential audit risk

---

## 9. Post-Close Lifecycle Standards

### Quarterly Reporting Requirements
Every deal on the platform should deliver quarterly investor reports containing:
1. **Executive Summary** -- 2-3 paragraphs on property performance and key events
2. **Financial Performance** -- Actual vs. budget: revenue, expenses, NOI, cash flow
3. **Occupancy & Leasing** -- Current occupancy, leasing activity, lease expirations
4. **Capital Improvements** -- CapEx status, budget vs. actual, completion timeline
5. **Market Update** -- Local market conditions, comp activity, supply/demand
6. **Distribution Summary** -- Current quarter distribution, cumulative distributions, projected returns
7. **Forward Outlook** -- Next quarter priorities, risks, opportunities

### Distribution Standards
- **Frequency:** Monthly or quarterly (monthly preferred for income-producing assets)
- **Calculation:** Per operating agreement waterfall terms
- **Communication:** Distribution notice 5+ business days before payment
- **Delivery:** ACH direct deposit (platform-managed)
- **Reporting:** Year-to-date summary with each distribution
- **Tax documents:** K-1 delivered by March 15 (or extension notice)

### Annual Requirements
- Annual financial statements (reviewed or audited per OA requirements)
- Annual meeting or investor update call
- Annual K-1 tax document delivery
- Property valuation update (if applicable)
- Insurance renewal confirmation
- Debt maturity and refinancing status

---

## 10. Platform Fee Benchmarks

### Industry Standard Fees (Sponsor-Side)
| Fee Type | Typical Range | Notes |
|----------|--------------|-------|
| Acquisition Fee | 1-3% of purchase price | Paid at closing |
| Asset Management Fee | 1-2% of AUM or % of revenue | Annual, ongoing |
| Construction Management Fee | 3-5% of hard costs | Development deals |
| Disposition Fee | 1-2% of sale price | Paid at exit |
| Refinancing Fee | 0.5-1% of new loan | Paid at refinance |
| Promote/Carried Interest | 20-30% above preferred return | Performance-based |

### Platform Fee Opportunities (Where Raise Captures Value)
| Fee Type | Proposed Range | Justification |
|----------|---------------|---------------|
| Capital Formation Fee | 0.5-1.5% of equity raised | Replaces $50-100K in legal/admin costs |
| SaaS Subscription | $500-5,000/month | Tiered by sponsor portfolio size |
| Document Generation | $500-2,000/deal or included | AI-generated PPM, sub docs, OA |
| Investor Verification | $25-50/investor | KYC/AML/accreditation (pass-through + margin) |
| Distribution Processing | $5-15/payment | ACH processing |
| Intelligence Premium | $1,000-10,000/month | Advanced analytics, benchmarking, deal matching |
| White-Label Portal | $2,000-10,000/month | Custom-branded investor portal |
