/** Rich copy for service detail pages */

export type ServiceDeepContent = {
  longLead: string;
  /** Optional named sub-lines (e.g. ship agency pillars) rendered as a grid on the detail page */
  offerings?: { title: string; description: string }[];
  highlights: string[];
  whoItServes: string;
  workflow: { title: string; description: string }[];
  differentiators: string[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
};

export const SERVICE_DEEP: Record<string, ServiceDeepContent> = {
  "freight-forwarding": {
    longLead:
      "Freight forwarding should feel like controlled execution, not shipping theatre. We build lane strategy around your commercial constraints first: stock-out risk, cash cycle, customer SLA, compliance exposure, and escalation tolerance. Then we run the file with discipline - carrier options, routing logic, document gates, and milestone governance - so your team is not firefighting in email chains three days before ETA.",
    highlights: [
      "Mode architecture by lane and urgency: ocean, air, sea-air, or road bridge where it actually improves OTIF",
      "Carrier mix strategy for peak periods - primary/secondary options, rollover contingencies, and booking windows",
      "Document control from draft B/L through final set to reduce amend-at-destination costs",
      "Exception command: delay signals, alternative routings, and decision-ready options for your operations lead",
    ],
    whoItServes:
      "Procurement and supply teams managing recurring imports/exports, manufacturers balancing cost and service levels, and growth-stage businesses moving from ad-hoc bookings to governed lane management.",
    workflow: [
      {
        title: "Commercial intake",
        description: "We lock shipment objective: target ETA, service level, budget tolerance, and non-negotiable compliance points.",
      },
      {
        title: "Lane engineering",
        description: "Carrier and route options are priced with assumptions, transit risk, and fallback plans before booking.",
      },
      {
        title: "Execution control",
        description: "Booking, draft documents, approvals, and pre-alerts are run through a single accountable operations thread.",
      },
      {
        title: "Arrival governance",
        description: "We coordinate handoff into clearance, delivery, or storage with exception updates before issues become delays.",
      },
    ],
    differentiators: [
      "Forwarding logic designed for CFO visibility, not just freight rates",
      "Named operator ownership per file with escalation accountability",
      "Quote assumptions and re-rate triggers documented before commitment",
    ],
    faqs: [
      {
        q: "How early should we book to avoid rollovers?",
        a: "For most ocean lanes into Ghana, 2-3 weeks before cargo readiness is the practical baseline; peak periods may require longer lead. We give a lane-specific booking window with fallback options so your production schedule is protected.",
      },
      {
        q: "Can you run regulated or sensitive commodities?",
        a: "Yes, where documentation, packing standards, and carrier acceptance are met. Share MSDS, permits, and handling requirements early so we can validate feasibility before you incur avoidable cost.",
      },
    ],
    relatedSlugs: ["customs-clearance", "door-to-door-delivery", "import-export-handling", "ship-agency"],
  },
  "import-export-handling": {
    longLead:
      "Most cross-border delays are not transport delays - they are document and coordination failures. Our import/export handling service is built as a control tower for paperwork, counterparties, and cut-offs. We align supplier docs, banking requirements, carrier rules, and customs expectations into one governed file so release, payment, and delivery stay synchronized.",
    highlights: [
      "Document QA before shipment: invoice, packing list, certs, permit mapping, and mismatch flags",
      "Bank-facing support for L/C-compliant sets and amendment risk reduction",
      "Pre-arrival document readiness to reduce avoidable destination dwell",
      "Supplier coaching on label, packing, and declaration standards for repeat flows",
    ],
    whoItServes:
      "Import managers, export teams, distributors, and trading businesses that need predictable documentation outcomes across multiple parties and jurisdictions.",
    workflow: [
      {
        title: "File onboarding",
        description: "We collect commercial docs, trade terms, permit needs, and counterparties in a single control sheet.",
      },
      {
        title: "Risk screening",
        description: "Gaps in classification, valuation, certificates, or banking fields are resolved before cargo moves.",
      },
      {
        title: "Counterparty alignment",
        description: "Carrier, broker, bank, supplier, and client cut-offs are synchronized with explicit ownership.",
      },
      {
        title: "Release follow-through",
        description: "Submission, response handling, and close-out records are managed until full document completion.",
      },
    ],
    differentiators: [
      "Commodity-specific checklists that reduce first-review failures",
      "Single communication thread across all external parties",
      "Audit-friendly document pack retention per shipment file",
    ],
    faqs: [
      {
        q: "Do you assist with letters of credit?",
        a: "Yes. We map shipping documents against L/C fields and timelines before issuance and again before final set release, reducing costly amendment loops.",
      },
    ],
    relatedSlugs: ["customs-clearance", "freight-forwarding", "supply-chain-support-solutions", "ship-agency"],
  },
  "customs-clearance": {
    longLead:
      "Customs clearance is where weak preparation becomes expensive. We run clearance as a compliance-first operation: correct classification, valuation logic, permit readiness, and disciplined query management. The objective is simple - lawful duty outcomes, fewer examination surprises, and release timelines your commercial team can actually plan around.",
    highlights: [
      "HS classification support with documented rationale on sensitive lines",
      "Pre-arrival duty and levy estimates for landed-cost planning",
      "Inspection and examination handling with rapid response protocol",
      "Transit bond structuring for inland and ECOWAS-linked movements",
    ],
    whoItServes:
      "Importers with recurring cargo, forwarders needing in-country brokerage strength, and enterprises that require auditable customs governance across high-value files.",
    workflow: [
      { title: "Pre-clearance architecture", description: "Classification, IDF readiness, permit checks, and landed-duty forecast." },
      { title: "Declaration submission", description: "Entry filing with controlled document packs and submission verification." },
      { title: "Assessment management", description: "Query response, evidence preparation, and payment sequencing to avoid idle time." },
      { title: "Release orchestration", description: "Gate-out, delivery order alignment, and handoff into transport or warehouse." },
    ],
    differentiators: [
      "Senior broker oversight on complex or high-risk declarations",
      "Clear response SLAs during assessment and examination stages",
      "Post-clearance support for internal audit and control evidence",
    ],
    faqs: [
      {
        q: "What documents do I need for general cargo?",
        a: "Typically invoice, packing list, transport document, IDF, and commodity-specific permits. We issue a tailored checklist by HS line so your team can submit once and submit right.",
      },
    ],
    relatedSlugs: ["import-export-handling", "warehousing-distribution", "inland-transportation-hauls", "ship-agency"],
  },
  "ship-agency": {
    longLead:
      "Ship agency performance is measured in hours saved, disputes prevented, and confidence retained between shore office and vessel. We act as your disciplined local command point at Ghana ports: authority interface, DA control, husbandry execution, protective oversight, and structured reporting that keeps owners, charterers, Masters, and technical managers aligned in real time.",
    offerings: [
      {
        title: "Full ship agency",
        description:
          "Complete call management from inward clearance to outward sailing: pilotage, berth interface, authority coordination, DA preparation, cash-to-master, and event reporting to your operations desk.",
      },
      {
        title: "Husbandry agency",
        description:
          "Crew changes, spares, stores, bunkers, freshwater, waste, launch services, and repair support timed to berth windows to protect turnaround.",
      },
      {
        title: "Protective agency",
        description:
          "Independent owner/charterer representation where another commercial agent is nominated. We verify SOF/timesheets, monitor DA accuracy, and escalate discrepancies before they become claims.",
      },
      {
        title: "Meet & greet / concierge",
        description:
          "Arrival and transit management for superintendents and principals through Accra - meet-and-greet, secure transfer, and schedule-aligned handoff.",
      },
      {
        title: "Information packs",
        description:
          "Call-specific pre-arrival intelligence: local rules, expected documents, indicative costs, and contact matrix for office and vessel alignment.",
      },
      {
        title: "Port & terminal liaison",
        description:
          "Daily interface with port, terminal, immigration, health, and related authorities translated into milestone updates your shore team can act on.",
      },
    ],
    highlights: [
      "Vessel-type coverage across tanker, bulk, ro/ro, project, and general cargo calls",
      "Charter-party aware coordination with owners, charterers, receivers, and nominated reps",
      "DA governance with line-item transparency and approval traceability",
      "Real-time call communication through one accountable operations channel",
    ],
    whoItServes:
      "Owners, operators, charterers, technical managers, and traders requiring reliable local representation at Tema and Takoradi with professional call governance.",
    workflow: [
      { title: "Pre-arrival control", description: "Appointment, ETA/draft/cargo confirmation, authority prep, and DA baseline issued." },
      { title: "Berth execution", description: "Clearance, attendance, husbandry, and survey coordination against call priorities." },
      { title: "Live call reporting", description: "Structured updates, stakeholder synchronization, and issue escalation while alongside." },
      { title: "Departure close-out", description: "SOF/DA reconciliation, sailing clearance, and final finance-ready documentation." },
    ],
    differentiators: [
      "Operators fluent in both vessel realities and charter-party implications",
      "Vetted supplier ecosystem with compliance discipline, not shortcuts",
      "Full and protective agency capabilities under one accountability model",
    ],
    faqs: [
      {
        q: "Which Ghana ports do you cover?",
        a: "Core ship-agency coverage is centred on Tema and Takoradi. Principal and superintendent transit support is coordinated through Accra as needed.",
      },
      {
        q: "When should we appoint protective rather than full agency?",
        a: "Use protective agency when another party nominates the commercial agent but you still need independent attendance, SOF scrutiny, and DA validation. We advise model selection after a short review of charter structure and risk posture.",
      },
      {
        q: "Can you work with our existing husbandry suppliers?",
        a: "Yes. We can integrate your approved suppliers provided they meet safety, response, and invoicing standards required for controlled call execution.",
      },
    ],
    relatedSlugs: ["freight-forwarding", "customs-clearance", "import-export-handling"],
  },
  "warehousing-distribution": {
    longLead:
      "Warehousing should be an operating advantage, not a cost sink. We design storage and distribution around throughput, dwell profile, and service commitments - then run it with inventory discipline, dispatch control, and reporting that plugs cleanly into your planning cycle. From buffer stock near Tema to multi-point outbound across Ghana, the objective is predictable movement with fewer surprises.",
    highlights: [
      "Structured receiving, put-away, and cycle-count routines with accountability checkpoints",
      "FIFO/FEFO controls, batch visibility, and traceability readiness for regulated lines",
      "Pick-pack-dispatch workflows calibrated to cut-off and route commitments",
      "Operational reporting exports aligned to ERP or management-sheet workflows",
    ],
    whoItServes:
      "FMCG and retail teams with velocity pressure, industrial suppliers needing buffer reliability, and e-commerce or distribution operations scaling controlled fulfilment.",
    workflow: [
      { title: "Footprint design", description: "Space, SKU profile, throughput rhythm, and service-level targets are defined." },
      { title: "Control setup", description: "SOPs, labelling, stock logic, and reporting templates are configured for your operation." },
      { title: "Daily execution", description: "Inbound, storage, and outbound run against agreed cut-offs and exception rules." },
      { title: "Performance review", description: "KPI review and process tuning to improve accuracy, speed, and cost-to-serve." },
    ],
    differentiators: [
      "Operational flexibility without sacrificing control standards",
      "Reporting designed for decision-making, not vanity dashboards",
      "Scalable model from overflow support to dedicated programmes",
    ],
    faqs: [
      {
        q: "Do we need a long-term contract to start?",
        a: "Not necessarily. We support short-term overflow, seasonal programmes, and longer dedicated models - structured around your throughput certainty.",
      },
    ],
    relatedSlugs: ["inland-transportation-hauls", "door-to-door-delivery", "supply-chain-support-solutions"],
  },
  "inland-transportation-hauls": {
    longLead:
      "Inland transport performance is won in planning, not dispatch-day improvisation. We run haulage with route intelligence, equipment-fit discipline, permit readiness, and checkpoint visibility so your cargo moves across Ghana and corridor routes with fewer surprises. Whether drayage, project cargo, or long-haul regional transport, we treat each run as a governed operation.",
    highlights: [
      "Fleet matching by cargo profile: container, flatbed, lowbed, tautliner, and project configurations",
      "Route surveys and risk controls for oversize, sensitive, or high-value movements",
      "Transit checkpoint reporting and exception escalation protocol",
      "Permit and escort coordination for cross-border and controlled routes",
    ],
    whoItServes:
      "Project operators, construction and mining supply chains, and enterprise logistics teams requiring dependable inland and corridor execution.",
    workflow: [
      { title: "Route intelligence", description: "Bridge limits, permit windows, curfews, and risk points are validated pre-dispatch." },
      { title: "Equipment assignment", description: "Vehicle and securing configuration matched to cargo characteristics and compliance needs." },
      { title: "Transit execution", description: "Dispatch, checkpoint updates, and response playbooks run through a monitored ops desk." },
      { title: "Delivery close-out", description: "POD, exceptions, and commercial close are documented for client and audit reference." },
    ],
    differentiators: [
      "Dispatch governance with escalation paths for active moves",
      "Corridor-ready partner network with proven border execution",
      "Transparent pass-through visibility on fuel, toll, and permit components",
    ],
    faqs: [
      {
        q: "Can you handle oversize or heavy-lift movements?",
        a: "Yes. We coordinate route survey, permit application, escort requirements, and movement windows. Lead times vary by corridor and cargo envelope.",
      },
    ],
    relatedSlugs: ["door-to-door-delivery", "warehousing-distribution", "freight-forwarding"],
  },
  "door-to-door-delivery": {
    longLead:
      "Door-to-door should remove complexity, not hide it. We integrate pickup, international leg, clearance, and final delivery under one accountable operations lead, with commercial transparency at every stage. You get one governed service chain, one decision path, and one accountable partner from origin handover to proof-of-delivery.",
    highlights: [
      "Origin pickup coordination and export-document readiness",
      "Main carriage optimization by timeline and landed-cost objective",
      "Destination customs and release management with proactive issue handling",
      "Final-mile appointment delivery with POD capture and close-out reporting",
    ],
    whoItServes:
      "Businesses that want fewer vendors and clearer accountability - including SME importers, project teams, and corporates standardising logistics under one operating model.",
    workflow: [
      { title: "Scope definition", description: "Incoterms, cargo profile, origin/destination constraints, and delivery windows are confirmed." },
      { title: "Origin execution", description: "Collection and export formalities are completed with pre-alert and document controls." },
      { title: "Transit management", description: "Main-leg movement is monitored with milestone and exception communication." },
      { title: "Destination completion", description: "Clearance, final delivery, and POD are closed under one accountable file owner." },
    ],
    differentiators: [
      "Single-party accountability across the entire delivery chain",
      "Milestone visibility built for operations and finance stakeholders",
      "Consolidated commercial structure with controlled pass-through clarity",
    ],
    faqs: [
      {
        q: "Do you support non-standard deliveries (sites, projects, timed drops)?",
        a: "Yes, subject to access constraints and handling needs. We scope delivery requirements up front so route, equipment, and timing are properly engineered.",
      },
    ],
    relatedSlugs: ["freight-forwarding", "customs-clearance", "inland-transportation-hauls"],
  },
  "supply-chain-support-solutions": {
    longLead:
      "When logistics complexity grows, costs rise quietly before service visibly fails. Our supply-chain support service helps leadership teams redesign flows around measurable outcomes: lower cost-to-serve, stronger service reliability, and cleaner operating governance. We combine advisory thinking with execution reality so recommendations survive contact with daily operations.",
    highlights: [
      "Network diagnostics and cost-to-serve modelling by lane, node, and product family",
      "Inventory and replenishment strategy to balance service level and working capital",
      "KPI architecture: OTIF, dwell time, landed cost variance, and exception frequency",
      "Scenario planning for disruption, supplier shifts, and capacity constraints",
    ],
    whoItServes:
      "COOs, supply-chain directors, and transformation teams who need practical redesign support tied to execution capability in Ghana and West Africa.",
    workflow: [
      { title: "Diagnostic baseline", description: "We map current flows, costs, service breaks, and control gaps with hard evidence." },
      { title: "Future-state design", description: "Target lane strategy, inventory policy, and governance model are defined with trade-offs." },
      { title: "Pilot execution", description: "Selected recommendations are trialed in live operations with measurable KPI targets." },
      { title: "Scale and embed", description: "Winning patterns are rolled out with process ownership, cadence, and review governance." },
    ],
    differentiators: [
      "Practitioner-led delivery with implementation realism",
      "Direct linkage between strategic recommendations and operating teams",
      "Measured business outcomes with explicit ROI checkpoints",
    ],
    faqs: [
      {
        q: "Is this separate from freight execution?",
        a: "It can be either. Some clients use advisory-only support; others combine design and execution under one roadmap so operational adoption is faster.",
      },
    ],
    relatedSlugs: ["freight-forwarding", "warehousing-distribution", "import-export-handling"],
  },
};

export const DEFAULT_SERVICE_DEEP: ServiceDeepContent = {
  longLead:
    "Our team tailors logistics execution to your commodity, timeline, and compliance profile. From first inquiry through final delivery, you work with experienced operators who understand Ghana and the wider West Africa corridor.",
  highlights: [
    "Structured quotation and booking process",
    "Documentation and regulatory alignment",
    "Tracking and proactive exception management",
  ],
  whoItServes: "Corporate clients, SMEs, and international traders.",
  workflow: [
    { title: "Inquiry", description: "Tell us origin, destination, and cargo profile." },
    { title: "Quote", description: "Detailed line items and timelines." },
    { title: "Book", description: "Confirm space and submit paperwork." },
    { title: "Deliver", description: "Track through to POD." },
  ],
  differentiators: ["Reliable execution", "Clear communication", "Compliance-first mindset"],
  faqs: [],
  relatedSlugs: ["freight-forwarding", "customs-clearance"],
};

export type InsightPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  published_at: string;
  featured?: boolean;
  authorKey: "default" | "broker" | "freight";
  /** Optional OG and hero image path (e.g. /insights-featured.png or per-article) */
  featuredImage?: string;
};

export const MOCK_INSIGHTS: InsightPost[] = [
  {
    id: "1",
    title: "Logistics in Ghana: A Practical Guide for Importers",
    slug: "logistics-ghana-guide",
    excerpt:
      "Ports, documentation, and timelines—what every procurement team should know before their first container hits Tema.",
    category: "Guides",
    readTime: "8 min read",
    published_at: "2025-03-01",
    featured: true,
    authorKey: "freight",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "2",
    title: "Customs Clearance: Reducing Delays at Tema",
    slug: "customs-clearance-best-practices",
    excerpt: "Pre-arrival filing, classification discipline, and how to avoid common examination triggers.",
    category: "Compliance",
    readTime: "6 min read",
    published_at: "2025-02-22",
    featured: false,
    authorKey: "broker",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "3",
    title: "West Africa Freight Corridors in 2025",
    slug: "west-africa-freight-routes",
    excerpt: "Key lanes, transit risks, and mode choices for Abidjan, Lomé, Dakar, and landlocked neighbours.",
    category: "Corridors",
    readTime: "10 min read",
    published_at: "2025-02-14",
    featured: false,
    authorKey: "freight",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "4",
    title: "Choosing Between LCL and FCL for SME Growth",
    slug: "lcl-fcl-sme",
    excerpt: "When consolidation saves cash flow—and when full containers unlock reliability.",
    category: "Strategy",
    readTime: "5 min read",
    published_at: "2025-02-08",
    featured: false,
    authorKey: "default",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "5",
    title: "Incoterms 2020: What Logistics Teams Get Wrong",
    slug: "incoterms-logistics",
    excerpt: "A concise refresher on risk transfer and who pays for what on common Ghana trade lanes.",
    category: "Compliance",
    readTime: "7 min read",
    published_at: "2025-01-28",
    featured: false,
    authorKey: "broker",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "6",
    title: "Warehousing Near Tema: Location Trade-offs",
    slug: "warehousing-tema",
    excerpt: "Drayage cost vs rent—how to size buffer stock and distribution nodes.",
    category: "Operations",
    readTime: "6 min read",
    published_at: "2025-01-15",
    featured: false,
    authorKey: "default",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "7",
    title: "Sanctions Screening: A Forwarder’s Checklist",
    slug: "sanctions-screening-checklist",
    excerpt: "Why commodity and counterparty screening matters before you book space—and how we document it.",
    category: "Compliance",
    readTime: "5 min read",
    published_at: "2025-03-10",
    featured: false,
    authorKey: "broker",
    featuredImage: "/insights-featured.webp",
  },
  {
    id: "8",
    title: "Carbon Signals in West Africa Ocean Freight",
    slug: "carbon-ocean-freight-west-africa",
    excerpt: "Carrier CII ratings, slow-steaming, and what corporate shippers should ask for in RFPs.",
    category: "Strategy",
    readTime: "7 min read",
    published_at: "2025-03-05",
    featured: false,
    authorKey: "freight",
    featuredImage: "/insights-featured.webp",
  },
];

export type InsightSection = { heading: string; paragraphs: string[] };

export const INSIGHT_SECTIONS: Record<string, InsightSection[]> = {
  "logistics-ghana-guide": [
    {
      heading: "Why Tema dominates inbound flow",
      paragraphs: [
        "Tema remains the primary gateway for containerised imports into Ghana. Understanding terminal cut-offs, stacking rules, and local charge structures before your vessel sails prevents expensive demurrage and storage loops on arrival.",
        "Work backwards from your required delivery date: allow time for discharge, examination (if selected), duty payment, and trucking to your warehouse or ICD. Peak seasons and public holidays compress effective working hours—factor them into your first-mile plan.",
      ],
    },
    {
      heading: "Documentation that survives first review",
      paragraphs: [
        "Commercial invoices should reflect true value and match packing lists line-for-line where possible. HS codes should be consistent across documents; discrepancies are a common trigger for secondary review.",
        "If you use letters of credit, align shipping documents with the L/C fields before cargo sails. Amendments at destination are costly and often impossible once the bill of lading is issued.",
      ],
    },
    {
      heading: "Working with a local partner",
      paragraphs: [
        "A competent broker and forwarder combination reduces email chains between you, the carrier, and customs. Look for named contacts, written quotations, and milestone-based updates rather than ad-hoc WhatsApp threads alone.",
        "Premium 1 structures each file with a reference number, document checklist, and escalation path—so finance, procurement, and operations stay aligned.",
      ],
    },
  ],
  "customs-clearance-best-practices": [
    {
      heading: "Pre-arrival discipline",
      paragraphs: [
        "Submit complete document packs as early as regulations allow. Early visibility lets brokers flag classification or permit gaps while you still have time to amend supplier documents.",
        "Validate HS codes against historical entries for similar commodities—surprises at assessment stage add days, not hours.",
      ],
    },
    {
      heading: "Examination risk",
      paragraphs: [
        "Random and risk-based examinations are normal. Minimise delay by ensuring seal integrity, accurate piece counts, and clear marking that matches the packing list.",
        "For sensitive commodities, pre-clear permits and third-party certificates before vessel arrival.",
      ],
    },
  ],
  "west-africa-freight-routes": [
    {
      heading: "Coastal hubs vs landlocked destinations",
      paragraphs: [
        "Abidjan, Lomé, Tema, and Dakar each offer different feeder reliability and transit norms into Burkina Faso, Mali, and Niger. Mode choice should include total transit time, not just ocean freight.",
        "Road transits require bond management and sometimes escorts. Budget for fuel volatility and border dwell in peak periods.",
      ],
    },
    {
      heading: "Air vs sea for Sahel corridors",
      paragraphs: [
        "High-value or time-critical cargo into landlocked markets may justify air into Accra or Lomé plus road leg, versus a full sea–road combination. Model total landed cost including inventory carrying cost.",
      ],
    },
  ],
  "lcl-fcl-sme": [
    {
      heading: "When LCL wins",
      paragraphs: [
        "Lower volume and cash-flow sensitivity favour LCL: you pay for space used and can ship more frequently without tying up a full container deposit.",
        "Watch consolidation cut-offs and destination deconsolidation charges—they can erode savings if your supplier ships late repeatedly.",
      ],
    },
    {
      heading: "When to step up to FCL",
      paragraphs: [
        "Volume thresholds, commodity sensitivity (odour, contamination risk), and schedule reliability often push growing SMEs toward FCL. You gain control of sealing and sometimes faster release at destination.",
      ],
    },
  ],
  "incoterms-logistics": [
    {
      heading: "Risk vs cost",
      paragraphs: [
        "Incoterms define where risk transfers—not always who pays freight. EXW vs FOB vs CIF each implies different insurance and documentation burdens on the buyer.",
        "For Ghana imports, clarify who appoints the clearing agent and who pays local charges before you sign purchase terms.",
      ],
    },
  ],
  "warehousing-tema": [
    {
      heading: "Drayage vs rent",
      paragraphs: [
        "Warehousing close to Tema reduces per-move drayage but may carry higher rent per square metre. Model monthly moves and average dwell to find the break-even radius.",
      ],
    },
    {
      heading: "Buffer stock placement",
      paragraphs: [
        "Place safety stock where replenishment lead times are shortest relative to demand volatility—often Accra metro for nationwide distribution, with satellite hubs for high-volume regions.",
      ],
    },
  ],
  "sanctions-screening-checklist": [
    {
      heading: "Counterparty and commodity",
      paragraphs: [
        "Screen shipper, consignee, notify party, and banks on every file. For sensitive commodities, confirm HS chapters against restricted lists before accepting bookings.",
      ],
    },
    {
      heading: "Documentation trail",
      paragraphs: [
        "Retain screening timestamps and tool outputs in the shipment file. Auditors and insurers increasingly ask for evidence of reasonable care.",
      ],
    },
  ],
  "carbon-ocean-freight-west-africa": [
    {
      heading: "Carrier efficiency",
      paragraphs: [
        "IMO CII and EU ETS are reshaping carrier deployment. Ask carriers for vessel-class efficiency on your lanes—not just headline freight rates.",
      ],
    },
    {
      heading: "What to put in RFPs",
      paragraphs: [
        "Request emissions reporting per TEU, optional book-and-claim biofuel programmes, and modal shift scenarios (e.g. partial air for critical SKUs only).",
      ],
    },
  ],
};

export function getInsightSections(slug: string): InsightSection[] {
  return (
    INSIGHT_SECTIONS[slug] ?? [
      {
        heading: "Overview",
        paragraphs: [
          "This article is part of our insights series on logistics in Ghana and West Africa. Contact our team for lane-specific guidance tailored to your commodity and compliance profile.",
        ],
      },
    ]
  );
}
