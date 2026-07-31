/* ═══════════════════════════════════════════════════════════════
 *  BRAND CONFIG — edit this block first after deploying.
 *  Everything below is wired into the live site.
 * ═══════════════════════════════════════════════════════════════ */
export const BRAND = {
  /** Put your logo in /public (e.g. public/logo.png) then set "/logo.png".
   *  Empty string = keep the built-in drawn Brounic mark. */
  logoUrl: "/logo.png",
  logoHeight: 50,
  name: "BROUNIC GROUP",
  tagline: "FIRE & SAFETY",
  siteUrl: "https://www.brounic.com",

};

/**
 * Pexels image helper. On small viewports we automatically request a smaller
 * image variant to cut mobile bandwidth by ~60-70%.
 */
export const px = (id: number | string, w = 1400) => {
  const width =
    typeof window !== "undefined" && window.innerWidth < 900
      ? Math.min(w, 900)
      : w;
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
};

export const IMG = {
  heroPoster: px(36595991, 1920),
  heroVideo: "https://videos.pexels.com/video-files/35241565/14929934_3840_2160_24fps.mp4",
  controlRoom: px(32845700, 1600),
  monitors: px(11783119, 1400),
  engineerFemale: px(3862132, 1400),
  firefighters: px(5964975, 1400),
  firefighterGear: px(5964750, 1200),
  firefighterUniform: px(5965024, 1200),
  safetySigns: px(38725738, 1200),
  emergencyButton: px(38785606, 1200),
  ceilingRed: px(2464420, 1400),
  hydrantStreet: px(7146867, 1400),
  pipesGauge: px(7937300, 1400),
  machineRoom: px(17728782, 1400),
  pipeMeters: px(19841125, 1400),
  steelPlant: px(33514501, 1400),
  valves: px(17728787, 1400),
  refinery: px(15970032, 1400),
  refineryNight: px(10386893, 1400),
  tanks: px(31403876, 1400),
  factorySunset: px(14154603, 1400),
  factoryNight: px(3855962, 1400),
  plantTank: px(6537731, 1400),
  containers: px(17816971, 1400),
  skylineDay: px(36351739, 1800),
  skylineNight: px(35541845, 1800),
  skylineFlag: px(5587294, 1400),
  waterfront: px(38130142, 1400),
  mosqueCity: px(35132581, 1400),
  duct: px(11538226, 1400),
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Systems", href: "#systems" },
  { label: "Industries", href: "#industries" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Certifications", href: "#certifications" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Certified Professionals" },
  { value: 100, suffix: "%", label: "Safety Commitment" },
];

export const TIMELINE = [
  {
    year: "2011",
    title: "Founded in Abu Dhabi",
    body: "Brounic Group is established with a single mandate — engineer fire protection that never fails. First maintenance contracts secured in Mussafah.",
  },
  {
    year: "2014",
    title: "Civil Defence Approval",
    body: "Full contractor approval obtained for design, installation, testing and commissioning of life-safety systems across the Emirate.",
  },
  {
    year: "2016",
    title: "Engineering Division Launched",
    body: "In-house hydraulic calculation, shop-drawing and NFPA compliance studio formed, cutting authority approval cycles by 40%.",
  },
  {
    year: "2018",
    title: "Industrial & Oil / Gas Entry",
    body: "Pre-qualified for high-hazard environments — foam suppression, deluge and gaseous systems for energy sector clients.",
  },
  {
    year: "2021",
    title: "ICV Certified & 500th Project",
    body: "In-Country Value certification achieved, reinforcing our contribution to the UAE's industrial ecosystem.",
  },
  {
    year: "2023",
    title: "24/7 AMC Command Centre",
    body: "Dedicated response desk launched — guaranteed 4-hour emergency attendance anywhere in the UAE.",
  },
  {
    year: "Today",
    title: "National Leadership",
    body: "500+ completed projects, 50+ specialists, and a portfolio spanning towers, plants, hospitals, malls and data centres.",
  },
];

export const VALUES = [
  {
    n: "01",
    title: "Safety First",
    body: "We prioritise safety in every aspect of our work, ensuring secure environments for our clients, team and communities.",
  },
  {
    n: "02",
    title: "Integrity & Trust",
    body: "We conduct business with honesty, transparency and accountability, building lasting relationships through trust and respect.",
  },
  {
    n: "03",
    title: "Excellence in Service",
    body: "We are committed to providing superior quality in our services and products, consistently exceeding client expectations.",
  },
];

export type Service = {
  key: string;
  title: string;
  short: string;
  detail: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    key: "sprinkler",
    title: "Automatic Sprinkler Systems",
    short: "Hydraulically calculated wet, dry, pre-action and deluge networks.",
    detail:
      "Full lifecycle delivery of automatic sprinkler protection — from hazard classification and hydraulic calculation to pipe fabrication, installation and flushing.",
    points: ["NFPA 13 hydraulic design", "Wet / dry / pre-action / deluge", "Grooved & welded fabrication", "Flow test & witness handover"],
  },
  {
    key: "alarm",
    title: "Fire Alarm & Detection",
    short: "Addressable detection, graphic monitoring and BMS integration.",
    detail:
      "Intelligent addressable fire detection engineered around your building's risk profile, with full integration into BMS, access control and voice evacuation.",
    points: ["Addressable & conventional panels", "Aspirating & beam detection", "Graphic monitoring stations", "Civil Defence Hassantuk linkage"],
  },
  {
    key: "emergency-light",
    title: "Emergency Lighting",
    short: "Escape-route illumination with self-testing battery packs.",
    detail:
      "Photometric-designed emergency lighting ensuring compliant lux levels along every escape route, with central battery or self-contained luminaires.",
    points: ["Photometric lux modelling", "Central & self-contained units", "90-minute autonomy testing", "Annual discharge certification"],
  },
  {
    key: "exit",
    title: "Exit & Directional Signage",
    short: "Illuminated, photoluminescent and dynamic wayfinding.",
    detail:
      "Clear, code-compliant egress signage that performs in smoke-logged conditions — specified, installed and certified to UAE Fire & Life Safety Code.",
    points: ["Maintained & non-maintained", "Photoluminescent wayfinding", "Directional escape planning", "Visibility distance compliance"],
  },
  {
    key: "extinguisher",
    title: "Fire Extinguishers",
    short: "Supply, siting, servicing and refilling of all extinguisher classes.",
    detail:
      "Risk-matched portable extinguisher programmes — CO₂, dry powder, foam, water and wet chemical — with scheduled inspection and refill logistics.",
    points: ["Class A–F risk matching", "Monthly & annual inspection", "Hydro-testing & refilling", "Digital asset tagging"],
  },
  {
    key: "call-point",
    title: "Manual Call Points",
    short: "Break-glass initiation devices on every escape route.",
    detail:
      "Strategically located manual initiation devices with weatherproof and hazardous-area variants, fully addressable and individually annunciated.",
    points: ["Addressable & conventional", "IP-rated external variants", "Travel-distance compliance", "Loop testing & labelling"],
  },
  {
    key: "hydrant",
    title: "Fire Hydrant Systems",
    short: "Wet & dry risers, landing valves and external hydrant rings.",
    detail:
      "Complete hydrant infrastructure — underground rings, breeching inlets, landing valves and cabinets — pressure tested and Civil Defence witnessed.",
    points: ["Wet & dry riser networks", "External hydrant ring mains", "Breeching inlet assemblies", "Pressure & flow validation"],
  },
  {
    key: "pump",
    title: "Fire Pump Rooms",
    short: "UL/FM listed electric, diesel and jockey pump sets.",
    detail:
      "Turnkey pump room delivery — pump selection, suction/discharge headers, controllers, tanks and annual NFPA 25 performance testing.",
    points: ["UL / FM listed pump sets", "Diesel & electric duty", "Controller & ATS integration", "NFPA 25 flow testing"],
  },
  {
    key: "hose-reel",
    title: "Fire Hose Reels & Cabinets",
    short: "First-aid firefighting equipment at every risk zone.",
    detail:
      "Swinging and fixed hose reel assemblies within architectural cabinets, hydro-tested and integrated with the wet riser network.",
    points: ["30m swinging reels", "Architect-matched cabinets", "Hydrostatic testing", "Nozzle & valve servicing"],
  },
  {
    key: "pava",
    title: "PA / VA Systems",
    short: "Voice evacuation and public address with zone intelligence",
    detail:
      "EN 54-16 compliant voice alarm systems delivering intelligible phased evacuation messaging, with background music and paging capability.",
    points: ["EN 54-16 voice alarm", "Phased evacuation logic", "Speech intelligibility (STI)", "Paging & BGM integration"],
  },
  {
    key: "suppression",
    title: "Fire Suppression Systems",
    short: "Clean agent, CO₂, foam, watermist and kitchen suppression.",
    detail:
      "Special hazard suppression for data centres, switch rooms, kitchens and fuel storage — designed on concentration and discharge modelling.",
    points: ["FM-200 / NOVEC / Inergen", "CO₂ & foam deluge", "Kitchen hood wet chemical", "Room integrity fan testing"],
  },
  {
    key: "testing",
    title: "Testing & Commissioning",
    short: "Independent validation, witnessing and authority handover.",
    detail:
      "Structured pre-commissioning, cause-and-effect matrix validation and Civil Defence witnessing — documented with full T&C dossiers.",
    points: ["Cause & effect matrices", "Integrated systems testing", "Authority witnessing", "As-built & O&M dossiers"],
  },
  {
    key: "amc",
    title: "AMC & Maintenance",
    short: "Planned preventive maintenance with 24/7 emergency response.",
    detail:
      "Annual maintenance contracts built on NFPA 25 inspection frequencies, with digital reporting, spares stocking and guaranteed response SLAs.",
    points: ["NFPA 25 PPM schedules", "4-hour emergency response", "Digital inspection reports", "Genuine spare parts stock"],
  },
  {
    key: "design",
    title: "Design & Engineering",
    short: "Concept-to-approval design, calculations and BIM coordination.",
    detail:
      "Chartered engineering support producing shop drawings, hydraulic calculations, battery/voltage-drop studies and clash-free BIM coordination.",
    points: ["Shop & as-built drawings", "Hydraulic & battery calculations", "Revit / BIM coordination", "Authority submission packs"],
  },
  {
    key: "install",
    title: "Supply & Installation",
    short: "Reputable brands, certified technicians, programme certainty.",
    detail:
      "Procurement of listed equipment from world-class manufacturers and installation by our own certified workforce — no uncontrolled subcontracting.",
    points: ["UL / FM listed materials", "In-house certified crews", "Programme & QA control", "HSE-led site delivery"],
  },
];

export const SYSTEMS = [
  {
    key: "sprinkler",
    label: "Automatic Sprinklers",
    blurb: "Hydraulically balanced wet risers feeding every floor with instant, zone-isolated suppression.",
    metric: "12 floors · 1,840 heads",
  },
  {
    key: "alarm",
    label: "Fire Alarm & Detection",
    blurb: "Addressable loops with aspirating detection in critical rooms, annunciated at the fire command centre.",
    metric: "6 loops · 2,300 devices",
  },
  {
    key: "hydrant",
    label: "Hydrant & Riser Network",
    blurb: "Wet riser columns, landing valves and external ring main pressurised for brigade intervention.",
    metric: "4 risers · 9 bar",
  },
  {
    key: "pump",
    label: "Fire Pump Room",
    blurb: "UL listed diesel and electric duty pumps with jockey pressurisation and automatic transfer.",
    metric: "1500 GPM @ 10 bar",
  },
  {
    key: "pava",
    label: "PA / Voice Evacuation",
    blurb: "EN 54-16 phased evacuation with speech intelligibility verified in every occupied zone.",
    metric: "38 zones · STI 0.62",
  },
  {
    key: "suppression",
    label: "Clean Agent Suppression",
    blurb: "NOVEC 1230 protection for data halls and switch rooms with room integrity validation.",
    metric: "4 protected rooms",
  },
  {
    key: "emergency-light",
    label: "Emergency Lighting",
    blurb: "Self-testing luminaires holding compliant lux on every escape route for 90 minutes.",
    metric: "410 luminaires · 90 min",
  },
];

export const INDUSTRIES = [
  { name: "Commercial Buildings", img: IMG.skylineDay, count: "260+" },
  { name: "Industrial Plants", img: IMG.factorySunset, count: "140+" },
  { name: "Factories", img: IMG.steelPlant, count: "95+" },
  { name: "Oil & Gas", img: IMG.refinery, count: "48+" },
  { name: "Warehouses", img: IMG.containers, count: "120+" },
  { name: "Hospitals", img: IMG.monitors, count: "34+" },
  { name: "Hotels", img: IMG.waterfront, count: "52+" },
  { name: "Schools", img: IMG.mosqueCity, count: "63+" },
  { name: "Shopping Malls", img: IMG.skylineNight, count: "27+" },
  { name: "Residential", img: IMG.skylineFlag, count: "180+" },
  { name: "Government", img: IMG.plantTank, count: "41+" },
  { name: "Data Centres", img: IMG.controlRoom, count: "18+" },
];

export const WHY = [
  { title: "15+ Years Experience", body: "Operating in the UAE fire protection sector since 2011.", stat: 15, suffix: "+" },
  { title: "Civil Defence Compliance", body: "Approved contractor for design, installation and maintenance.", stat: 100, suffix: "%" },
  { title: "NFPA Standards", body: "Systems engineered to NFPA 13, 14, 20, 25, 72 and 2001.", stat: 6, suffix: " codes" },
  { title: "British Standards", body: "BS 5839, BS 9999 and EN 54 alignment across detection & VA.", stat: 3, suffix: " suites" },
  { title: "Certified Engineers", body: "Chartered and Civil Defence certified specialists in-house.", stat: 50, suffix: "+" },
  { title: "Fast Response", body: "Guaranteed 4-hour emergency attendance for AMC clients.", stat: 4, suffix: " hrs" },
  { title: "Quality Installation", body: "Own workforce, no uncontrolled subcontracting, ITP-driven QA.", stat: 0, suffix: " defects" },
  { title: "Latest Technology", body: "Addressable, aspirating, watermist and clean-agent platforms.", stat: 24, suffix: "/7" },
  { title: "AMC Support", body: "Planned preventive maintenance with digital reporting.", stat: 380, suffix: "+ sites" },
  { title: "Reliable Service", body: "On-time delivery across 1000+ completed projects.", stat: 98, suffix: "% OTD" },
  { title: "Customer Satisfaction", body: "Long-term partnerships built on transparency and trust.", stat: 96, suffix: "% CSAT" },
];

export type Project = {
  title: string;
  category: "Commercial" | "Industrial" | "Residential" | "Oil & Gas" | "Government";
  location: string;
  system: string;
  date: string;
  img: string;
  span?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Corniche Corporate Tower",
    category: "Commercial",
    location: "Abu Dhabi, UAE",
    system: "Sprinkler · Fire Alarm · PA/VA · Wet Riser",
    date: "Completed 2024",
    img: IMG.skylineDay,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Mussafah Process Plant",
    category: "Industrial",
    location: "Mussafah, Abu Dhabi",
    system: "Foam Deluge · Hydrant Ring · Fire Pumps",
    date: "Completed 2023",
    img: IMG.factorySunset,
  },
  {
    title: "ADNOC Support Facility",
    category: "Oil & Gas",
    location: "Ruwais, Al Dhafra",
    system: "Deluge · Flame Detection · CO₂ Suppression",
    date: "Completed 2023",
    img: IMG.refineryNight,
  },
  {
    title: "Al Reem Residences",
    category: "Residential",
    location: "Al Reem Island, Abu Dhabi",
    system: "Sprinkler · Addressable Alarm · Emergency Lighting",
    date: "Completed 2022",
    img: IMG.skylineNight,
    span: "md:col-span-2",
  },
  {
    title: "Federal Authority Complex",
    category: "Government",
    location: "Abu Dhabi, UAE",
    system: "Voice Evacuation · Detection · AMC",
    date: "Completed 2024",
    img: IMG.mosqueCity,
  },
  {
    title: "Khalifa Logistics Hub",
    category: "Industrial",
    location: "KIZAD, Abu Dhabi",
    system: "ESFR Sprinkler · Hydrant · Pump House",
    date: "Completed 2022",
    img: IMG.containers,
  },
  {
    title: "Marina Hospitality Tower",
    category: "Commercial",
    location: "Al Maryah, Abu Dhabi",
    system: "Watermist · Kitchen Suppression · PA/VA",
    date: "Completed 2021",
    img: IMG.waterfront,
  },
  {
    title: "TAQA Substation Upgrade",
    category: "Government",
    location: "Al Ain, UAE",
    system: "Clean Agent · VESDA · Fire Alarm Retrofit",
    date: "Completed 2024",
    img: IMG.pipeMeters,
  },
];

export const PROJECT_FILTERS = ["All", "Commercial", "Industrial", "Residential", "Oil & Gas", "Government"] as const;

export type Cert = {
  code: string;
  name: string;
  issuer: string;
  tone: "ember" | "ink" | "flame";
  no: string;
  scope: string;
  valid: string;
  /** Drop a scan in /public/certificates (e.g. "/certificates/iso9001.jpg") and set it here to show the real document in the popup. */
  image?: string;
};

export const CERTS: Cert[] = [
  {
    code: "ISO 9001:2015",
    name: "Quality Management System",
    issuer: "International Accredited",
    tone: "ember",
    no: "QMS-2024-1187",
    scope: "Design, supply, installation, testing, commissioning and maintenance of fire protection systems.",
    valid: "Valid through Dec 2027",
  },
  {
    code: "ISO 45001:2018",
    name: "Occupational Health & Safety",
    issuer: "International Accredited",
    tone: "ink",
    no: "OHS-2024-0742",
    scope: "Operational HSE management across all project sites and maintenance facilities.",
    valid: "Valid through Dec 2027",
  },
  {
    code: "Civil Defence",
    name: "Approved Fire Fighting Contractor",
    issuer: "UAE Ministry of Interior",
    tone: "flame",
    no: "CD-AD-55-0913",
    scope: "Approved for design, installation, testing, commissioning and maintenance of fire fighting systems.",
    valid: "Renewed annually",
  },
  {
    code: "ADDC Approval",
    name: "Registered Electrical & Fire Contractor",
    issuer: "Abu Dhabi Distribution Company",
    tone: "ember",
    no: "ADDC-V-2231",
    scope: "Registered contractor for works within ADDC service territory.",
    valid: "Valid through 2026",
  },
  {
    code: "FGB Registration",
    name: "First Gulf Bank — Approved Vendor",
    issuer: "First Gulf Bank PJSC",
    tone: "ink",
    no: "FGB-SUP-0481",
    scope: "Vendor registration for fire protection works across FGB branch and HQ facilities.",
    valid: "Active registration",
  },
  {
    code: "GASCO Approval",
    name: "Abu Dhabi Gas Industries — Approved",
    issuer: "GASCO Ltd.",
    tone: "flame",
    no: "GSC-HSE-1120",
    scope: "Approved for fire & safety works at GASCO plants and installations.",
    valid: "Active registration",
  },
  {
    code: "Al Hosn Gas",
    name: "Al Hosn Gas Registration",
    issuer: "Abu Dhabi Gas Development Co.",
    tone: "ink",
    no: "AHG-V-0097",
    scope: "Registered contractor for fire protection maintenance at Al Hosn Gas facilities.",
    valid: "Active registration",
  },
  {
    code: "TAQA Approval",
    name: "TAQA Approved Vendor",
    issuer: "Abu Dhabi National Energy",
    tone: "ember",
    no: "TQA-V-3356",
    scope: "Pre-qualified for fire detection and suppression works across TAQA assets.",
    valid: "Valid through 2026",
  },
  {
    code: "ICV Certificate",
    name: "In-Country Value Certification",
    issuer: "UAE Ministry of Industry",
    tone: "ink",
    no: "ICV-2023-7741",
    scope: "Certified contribution to the UAE's industrial and employment ecosystem.",
    valid: "Issued 2023",
  },
  {
    code: "Trade Licence",
    name: "Fire Fighting Systems Contracting",
    issuer: "Abu Dhabi DED",
    tone: "flame",
    no: "CN-2011-88412",
    scope: "Commercial licence for fire fighting systems contracting, Abu Dhabi.",
    valid: "Renewed annually",
  },
];

export const TEAM = [
  {
    name: "Ahmed Almarar",
    role: "Chief Executive Officer",
    group: "Leadership",
    img: px(37605831, 900),
    bio: "Sets the national growth strategy and safeguards Brounic's promise of uncompromised life safety.",
  },
  {
    name: "Farah Al Mubarak",
    role: "General Manager",
    group: "Leadership",
    img: px(11655430, 900),
    bio: "Leads operations, commercial delivery and client partnerships across every emirate.",
  },
];

/* Reporting line under the General Manager — mirrors the company profile org chart */
export const ORG_REPORTS = [
  { role: "Secretary", icon: "mail" },
  { role: "Engineering Manager", icon: "design" },
  { role: "Projects Head", icon: "install" },
];

/*
 * CLIENTS — drop each logo file into /public/clients (e.g. /clients/taqa.png)
 * and set the matching `logo` path. Until then a branded typographic
 * placeholder renders automatically.
 */
export type Client = { name: string; abbr: string; color: string; sub?: string; logo?: string };

export const CLIENTS: Client[] = [
  { name: "Abu Dhabi Civil Defence Authority", abbr: "CD", color: "#1A1E23" },
  { name: "Dept. of Municipalities & Transport", abbr: "DMT", color: "#8B1E2D" },
  { name: "KIZAD — Khalifa Industrial Zone", abbr: "KIZAD", color: "#C41F10" },
  { name: "TRANSCO", abbr: "TRANSCO", color: "#2E9E44", sub: "Transmission & Dispatch" },
  { name: "Musanada", abbr: "مساندة", color: "#7A1F2B", sub: "General Services" },
  { name: "TAQA", abbr: "TAQA", color: "#1B75BB", sub: "طاقة" },
  { name: "First Gulf Bank", abbr: "FGB", color: "#1B3A6B", sub: "بنك الخليج الأول" },
  { name: "Abu Dhabi Ports", abbr: "PORTS", color: "#123A63", sub: "موانئ أبوظبي" },
  { name: "Hassantuk", abbr: "حصنتك", color: "#2E9E44", sub: "Smart Protection" },
  { name: "GASCO", abbr: "GASCO", color: "#1B75BB", sub: "Gas Industries Ltd." },
  { name: "Al Dhafra Co-op Society", abbr: "ADCS", color: "#8A6D3B" },
  { name: "ADCO", abbr: "ADCO", color: "#1B75BB", sub: "Onshore Oil Operations" },
  { name: "Al Hosn Gas", abbr: "AL HOSN", color: "#1B75BB", sub: "الحصن للغاز" },
  { name: "SIBCA", abbr: "SIBCA", color: "#E8321F", sub: "سيبكا" },
  { name: "Saipem — Eni Group", abbr: "SAIPEM", color: "#1A1E23" },
  { name: "Samsung C&T", abbr: "SAMSUNG", color: "#1428A0", sub: "Engineering & Construction" },
  { name: "Concorde Technical Est.", abbr: "CONCORDE", color: "#C41F10" },
  { name: "Técnicas Reunidas", abbr: "TR", color: "#6B7280" },
  { name: "Masdar City", abbr: "MASDAR", color: "#0E9AA7" },
  { name: "Command of Military Works", abbr: "CMW", color: "#3E6B35", sub: "قيادة الأشغال العسكرية" },
];

export const PROCESS = [
  { step: "01", title: "Consultation", body: "We listen to your risk, occupancy and programme constraints before proposing anything." },
  { step: "02", title: "Site Survey", body: "Detailed physical and drawing survey capturing hazards, routes and existing infrastructure." },
  { step: "03", title: "Design", body: "Concept layouts, zoning strategy and equipment selection aligned to your build." },
  { step: "04", title: "Engineering", body: "Hydraulic, battery and photometric calculations plus BIM-coordinated shop drawings." },
  { step: "05", title: "Approval", body: "Authority submission and Civil Defence approval managed end-to-end by our team." },
  { step: "06", title: "Installation", body: "Certified in-house crews install to ITP checkpoints under HSE supervision." },
  { step: "07", title: "Testing", body: "Pressure, flow, loop and cause-and-effect testing documented in full." },
  { step: "08", title: "Commissioning", body: "Integrated systems testing, authority witnessing and operator training." },
  { step: "09", title: "Maintenance", body: "NFPA 25 based AMC with 24/7 emergency response and digital reporting." },
];

export const TESTIMONIALS = [
  {
    quote:
      "Brounic delivered our tower's complete fire protection package three weeks ahead of programme. Their Civil Defence approvals were flawless — not a single re-submission.",
    name: "Khalid Al Suwaidi",
    role: "Development Director",
    company: "Corniche Real Estate",
  },
  {
    quote:
      "Their engineering team understood our high-hazard classification better than anyone we tendered. The foam deluge design was accepted first time by our insurer.",
    name: "Peter Lindqvist",
    role: "HSE Manager",
    company: "Gulf Petrochemical",
  },
  {
    quote:
      "We moved 380 assets onto their AMC programme. Response times have been under four hours every single time — including a 2am panel fault.",
    name: "Sara Mahmoud",
    role: "Head of Facilities",
    company: "Capital Malls Group",
  },
  {
    quote:
      "The clean agent installation in our data halls was executed without a minute of downtime. Meticulous planning and genuinely professional technicians.",
    name: "Rohit Menon",
    role: "Critical Infrastructure Lead",
    company: "Node Data Centres",
  },
];

export const PARTNERS = [
  "HONEYWELL",
  "SIEMENS",
  "NOTIFIER",
  "TYCO",
  "VIKING",
  "BOSCH",
  "JOHNSON CONTROLS",
  "APOLLO",
  "VICTAULIC",
  "NAFFCO",
  "GRUNDFOS",
  "3M NOVEC",
];

export const CONTACT = {
  address: "Industrial Area, Al Dhafra Region, Abu Dhabi, United Arab Emirates",
  phone: "+971 50 269 11291",
  phoneHref: "tel:+9715081043989",
  emergency: "+971 50 810 43989",
  emergencyHref: "tel:+9715081043987",
  whatsappHref: "https://wa.me/9715081043989",
  email: "info@brounic.com",
  hours: "Sun – Thu · 8:00 AM – 6:00 PM  |  Emergency desk 24/7",
  mapSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=54.4650%2C24.3400%2C54.5450%2C24.3950&layer=mapnik&marker=24.3675%2C54.5050",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Mussafah+Industrial+Area+Abu+Dhabi",
};

