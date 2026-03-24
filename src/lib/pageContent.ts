/** Rich copy for service detail pages */

export type ServiceDeepContent = {
  longLead: string;
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
      "We coordinate every leg of your shipment—carrier selection, documentation, and handoffs—so you get predictable transit times and clear visibility from booking to delivery. Whether you are moving full container loads, breakbulk, or time-sensitive air cargo, our team aligns mode and route with your commercial priorities.",
    highlights: [
      "Air, sea, and multimodal routing across major trade lanes",
      "Carrier relationships and allocation during peak seasons",
      "Commercial invoice, packing list, and B/L coordination",
      "Cargo insurance guidance and optional cover arrangements",
    ],
    whoItServes: "Corporate shippers, manufacturers, commodity traders, NGOs, and SMEs scaling import or export volumes.",
    workflow: [
      { title: "Cargo assessment", description: "Volume, Incoterms, commodity class, and compliance checks." },
      { title: "Mode & routing", description: "Air vs sea vs road—or combined—matched to budget and ETA." },
      { title: "Booking & docs", description: "Space booking, draft B/L, and export/import paperwork." },
      { title: "Tracking & handoff", description: "Milestone updates and delivery or warehouse coordination." },
    ],
    differentiators: [
      "Proactive port and line congestion updates",
      "Transparent line-item quotations",
      "Dedicated operations contact per account",
    ],
    faqs: [
      {
        q: "How far in advance should I book sea freight?",
        a: "For main lanes into Tema or Takoradi, we recommend 2–3 weeks before cargo readiness; peak season may require earlier booking. We’ll advise based on your lane and carrier.",
      },
      {
        q: "Can you handle hazardous or regulated cargo?",
        a: "Yes, subject to commodity class and documentation. Share MSDS or regulatory certs early so we can confirm carrier acceptance and packing requirements.",
      },
    ],
    relatedSlugs: ["customs-clearance", "door-to-door-delivery", "import-export-handling"],
  },
  "import-export-handling": {
    longLead:
      "Cross-border trade lives or dies on paperwork accuracy and timing. We align your commercial documents with customs and banking requirements, coordinate with carriers and brokers, and keep every party on the same timeline so releases and payments are not delayed.",
    highlights: [
      "Invoice, packing list, and certificate alignment",
      "Liaison with banks, insurers, and inspection agents",
      "Pre-arrival document submission where permitted",
      "Export packing and labeling guidance",
    ],
    whoItServes: "Importers, exporters, distributors, and trading houses moving goods through Ghana and ECOWAS.",
    workflow: [
      { title: "Document intake", description: "We review proforma, commercial invoice, and permits." },
      { title: "Gap analysis", description: "Flag missing certs, HS code issues, or valuation risks." },
      { title: "Stakeholder sync", description: "Align carrier, broker, and client on cut-offs." },
      { title: "Execution", description: "Submit, track, and close out each shipment file." },
    ],
    differentiators: ["Checklists tailored to your commodity", "Single thread for all shipment questions", "Archive of docs per job for audit"],
    faqs: [
      {
        q: "Do you assist with letters of credit?",
        a: "We work alongside your bank to ensure shipping documents match L/C fields and deadlines.",
      },
    ],
    relatedSlugs: ["customs-clearance", "freight-forwarding", "supply-chain-support-solutions"],
  },
  "customs-clearance": {
    longLead:
      "Our brokerage team navigates Ghana Customs and regional transit regimes with a focus on compliant classification, duty optimisation within the law, and fast release once assessments are issued.",
    highlights: [
      "HS classification support and binding advice where available",
      "Duty, VAT, and levy estimates before cargo arrives",
      "Physical examination coordination",
      "Transit bonds for inland and ECOWAS corridors",
    ],
    whoItServes: "Importers, freight forwarders needing local brokerage, and corporates with recurring clearance volumes.",
    workflow: [
      { title: "Pre-clearance", description: "IDF, classification, and duty forecast." },
      { title: "Submission", description: "Customs declaration and supporting uploads." },
      { title: "Assessment", description: "Respond to queries; arrange payment." },
      { title: "Release", description: "Gate pass, delivery order, and handover." },
    ],
    differentiators: ["Senior brokers on complex files", "Clear SLA for first response", "Post-clearance audit support"],
    faqs: [
      {
        q: "What documents do I need for general cargo?",
        a: "Typically: commercial invoice, packing list, B/L or AWB, IDF, and any product-specific permits. We’ll send a checklist for your exact HS line.",
      },
    ],
    relatedSlugs: ["import-export-handling", "warehousing-distribution", "inland-transportation-hauls"],
  },
  "warehousing-distribution": {
    longLead:
      "Secure storage, inventory accuracy, and disciplined outbound scheduling—whether you need buffer stock near Tema, regional distribution to Kumasi and beyond, or cross-docking to reduce handling costs.",
    highlights: [
      "Receiving, put-away, and cycle-count programmes",
      "FIFO / FEFO and batch traceability",
      "Pick, pack, and last-mile dispatch",
      "Reporting exports for your ERP or spreadsheet workflows",
    ],
    whoItServes: "FMCG, retail chains, industrial suppliers, and e-commerce fulfilment in Ghana.",
    workflow: [
      { title: "Needs design", description: "Space, throughput, and SKU profile." },
      { title: "Onboarding", description: "WMS setup, labeling rules, and SOPs." },
      { title: "Operations", description: "Inbound, storage, and outbound SLAs." },
      { title: "Review", description: "KPI dashboards and continuous improvement." },
    ],
    differentiators: ["Flexible contract terms", "Integration-friendly reporting", "Scalable footprint as you grow"],
    faqs: [
      {
        q: "Minimum commitment?",
        a: "We structure from short-term overflow to multi-year dedicated space—tell us your seasonality.",
      },
    ],
    relatedSlugs: ["inland-transportation-hauls", "door-to-door-delivery", "supply-chain-support-solutions"],
  },
  "inland-transportation-hauls": {
    longLead:
      "From container drays at Tema to long-haul convoys into Burkina Faso or Mali, we assign the right equipment and escorts, monitor transit risk, and confirm proof of delivery.",
    highlights: [
      "Flatbed, lowbed, and tautliner fleet access",
      "Route surveys for oversized loads",
      "Transit insurance and tracking checkpoints",
      "Cross-border permits and escorts",
    ],
    whoItServes: "Project owners, construction firms, mining suppliers, and general cargo movers.",
    workflow: [
      { title: "Route plan", description: "Permits, bridges, and curfew windows." },
      { title: "Fleet match", description: "Axle configs and securing method." },
      { title: "Dispatch", description: "Driver briefing and live updates." },
      { title: "POD", description: "Signed delivery and exception handling." },
    ],
    differentiators: ["24h dispatch desk", "Known corridor partners", "Transparent fuel and toll pass-through"],
    faqs: [
      {
        q: "Oversized cargo?",
        a: "We coordinate police escorts and road authority permits; lead times vary by corridor.",
      },
    ],
    relatedSlugs: ["door-to-door-delivery", "warehousing-distribution", "freight-forwarding"],
  },
  "door-to-door-delivery": {
    longLead:
      "One contract, one operations lead, and one invoice—from supplier’s dock to your warehouse or job site. We stitch together origin pickup, international main leg, clearance, and final mile.",
    highlights: [
      "Origin collection and export formalities",
      "Main carriage by air or sea",
      "Destination clearance and duties on your behalf",
      "Appointment delivery and liftgate where needed",
    ],
    whoItServes: "SMEs without in-house logistics, relocations, and corporates standardising on a single provider.",
    workflow: [
      { title: "Scope lock", description: "Incoterms and address validation." },
      { title: "Pickup", description: "Origin collection and export." },
      { title: "Main transit", description: "International movement and tracking." },
      { title: "Final mile", description: "Clear, deliver, POD." },
    ],
    differentiators: ["No finger-pointing between vendors", "Milestone notifications", "Consolidated billing"],
    faqs: [
      {
        q: "Is door-to-door available for personal effects?",
        a: "Yes—volume, origin country, and restricted items determine routing; we’ll quote after inventory review.",
      },
    ],
    relatedSlugs: ["freight-forwarding", "customs-clearance", "inland-transportation-hauls"],
  },
  "supply-chain-support-solutions": {
    longLead:
      "When your network spans multiple suppliers, modes, and markets, we help design resilient flows—safety stock placement, alternate routing, and performance metrics your leadership can trust.",
    highlights: [
      "Network design and cost-to-serve modelling",
      "Vendor-managed inventory concepts",
      "KPI frameworks: OTIF, cost per kg, dwell time",
      "Scenario planning for disruption",
    ],
    whoItServes: "COOs, supply chain directors, and scaling enterprises entering West Africa.",
    workflow: [
      { title: "Diagnostic", description: "Map flows, costs, and pain points." },
      { title: "Design", description: "Target operating model and lanes." },
      { title: "Pilot", description: "Limited rollout with metrics." },
      { title: "Scale", description: "Embed processes and governance." },
    ],
    differentiators: ["Practitioner-led—not slideware", "Aligned with execution teams", "Measurable ROI checkpoints"],
    faqs: [
      {
        q: "Is this separate from freight execution?",
        a: "We can advise only or combine consulting with our operational services under one roadmap.",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
    featuredImage: "/insights-featured.png",
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
