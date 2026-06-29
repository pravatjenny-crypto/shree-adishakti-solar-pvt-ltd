import { Product, BrandDetails } from "./types";
// @ts-ignore
import waareeImg from "./assets/images/waaree_solar_panel_1782717245904.jpg";
// @ts-ignore
import adaniImg from "./assets/images/adani_solar_panel_1782717261164.jpg";
// @ts-ignore
import polycabImg from "./assets/images/polycab_solar_wire_1782717274848.jpg";
// @ts-ignore
import luminousImg from "./assets/images/luminous_nexg_perfect_1782720227433.jpg";
// @ts-ignore
import exideImg from "./assets/images/exide_lfp_perfect_1782720248668.jpg";
// @ts-ignore
import projectRamakrushna from "./assets/images/project_ramakrushna_mohanty_1782718326772.jpg";
// @ts-ignore
import projectElevated from "./assets/images/project_elevated_structure_1782718347705.jpg";
// @ts-ignore
import projectInstallation from "./assets/images/project_active_installation_1782718371690.jpg";
// @ts-ignore
import projectKonark from "./assets/images/project_konark_site_1782720164855.jpg";
// @ts-ignore
import projectIndustrial from "./assets/images/project_industrial_jajpur_1782720302987.jpg";
// @ts-ignore
import projectCommercial from "./assets/images/project_commercial_cuttack_1782720321217.jpg";

export const BRANDS: Record<string, BrandDetails> = {
  "Tata Power Solar": {
    name: "Tata Power Solar",
    logoText: "TATA",
    history: "India's veteran pioneer with over 34+ years of robust operational heritage. Tata represents top-tier engineering resilience and solid grid-grade durability across Odisha's coastal climate.",
    productCategories: ["Mono-PERC Panels", "On-Grid Inverters", "Micro-grids"],
    warranty: "25-Year Linear Performance Warranty, 10-Year Product Warranty",
    videoTitle: "Tata Power Solar: Trust of a Century",
    videoDesc: "Witness high-efficiency manufacturing in action, utilizing automated micro-gap sorting."
  },
  "Waaree": {
    name: "Waaree Energies",
    logoText: "WAAREE",
    history: "India's largest solar module manufacturer with over 12 GW of capacity. Pioneers of ultra-modern glass-to-glass Bifacial panels which absorb light from both sides, capturing reflected light from concrete roofs.",
    productCategories: ["Bifacial Solar Panels", "Smart Hybrid Inverters", "Frameless Modules"],
    warranty: "27-Year Linear Performance Warranty, 12-Year Product Warranty",
    videoTitle: "Waaree Bifacial Era",
    videoDesc: "Learn how the premium glass-on-glass layout adds 15% extra energy yields on hot summer days."
  },
  "Adani Solar": {
    name: "Adani Solar",
    logoText: "ADANI",
    history: "The undisputed leader in super-efficient multi-busbar solar cell technologies. Engineered specifically to produce highest power outputs even in diffuse, cloudy, or dusty morning environments.",
    productCategories: ["TOPCon High-Efficiency Modules", "Utility-Scale Structures"],
    warranty: "25-Year Performance Warranty, 12-Year Workmanship Warranty",
    videoTitle: "Adani Solar TOPCon Innovation",
    videoDesc: "The ultimate breakthrough in tunnel oxide passivated contact cell engineering for high-density power."
  },
  "Luminous": {
    name: "Luminous",
    logoText: "LUMINOUS",
    history: "The household brand trusted by millions of families for smart power backup. Luminous pure-sine wave intelligent inverters integrate seamlessly with high-rate solar charging loops.",
    productCategories: ["On-Grid Inverters", "Hybrid Inverters", "EcoWatt Series"],
    warranty: "5-Year Inverter Warranty, 3-Year Battery Warranty",
    videoTitle: "Luminous NexG Intelligent Hybrid",
    videoDesc: "Dynamic load tracking technology that prioritizes clean solar energy over standard grids."
  },
  "Eastman": {
    name: "Eastman Solar",
    logoText: "EASTMAN",
    history: "Global heavy-weights in deep-cycle energy storage solutions. Eastman specializes in highly durable carbon-nanotube tubular batteries that withstand regular heavy power cuts.",
    productCategories: ["Carbon-Nanotube Tubular Batteries", "Solar Chargers"],
    warranty: "5-Year Replacement Warranty on Carbon Series",
    videoTitle: "Eastman Carbon-Tubular Technology",
    videoDesc: "Explaining how special tubular grids prevent active material shedding under rapid temperature shifts."
  },
  "Exide": {
    name: "Exide Solar",
    logoText: "EXIDE",
    history: "India's most loved battery giant. Exide Tubular and Lithium-Ferro-Phosphate (LFP) storage cells offer super-fast charging times and maximum cycles for uninterrupted household backup.",
    productCategories: ["Lithium LFP Battery Packs", "C10 Tubular Batteries"],
    warranty: "5-Year Pro-rata Battery Warranty",
    videoTitle: "Exide Solatubular C10 Power",
    videoDesc: "Robust and low-maintenance tubular cells designed for high temperature and deep cycle endurance."
  }
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    category: "Solar Panels",
    name: "Waaree Elite 540W & 550W Mono PERC Bifacial Plate",
    brand: "Waaree",
    tagline: "Double-Sided Power Generation Advantage (WSM-550 Series)",
    description: "The pinnacle of engineering excellence. These premium double-glass Monocrystalline Bifacial Plates are designed for extreme durability in coastal environments, absorbing direct sunlight on the front and reflected light on the back. Delivers up to 15% to 22% additional energy yield, making it the perfect choice for elevated concrete rooftops.",
    warranty: "25-Year Linear Performance Warranty, 12-Year Product Warranty",
    features: [
      "Bifaciality Factor of 70% ± 5% (high back-side harvest)",
      "Anodized aluminum alloy robust frame for cyclone-grade wind loads",
      "3.2mm high-transmission tempered AR coated glass surface",
      "IP68 Rated Junction Box with 3 bypass diodes and MC4 compatible connectors",
      "Excellent performance under early morning, late evening, and cloudy hours"
    ],
    specs: {
      "Maximum Power (Pmax)": "540W / 550W",
      "Open Circuit Voltage (Voc)": "49.50V / 49.80V",
      "Short Circuit Current (Isc)": "13.85A / 14.01A",
      "Voltage at Pmax (Vmp)": "41.65V / 41.95V",
      "Current at Pmax (Imp)": "12.97A / 13.12A",
      "Module Efficiency": "20.9% / 21.3% (Up to 21.5% for Elite series)",
      "Dimensions": "2279 x 1134 x 35 mm",
      "Weight": "28.5 kg (Approx)",
      "Frame & Glass": "Anodized Aluminum Alloy, 3.2mm Tempered Glass",
      "Reflected Power Gain": "Up to 121W extra under optimal albedo"
    },
    image: waareeImg
  },
  {
    id: "p2",
    category: "Solar Panels",
    name: "Adani AS590-M10 Next-Gen TOPCon Plate",
    brand: "Adani Solar",
    tagline: "The 575W & 590W Powerhouse with 22.8% Max Efficiency",
    description: "Ultra-efficiency N-Type TOPCon Plates designed with tunnel oxide passivated contact cell technology to minimize recombination losses and maximize conversion efficiency. It yields superior energy generation in extreme humid coastal climates and has a very low degradation rate.",
    warranty: "30 Years Performance, 15 Years Product Warranty",
    features: [
      "Next-Gen Mono PERC TOPCon technology with AS590-M10 series",
      "Zero LID (Light Induced Degradation) and low PID performance",
      "Excellent Temperature Coefficient optimized for high summer yields in Odisha",
      "Only 1% degradation in Year 1, and 0.4% maximum annual degradation",
      "Superior mechanical loading capability for high wind speeds"
    ],
    specs: {
      "Maximum Power (Pmax)": "575W / 590W",
      "Module Efficiency": "22.2% (575W) / 22.8% (590W)",
      "Open Circuit Voltage (Voc)": "50.8V (575W) / 51.5V (590W)",
      "Short Circuit Current (Isc)": "14.35A (575W) / 14.48A (590W)",
      "Voltage at Pmax (Vmp)": "42.4V (575W) / 43.1V (590W)",
      "Current at Pmax (Imp)": "13.56A (575W) / 13.69A (590W)",
      "Cell Type": "N-Type Mono PERC TOPCon Modules",
      "Degradation (Year 30)": "87.4% performance remaining"
    },
    image: adaniImg
  },
  {
    id: "p6",
    category: "Ecosystem",
    name: "Polycab Solarcab Dual-Insulated DC Cable (Polycab Wire)",
    brand: "Polycab",
    tagline: "Tinned Copper Cross-Linked Polyethylene Insulation (XLPO) - Solarcab Catalog Page 12",
    description: "Specially designed heavy-duty dual-insulated DC power wires manufactured by Polycab. Engineered with E-Beam Cross Linked XLPO compounds to handle up to 1500V DC under harsh rooftop conditions. Highly resistant to UV rays, ozone, moisture, and thermal breakdown for a 25-year lifespan.",
    warranty: "25+ Years Life Expectancy",
    features: [
      "Class 5 flexible tinned copper conductor prevents oxidation and moisture corrosion",
      "Electron-beam cross-linked compound (XLPO) dual insulation layers",
      "UV, Ozone, and weather resistant for direct exposure to solar radiation",
      "Bending radius of 4 x Outer Diameter for easy installation",
      "Acid, alkali, and oil resistant to prevent rooftop environmental degradation",
      "Standards Complied: TUV, CE, IS 17048, EN 50618"
    ],
    specs: {
      "Cross Sections Available": "4.0 sq.mm / 6.0 sq.mm / 10.0 sq.mm",
      "Voltage Rating": "1500V DC / 1000V AC",
      "Current Capacity (4.0 sq.mm)": "55A in open air",
      "Current Capacity (6.0 sq.mm)": "70A in open air",
      "Current Capacity (10.0 sq.mm)": "98A in open air",
      "Temperature Range": "-40°C to +120°C Max Conductor Temp",
      "Bending Radius": "4 x Outer Diameter",
      "Color Options": "Red / Black for safe polarity identification",
      "Catalog Page Reference": "Solarcab Catalog Series, Page 12"
    },
    image: polycabImg
  },
  {
    id: "p3",
    category: "Inverters",
    name: "Luminous NexG 3kVA Hybrid",
    brand: "Luminous",
    tagline: "Intelligent Multi-Source Power Router",
    description: "A highly intelligent solar inverter featuring an in-built MPPT charge controller. It dynamically switches between solar, batteries, and the utility grid to ensure you never run out of electricity and never pay a rupee more than necessary.",
    warranty: "5 Years Product",
    features: [
      "In-built ultra-fast MPPT charge controller",
      "Pure sine wave output safe for high-end laptops and TVs",
      "Mobile App Bluetooth/Wi-Fi remote monitoring",
      "Priority loading configuration (Solar -> Battery -> Grid)"
    ],
    specs: {
      "Inverter Rating": "3000 VA / 2400 Watts",
      "Max PV input": "3200 Watts",
      "MPPT Voltage Range": "65V - 130V",
      "Efficiency": "97.2%"
    },
    image: luminousImg
  },
  {
    id: "p4",
    category: "Batteries",
    name: "Exide LFP 100Ah Lithium",
    brand: "Exide",
    tagline: "Ultra-Fast Charging Next-Gen Storage",
    description: "Premium Lithium Iron Phosphate (LiFePO4) storage solution offering 10x longer cycle life than traditional lead-acid batteries. Charges to 100% in under 2 hours, making it perfect for rapid back-to-back load shedding.",
    warranty: "5 Years Replacement",
    features: [
      "6000+ deep discharge life cycles at 80% DoD",
      "Extremely light-weight and space-saving wall-mount layout",
      "In-built smart Battery Management System (BMS)",
      "Zero maintenance required over lifetime"
    ],
    specs: {
      "Battery Chemistry": "LiFePO4 (Lithium Iron Phosphate)",
      "Nominal Voltage": "48 V",
      "Capacity": "100 Ah (4.8 kWh storage)",
      "Max Charge Current": "50 A"
    },
    image: exideImg
  },
  {
    id: "p5",
    category: "Ecosystem",
    name: "Adishakti Smart ACDB/DCDB",
    brand: "Shree Adishakti Solar",
    tagline: "Ultimate Electrical System Protection",
    description: "Custom-assembled high-safety electrical distribution box housing professional Surge Protection Devices (SPDs), DC fuses, and high-rating AC circuit breakers to shield panels and inverter from lightning strikes.",
    warranty: "3 Years Product",
    features: [
      "Class II heavy-duty Surge Protection Devices (SPD)",
      "IP65 rated water-proof dust-proof wall enclosure",
      "Pre-wired with high-grade multi-strand copper cables",
      "Quick dual-disconnect physical manual switch"
    ],
    specs: {
      "Enclosure Rating": "IP65 Weatherproof",
      "Max Voltage": "1000V DC / 415V AC",
      "Protection Type": "Surge, Overcurrent, Short-circuit"
    },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80"
  }
];

export const FAQS = [
  {
    q: "How does the PM Surya Ghar Muft Bijli Yojana subsidy system work in Odisha?",
    a: "The subsidy is incredibly straightforward and directly credited to your bank account post-installation. Residential systems get ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum flat subsidy of ₹78,000 for any system of 3 kW or larger. Shree Adishakti Solar Pvt. Ltd. handles 100% of the online registration, technical feasibility checks, discom approvals, and joint physical surveys so you don't have to fill out complex government portals."
  },
  {
    q: "What is Net Metering and how does it make my electric bill zero?",
    a: "Net Metering is a bidirectional billing system. When your solar panels generate more electricity than your home consumes (e.g., at noon), the excess power flows backward into the government grid, causing your physical meter to spin backward! At night, you pull power from the grid. At the end of the month, your bill is calculated as: Net Units = (Units Consumed - Units Exported). If you generate more than you consume, your bill becomes zero, and outstanding units roll over to next month's credit!"
  },
  {
    q: "What is the difference between On-grid, Hybrid, and Off-grid solar systems?",
    a: "- ON-GRID: Connected directly to the government line with net-metering. Best for maximum savings. It turns off during grid power cuts for worker safety.\n- HYBRID: Connected to the grid AND a battery pack. You get net metering AND continuous battery power backup during outages.\n- OFF-GRID: Powered entirely by panels and batteries with zero grid connection. Excellent for remote areas, farms, or water pumps."
  },
  {
    q: "How much space does a 3 kW solar system require on my roof?",
    a: "A 3 kW solar system typically requires about 6 to 8 premium solar panels (depending on panel wattage). This translates to approximately 250 to 300 square feet of clear, shadow-free roof area. Our structural engineers design custom high-rise or elevated galvanized iron mounting racks to ensure you can still utilize your roof space below the panels!"
  },
  {
    q: "Do solar panels require heavy maintenance?",
    a: "Not at all. Solar panels have no moving parts and require minimal care. All that is required is cleaning them with water once every 10 to 15 days to remove dust and bird droppings. Our systems are equipped with premium anti-soiling, self-cleaning glass surfaces that rinse off easily with morning rain."
  },
  {
    q: "How long does the entire site assessment and installation process take?",
    a: "The physical setup of the system takes only 2 to 3 days! However, the complete process—including the digital site survey, layout engineering, government net-metering application, grid testing, meter commissioning, and final subsidy release—takes around 15 to 25 days. You can monitor every step of this journey live in our Customer Portal!"
  }
];

export const PROJECT_GALLERY = [
  {
    title: "3.3 kW On-Grid Rooftop Solar Project",
    category: "Residential",
    location: "Ranihatsahi, Konark, Odisha",
    image: projectKonark,
    desc: "High-performance residential solar array under the PM Surya Ghar Yojana. Engineered with hot-dip galvanized gantry structures to ensure high cyclone resilience and optimal power gen near coastal Konark.",
    clientName: "Pravat Kumar Jena",
    gps: "Latitude: 19.890094, Longitude: 86.092127",
    date: "26-05-2026",
    capacity: "3.3 kW On-Grid System",
    rating: 5,
    feedback: "Shree Adishakti Solar installed a premium 3.3 kW system on my roof in Konark. The structure is extremely sturdy, and the net metering approval went super fast. Already seeing massive electricity bill savings!"
  },
  {
    title: "3 kW Elevated Bifacial Residential Project",
    category: "Residential",
    location: "Basuaghai, Tankapani Road, Bhubaneswar",
    image: projectRamakrushna,
    desc: "Premium glass-on-glass Bifacial panels mounted on a custom 9-foot elevated hot-dip galvanized structure. Keeps the concrete rooftop fully usable for leisure and washing.",
    clientName: "Ramakrushna Mohanty",
    gps: "Latitude: 20.241682, Longitude: 85.838213",
    date: "25-05-2026",
    capacity: "3 kW On-Grid System",
    rating: 5,
    feedback: "Shree Adishakti Solar built an incredibly robust elevated structure on my roof. Their coordination for my PM Surya Ghar subsidy was seamless. My electricity bill has dropped from ₹4,500/month to zero! Highly satisfied with their professionalism."
  },
  {
    title: "5 kW Premium High-Rise Gantry Setup",
    category: "Residential",
    location: "Khordha, Odisha",
    image: projectElevated,
    desc: "High-clearance gantry-style structural mounting to bypass surrounding tree shades. Powered by Adani AS590-M10 Mono PERC TOPCon plates.",
    clientName: "Abhimanyu Pradhan",
    gps: "Latitude: 19.680099, Longitude: 85.476779",
    date: "11-06-2026",
    capacity: "5 kW Hybrid System",
    rating: 5,
    feedback: "The engineering speed and safety compliance were outstanding. The double-glass panels are producing up to 24 units a day even during humid, cloudy monsoon hours! Excellent post-installation service."
  },
  {
    title: "3.3 kW Active Rooftop Structural Mounting",
    category: "Under Construction",
    location: "Patia, Near KIIT College, Bhubaneswar",
    image: projectInstallation,
    desc: "Active structural assembly. Columns are anchored with heavy-duty chemical grout directly into columns to ensure absolute safety against cyclone wind speeds.",
    clientName: "Debashish Tripathy",
    gps: "Latitude: 20.352410, Longitude: 85.819033",
    date: "Active Phase (2026)",
    capacity: "3.3 kW On-Grid",
    rating: 5,
    feedback: "I am extremely impressed by the structural integrity and CAD design. They calculated optimal geographical shadow-casting before doing any physical drills."
  },
  {
    title: "50 kW Industrial Solar Plant",
    category: "Industrial",
    location: "Kalinga Nagar, Jajpur",
    image: projectIndustrial,
    desc: "Seamless metal-roof installation using self-drilling structures to support zero electricity costs for high-load manufacturing lines.",
    clientName: "Utkal Met-Fab Industries",
    gps: "Latitude: 20.954200, Longitude: 86.128410",
    date: "14-02-2026",
    capacity: "50 kW Commercial Grid",
    rating: 5,
    feedback: "A massive help in cutting down our factory's operational expenses. The payback period is calculated at just 3.2 years with direct tax depreciation advantages."
  },
  {
    title: "15 kW Commercial Rooftop Setup",
    category: "Commercial",
    location: "Cuttack Link Road, Cuttack",
    image: projectCommercial,
    desc: "High-efficiency installation supplying daytime air-conditioning loads for a multi-specialty diagnostic laboratory.",
    clientName: "Metro Diagnostics Laboratory",
    gps: "Latitude: 20.462500, Longitude: 85.882100",
    date: "29-03-2026",
    capacity: "15 kW On-Grid System",
    rating: 5,
    feedback: "Maintaining constant climate control is highly power-intensive. Adishakti's solution has reduced our daytime energy expenses by 82%."
  }
];
