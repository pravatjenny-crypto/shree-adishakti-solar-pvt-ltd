import React, { useState, useEffect, useRef } from "react";
import { 
  Sun, 
  Battery, 
  Zap, 
  Shield, 
  Sparkles, 
  Star, 
  User, 
  FileText, 
  Activity, 
  MessageSquare, 
  Send, 
  X, 
  Menu, 
  Phone, 
  FileDown, 
  CheckCircle, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  Building, 
  Settings, 
  Database,
  Sliders,
  Award,
  Upload,
  RefreshCw,
  Search,
  Check,
  Percent,
  Plus,
  Calendar,
  Clock,
  Wrench,
  Mail,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine, 
  Cell 
} from "recharts";
import { BRANDS, PRODUCTS, FAQS, PROJECT_GALLERY } from "./data";
import { Lead, Survey, ChatMessage } from "./types";
import Logo from "./components/Logo";

const EXECUTION_STEPS = [
  {
    num: "01",
    title: "Site Survey & Assessment",
    days: "Day 1-2",
    icon: Search,
    desc: "Rigorous physical and structural inspection of your property to ensure safety and maximum solar capture.",
    details: [
      "Rooftop structural load-bearing capacity assessment",
      "Laser measurement of area and roof pitch/angle",
      "3D solar shadow-casting analysis for adjacent structures",
      "Existing electrical load & panel evaluation",
      "DISCOM feasibility check & net metering clearance prep"
    ]
  },
  {
    num: "02",
    title: "System Design & Engineering",
    days: "Day 2-4",
    icon: Sliders,
    desc: "Custom CAD modeling of your building structure to plot the absolute optimal orientation for Odisha's coordinates.",
    details: [
      "Custom Single Line Diagram (SLD) preparation",
      "3D structural mechanical CAD drawings",
      "Rooftop panel layout optimization",
      "Finalized technical Bill of Materials (BOM) specification"
    ]
  },
  {
    num: "03",
    title: "Material Procurement",
    days: "Day 4-12",
    icon: Building,
    desc: "Sourcing premium Tier-1 materials from our verified vendor network under strict quality checkpoints.",
    details: [
      "Tier-1 high-rate Mono-PERC / Bifacial Solar Modules",
      "Sourcing smart, high-efficiency grid-tied or hybrid inverters",
      "Procuring hot-dip galvanized structural steel sections",
      "Ordering UV-resistant DC/AC solar grade cables",
      "Securing dual surge protection devices and distribution boxes"
    ]
  },
  {
    num: "04",
    title: "Civil & Structural Work",
    days: "Day 12-14",
    icon: Wrench,
    desc: "Laying the structural foundation. We install super-sturdy structures engineered to withstand 200+ km/h cyclone winds.",
    details: [
      "Precise chemical anchoring into existing concrete building columns",
      "Hot-dip galvanized (HDG) structural members assembly",
      "Dual copper earthing pits digging and salt-charcoal backfill",
      "Lightning arrester pole installation and down-conductor routing",
      "Rooftop cable duct routing path layout"
    ]
  },
  {
    num: "05",
    title: "Solar Panel Installation",
    days: "Day 14-16",
    icon: Sun,
    desc: "Physically mounting and securing the solar array, followed by weather-proof string wiring.",
    details: [
      "Erection of heavy-duty wind-resilient structures and base plates",
      "Mounting structure tilt adjustment & rigid double-locking",
      "Precise panel alignment, fixing, and heavy-duty steel clamping",
      "DC cable routing and string arrangement for low line losses",
      "Waterproof MC4 connector crimping and wire styling"
    ]
  },
  {
    num: "06",
    title: "Electrical Work & Wiring",
    days: "Day 16-18",
    icon: Zap,
    desc: "Installing the smart inverter and implementing double-surge isolation boards.",
    details: [
      "Inverter wall-mounting with optimal air-circulation spacing",
      "DCDB and ACDB distribution panels assembly",
      "Wiring surge protection devices (SPDs) and MCBs",
      "Secure earthing bonding from structures to ground pits",
      "Grid integration wiring and heavy-duty AC conduit routing"
    ]
  },
  {
    num: "07",
    title: "Testing & Commissioning",
    days: "Day 18-20",
    icon: RefreshCw,
    desc: "Detailed multi-point safety testing of the entire electrical circuit before system boot.",
    details: [
      "Open Circuit Voltage (OCV) test across all solar strings",
      "Insulation resistance testing to avoid residual leakage",
      "Polarity verification and grounding continuous checks",
      "Smart inverter parameter setup and initial power bootup",
      "Generation performance validation under live solar loads"
    ]
  },
  {
    num: "08",
    title: "Net Metering Application",
    days: "Day 20-25",
    icon: Calendar,
    desc: "DISCOM coordination to replace your standard utility meter with a dynamic bidirectional net-meter.",
    details: [
      "Filing official DISCOM solar commissioning documents",
      "Coordinating government inspect visit for safety sign-off",
      "Procurement of approved bidirectional net-meters",
      "Standard energy meter physical swap to Net-Meter",
      "Official solar-to-grid power export clearance activation"
    ]
  },
  {
    num: "09",
    title: "PM Surya Ghar Registration",
    days: "Day 22-28",
    icon: FileText,
    desc: "Uploading documents on the National Portal to secure your flat government subsidy of up to ₹78,000.",
    details: [
      "National PM Surya Ghar portal registration and profile sync",
      "Uploading on-site verified plant photographs with GPS stamps",
      "Submitting electrical inspection report and net-meter bills",
      "Processing claim application form on behalf of the consumer",
      "Tracking and securing prompt direct-to-bank subsidy release"
    ]
  },
  {
    num: "10",
    title: "Handover & Customer Training",
    days: "Day 28-30",
    icon: Award,
    desc: "Final plant handoff. We set up your mobile monitoring app so you can watch your real-time savings grow.",
    details: [
      "Full hands-on physical plant handover and inspection",
      "Installing and setting up the mobile solar monitoring application",
      "Providing physical copies of all warranty certificates",
      "Signing of 5-year comprehensive Annual Maintenance Contract",
      "Rooftop clean-up and celebratory solar power turn-on!"
    ]
  }
];

export default function App() {
  // Theme and UI Tabs
  const [activeTab, setActiveTab] = useState<"home" | "solutions" | "calculator" | "brands" | "portal" | "admin" | "gallery">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Journey and Warranty Tabs
  const [journeyTab, setJourneyTab] = useState<"timeline" | "warranty">("timeline");
  const [selectedTimelineStep, setSelectedTimelineStep] = useState<number>(0);
  
  // Interactive Project State
  const [localProjects, setLocalProjects] = useState(PROJECT_GALLERY);
  
  // Completed Projects & Feedback Form States
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewCapacity, setNewReviewCapacity] = useState("3 kW System");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewFeedback, setNewReviewFeedback] = useState("");
  const [newReviewImage, setNewReviewImage] = useState<string | null>(null);
  const [newReviewCategory, setNewReviewCategory] = useState("Residential");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formErrorMsg, setFormErrorMsg] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrorMsg("File size must be less than 5MB");
        return;
      }
      setFormErrorMsg("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewLocation.trim() || !newReviewFeedback.trim()) {
      setFormErrorMsg("Please fill in all fields (Name, Location, and Review/Feedback).");
      return;
    }
    
    // Auto generate realistic GPS in Odisha coordinates range
    const lat = (19.8 + Math.random() * 0.6).toFixed(6);
    const lon = (85.3 + Math.random() * 0.6).toFixed(6);
    
    const newProject = {
      title: `${newReviewCapacity} Elevated ${newReviewCategory} Installation`,
      category: newReviewCategory,
      location: newReviewLocation,
      image: newReviewImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      desc: `High-durability solar array completed under PM Surya Ghar Yojana. Featuring heavy-duty wind-resilient structures and premium net metering integration.`,
      clientName: newReviewName,
      gps: `Latitude: ${lat}, Longitude: ${lon}`,
      date: new Date().toLocaleDateString('en-GB'),
      capacity: newReviewCapacity,
      rating: newReviewRating,
      feedback: newReviewFeedback
    };

    setLocalProjects([newProject, ...localProjects]);
    setFormStatus("success");
    setFormErrorMsg("");
    
    // Reset Form fields
    setNewReviewName("");
    setNewReviewLocation("");
    setNewReviewFeedback("");
    setNewReviewImage(null);
    setNewReviewRating(5);
    setNewReviewCategory("Residential");
    setNewReviewCapacity("3 kW System");
    
    setTimeout(() => {
      setFormStatus("idle");
    }, 5000);
  };
  
  // Interactive Energy Flow Animation Scene States
  const [selectedPanelId, setSelectedPanelId] = useState<string>("p1");
  const [sunIntensity, setSunIntensity] = useState<number>(85);
  const [diagramSystemType, setDiagramSystemType] = useState<"On-Grid" | "Off-Grid" | "Hybrid">("On-Grid");

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      content: "Hello! I am your Shree Adishakti Solar AI Assistant. Feel free to ask me anything about solar systems, government subsidies, PM Surya Ghar Yojana, or brand warranties!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Customer Portal login & tracking
  const [portalEmail, setPortalEmail] = useState("");
  const [portalPhone, setPortalPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSurveys, setUserSurveys] = useState<Survey[]>([]);
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);

  // Admin Panel states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [leadsList, setLeadsList] = useState<Lead[]>([]);
  const [surveysList, setSurveysList] = useState<Survey[]>([]);
  const [editingSurveyId, setEditingSurveyId] = useState<string | null>(null);
  const [editingSurveyStep, setEditingSurveyStep] = useState<number>(1);
  const [pricingMultiplier, setPricingMultiplier] = useState(1.0); // Manage price variables

  // Calculator inputs
  const [monthlyBill, setMonthlyBill] = useState(3500);
  const [monthlyUnits, setMonthlyUnits] = useState(420);
  const [roofArea, setRoofArea] = useState(400);
  const [roofType, setRoofType] = useState("RCC Flat Roof");
  const [city, setCity] = useState("Bhubaneswar");
  const [electricityBoard, setElectricityBoard] = useState("TPCODL");
  const [solarType, setSolarType] = useState<"On Grid" | "Hybrid" | "Off Grid">("On Grid");
  const [selectedBrand, setSelectedBrand] = useState("Waaree");
  const [batteryRequired, setBatteryRequired] = useState(false);
  const [backupHours, setBackupHours] = useState(4);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [surveyBooked, setSurveyBooked] = useState(false);
  const [surveyEmailStatus, setSurveyEmailStatus] = useState<{ sent: boolean; error: string | null } | null>(null);

  // Calculator outputs calculation
  const getCalcResults = () => {
    // 1 kW solar generates ~120 units per month in Odisha
    const recommendedCapacity = Number((Math.max(1, monthlyUnits / 120)).toFixed(1));
    const numPanels = Math.ceil((recommendedCapacity * 1000) / 550); // Assuming 550W panels
    const requiredArea = numPanels * 32; // ~32 sqft per panel with safety clearances
    
    let batterySize = 0;
    if (batteryRequired || solarType !== "On Grid") {
      // rough sizing: 150Ah 12V battery is 1.8kWh. Let's recommend Ah size at 48V
      batterySize = Math.ceil((recommendedCapacity * backupHours * 1000) / (48 * 0.8));
    }

    // Brand Wise Price Table (from User Document image)
    const BRAND_PRICES: Record<string, { "2kW": number; "3kW": number; "5kW": number }> = {
      "Waaree": { "2kW": 151999, "3kW": 210999, "5kW": 335000 },
      "Tata Power Solar": { "2kW": 175000, "3kW": 225000, "5kW": 355000 },
      "Adani Solar": { "2kW": 151999, "3kW": 210999, "5kW": 335000 },
      "Luminous": { "2kW": 150000, "3kW": 199999, "5kW": 313000 },
      "Eastman Solar": { "2kW": 145000, "3kW": 185000, "5kW": 315000 },
      "UTL": { "2kW": 150000, "3kW": 189000, "5kW": 313000 }
    };

    const brandData = BRAND_PRICES[selectedBrand] || BRAND_PRICES["Waaree"];
    const cap = recommendedCapacity;
    let baseBrandPrice = 0;

    // Linear interpolation & extrapolation matching the brand pricing table
    if (cap <= 2) {
      baseBrandPrice = brandData["2kW"] * (cap / 2);
    } else if (cap < 3) {
      const p2 = brandData["2kW"];
      const p3 = brandData["3kW"];
      const ratio = cap - 2;
      baseBrandPrice = p2 + (p3 - p2) * ratio;
    } else if (cap < 5) {
      const p3 = brandData["3kW"];
      const p5 = brandData["5kW"];
      const ratio = (cap - 3) / 2;
      baseBrandPrice = p3 + (p5 - p3) * ratio;
    } else {
      baseBrandPrice = brandData["5kW"] * (cap / 5);
    }

    // Adjust price by multiplying the base with global pricingMultiplier
    let estimatedInvestment = baseBrandPrice * pricingMultiplier;

    if (solarType === "Hybrid") estimatedInvestment += 15000 * cap;
    if (solarType === "Off Grid") estimatedInvestment += 18000 * cap;

    if (batteryRequired && batterySize > 0) {
      estimatedInvestment += (batterySize / 100) * 16000; // Add battery costs
    }

    // Subsidy under PM Surya Ghar Muft Bijli Yojana (Updated Domestic Rules)
    let subsidy = 0;
    let subsidyCentral = 0;
    let subsidyState = 0;

    if (solarType === "On Grid" || solarType === "Hybrid") {
      if (cap >= 3) {
        subsidyCentral = 78000;
        subsidyState = 60000;
      } else if (cap >= 2) {
        subsidyCentral = 60000;
        subsidyState = 50000;
      } else if (cap >= 1) {
        // Proportional for 1kW
        subsidyCentral = Math.round(30000 * cap);
        subsidyState = Math.round(25000 * cap);
      } else {
        subsidyCentral = Math.round(30000 * cap);
        subsidyState = Math.round(25000 * cap);
      }
      subsidy = subsidyCentral + subsidyState;
    }

    const netCost = Math.max(25000, estimatedInvestment - subsidy);
    const monthlySavings = Math.min(monthlyBill, monthlyUnits * 8.2); // ₹8.2/unit average slab
    const annualSavings = monthlySavings * 12;
    const savings25Years = annualSavings * 25 * 1.15; // 15% cumulative power cost inflation
    const roiYears = Number((netCost / annualSavings).toFixed(1));
    const co2Saved = Number((recommendedCapacity * 1.18 * 25).toFixed(1)); // 1.18 tons CO2 per kW/year
    const treesSaved = Math.round(recommendedCapacity * 18 * 25);

    return {
      recommendedCapacity,
      numPanels,
      requiredArea,
      batterySize,
      estimatedInvestment: Math.round(estimatedInvestment),
      subsidy,
      subsidyCentral,
      subsidyState,
      netCost: Math.round(netCost),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      savings25Years: Math.round(savings25Years),
      roiYears,
      co2Saved,
      treesSaved
    };
  };

  const results = getCalcResults();

  // Contact / Book Survey Inputs
  const [surveyForm, setSurveyForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Bhubaneswar",
    address: "",
    preferredDate: ""
  });

  // PM Surya Ghar eligibility states
  const [eligibleQuestion1, setEligibleQuestion1] = useState<boolean | null>(null);
  const [eligibleQuestion2, setEligibleQuestion2] = useState<boolean | null>(null);
  const [eligibleQuestion3, setEligibleQuestion3] = useState<boolean | null>(null);



  // Fetch leads and surveys for simulated live experience
  useEffect(() => {
    fetchLeadsAndSurveys();
  }, []);

  const fetchLeadsAndSurveys = async () => {
    try {
      const lRes = await fetch("/api/leads");
      if (lRes.ok) {
        const data = await lRes.json();
        setLeadsList(data);
      }
      const sRes = await fetch("/api/surveys");
      if (sRes.ok) {
        const data = await sRes.json();
        setSurveysList(data);
      }
    } catch (err) {
      console.warn("Could not load database records. Using static mock databases.");
    }
  };

  // Submission Handlers
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: surveyForm.name || "Calculator User",
      email: surveyForm.email || "user@example.com",
      phone: surveyForm.phone || "9437000000",
      city,
      electricityBill: monthlyBill,
      monthlyUnits,
      roofArea,
      roofType,
      electricityBoard,
      solarType,
      panelBrand: selectedBrand,
      batteryRequired,
      backupHours,
      ...results
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setLeadSubmitted(true);
        fetchLeadsAndSurveys();
      }
    } catch (err) {
      console.error(err);
      setLeadSubmitted(true); // fall-back UX
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyForm.name || !surveyForm.phone || !surveyForm.address) {
      alert("Please fill in Name, Phone, and Site Address");
      return;
    }

    const payload = {
      ...surveyForm,
      capacityQuote: results.recommendedCapacity,
      brandQuote: selectedBrand,
      notes: `Requested Solar System: ${results.recommendedCapacity}kW (${solarType})`
    };

    try {
      const res = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        setSurveyEmailStatus({
          sent: data.emailSent,
          error: data.emailError
        });
        setSurveyBooked(true);
        fetchLeadsAndSurveys();
      }
    } catch (err: any) {
      console.error(err);
      setSurveyEmailStatus({
        sent: false,
        error: err.message || String(err)
      });
      setSurveyBooked(true); // fall-back UX
    }
  };

  // Portal Login Logic
  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalPhone) {
      alert("Please enter your Phone number.");
      return;
    }
    // Match against survey bookings
    const matched = surveysList.filter(s => s.phone === portalPhone || s.email === portalEmail);
    if (matched.length > 0) {
      setUserSurveys(matched);
      setActiveSurvey(matched[0]);
    } else {
      // Create a simulated survey so they can play with the dashboard!
      const tempSurvey: Survey = {
        id: "srv_test_123",
        name: "Valued Customer",
        email: portalEmail || "test@gmail.com",
        phone: portalPhone,
        city: "Bhubaneswar",
        address: "Plot 420, Patia, Near KIIT College, Bhubaneswar",
        preferredDate: "2026-07-05",
        status: "Active Installation",
        progressStep: 3, // Step 3: Approval Pending
        createdAt: new Date().toISOString(),
        capacityQuote: 4.5,
        brandQuote: "Waaree",
        notes: "Elevated high-rise structure with net-metering setup"
      };
      setUserSurveys([tempSurvey]);
      setActiveSurvey(tempSurvey);
    }
    setIsLoggedIn(true);
  };

  // Admin Step Update
  const updateSurveyStep = async (id: string, step: number) => {
    try {
      const res = await fetch(`/api/surveys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progressStep: step })
      });
      if (res.ok) {
        setEditingSurveyId(null);
        fetchLeadsAndSurveys();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // AI Chat message sender
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    
    const updatedMessages = [
      ...chatMessages,
      {
        role: "user" as const,
        content: userMsg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatMessages(updatedMessages);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: updatedMessages.slice(-5) // Send last few messages for context
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [
          ...prev,
          {
            role: "model",
            content: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          role: "model",
          content: "Sorry, I ran into a connection issue. Rest assured, Shree Adishakti Solar has got you covered! Feel free to ask another question.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden relative selection:bg-[#F27D26]/10">
      
      {/* Background Ambient soft light-mode glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0056B3]/5 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#F27D26]/5 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute top-[40%] right-[-5%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] opacity-40"></div>
      </div>

      {/* Floating Header */}
      <header className="relative z-50 px-6 md:px-12 py-5 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 shadow-sm shadow-slate-100/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo element */}
          <div className="cursor-pointer" onClick={() => setActiveTab("home")}>
            <Logo variant="light" textSize="md" />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium text-slate-600">
            <button 
              onClick={() => setActiveTab("home")} 
              className={`hover:text-[#F27D26] transition-colors cursor-pointer ${activeTab === "home" ? "text-[#F27D26] font-bold" : ""}`}
            >
              Solutions
            </button>
            <button 
              onClick={() => setActiveTab("calculator")} 
              className={`hover:text-[#F27D26] transition-colors cursor-pointer ${activeTab === "calculator" ? "text-[#F27D26] font-bold" : ""}`}
            >
              ROI Calculator
            </button>
            <button 
              onClick={() => setActiveTab("brands")} 
              className={`hover:text-[#F27D26] transition-colors cursor-pointer ${activeTab === "brands" ? "text-[#F27D26] font-bold" : ""}`}
            >
              Brands & Products
            </button>
            <button 
              onClick={() => setActiveTab("gallery")} 
              className={`hover:text-[#F27D26] transition-colors cursor-pointer ${activeTab === "gallery" ? "text-[#F27D26] font-bold" : ""}`}
            >
              Completed Projects
            </button>
          </nav>

          {/* Call to Action Buttons */}
          <div className="flex items-center space-x-2.5">
            {/* Direct Call Button */}
            <a 
              href="tel:+919583390808"
              className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 duration-200"
              title="Call Us Now (+91 95833 90808)"
            >
              <Phone size={15} className="stroke-[2.5]" />
            </a>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/919583390808?text=Hello%20Shree%20Adi%20Shakti%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20rooftop%20installation%20and%20would%20like%20to%20get%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 duration-200"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.452.99 6.014.99 1.593 5.36 1.59 10.792c-.001 1.761.474 3.481 1.376 4.982L1.948 21.9l6.3-1.636c-1.459.79-2.223.511-1.601-.11zM15.93 14.15c-.237-.117-1.4-.689-1.616-.767-.216-.078-.373-.117-.53.117s-.607.767-.745.925c-.137.157-.275.177-.511.06-.237-.117-.999-.368-1.902-1.171-.703-.627-1.177-1.4-1.315-1.636-.137-.236-.015-.363.104-.48.107-.107.237-.275.355-.412.118-.137.157-.236.237-.393.078-.157.039-.295-.02-.412s-.53-1.277-.726-1.748c-.19-.459-.384-.396-.53-.404-.135-.007-.29-.009-.445-.009s-.408.059-.62.29c-.212.231-.81.792-.81 1.932s.83 2.24 1.004 2.47c.174.23 1.63 2.49 3.95 3.49.552.23 1.037.382 1.391.495.555.176 1.059.151 1.457.091.444-.067 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12s-.222-.16-.46-.277z"/>
              </svg>
            </a>

            {/* Instagram Button */}
            <a 
              href="https://www.instagram.com/shreeadishaktisolar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 duration-200"
              title="Follow on Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            <button 
              onClick={() => {
                setActiveTab("calculator");
                setTimeout(() => {
                  document.getElementById("survey-section")?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              className="hidden lg:block px-4.5 py-2 border border-[#F27D26]/40 hover:border-[#F27D26] text-[#F27D26] rounded-full text-[10px] uppercase tracking-widest transition-all cursor-pointer bg-orange-50/50 hover:bg-orange-100/50"
            >
              Book Site Survey
            </button>
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="p-2.5 bg-slate-100 border border-slate-200 rounded-full hover:bg-slate-200 transition-all text-slate-700 relative cursor-pointer"
            >
              <MessageSquare size={16} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F27D26] rounded-full animate-ping"></span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-slate-800 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-150 relative z-40 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-5 space-y-3.5 flex flex-col text-[11px] uppercase tracking-[0.2em] font-bold text-slate-700">
              <button 
                onClick={() => {
                  setActiveTab("home");
                  setIsMobileMenuOpen(false);
                }} 
                className={`py-2.5 text-left hover:text-[#F27D26] transition-colors border-b border-slate-100 flex justify-between items-center ${activeTab === "home" ? "text-[#F27D26]" : ""}`}
              >
                <span>Solutions</span>
                <ChevronRight size={14} className="opacity-60 text-slate-400" />
              </button>
              <button 
                onClick={() => {
                  setActiveTab("calculator");
                  setIsMobileMenuOpen(false);
                }} 
                className={`py-2.5 text-left hover:text-[#F27D26] transition-colors border-b border-slate-100 flex justify-between items-center ${activeTab === "calculator" ? "text-[#F27D26]" : ""}`}
              >
                <span>ROI Calculator</span>
                <ChevronRight size={14} className="opacity-60 text-slate-400" />
              </button>
              <button 
                onClick={() => {
                  setActiveTab("brands");
                  setIsMobileMenuOpen(false);
                }} 
                className={`py-2.5 text-left hover:text-[#F27D26] transition-colors border-b border-slate-100 flex justify-between items-center ${activeTab === "brands" ? "text-[#F27D26]" : ""}`}
              >
                <span>Brands & Products</span>
                <ChevronRight size={14} className="opacity-60 text-slate-400" />
              </button>
              <button 
                onClick={() => {
                  setActiveTab("gallery");
                  setIsMobileMenuOpen(false);
                }} 
                className={`py-2.5 text-left hover:text-[#F27D26] transition-colors border-b border-slate-100 flex justify-between items-center ${activeTab === "gallery" ? "text-[#F27D26]" : ""}`}
              >
                <span>Completed Projects</span>
                <ChevronRight size={14} className="opacity-60 text-slate-400" />
              </button>

              {/* Mobile Quick Contacts */}
              <div className="pt-2 grid grid-cols-2 gap-2.5 font-sans font-bold">
                <a
                  href="tel:+919583390808"
                  className="flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded-xl transition-all text-center uppercase tracking-wider text-[9px]"
                >
                  <Phone size={13} />
                  <span>Call Support</span>
                </a>
                <a
                  href="https://wa.me/919583390808?text=Hello%20Shree%20Adi%20Shakti%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20rooftop%20installation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-100 rounded-xl transition-all text-center uppercase tracking-wider text-[9px]"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.452.99 6.014.99 1.593 5.36 1.59 10.792c-.001 1.761.474 3.481 1.376 4.982L1.948 21.9l6.3-1.636c-1.459.79-2.223.511-1.601-.11zM15.93 14.15c-.237-.117-1.4-.689-1.616-.767-.216-.078-.373-.117-.53.117s-.607.767-.745.925c-.137.157-.275.177-.511.06-.237-.117-.999-.368-1.902-1.171-.703-.627-1.177-1.4-1.315-1.636-.137-.236-.015-.363.104-.48.107-.107.237-.275.355-.412.118-.137.157-.236.237-.393.078-.157.039-.295-.02-.412s-.53-1.277-.726-1.748c-.19-.459-.384-.396-.53-.404-.135-.007-.29-.009-.445-.009s-.408.059-.62.29c-.212.231-.81.792-.81 1.932s.83 2.24 1.004 2.47c.174.23 1.63 2.49 3.95 3.49.552.23 1.037.382 1.391.495.555.176 1.059.151 1.457.091.444-.067 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12s-.222-.16-.46-.277z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              <button 
                onClick={() => {
                  setActiveTab("calculator");
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById("survey-section")?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="w-full py-3 bg-gradient-to-r from-[#F27D26] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white rounded-xl text-center text-[10px] uppercase tracking-widest font-black shadow-md shadow-orange-500/20 active:scale-98 transition-all"
              >
                Book Site Survey
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-10 flex-1 min-h-[calc(100vh-180px)]">
        
        {/* TAB 1: HOME/SOLUTIONS VIEW */}
        {activeTab === "home" && (
          <div className="space-y-24">
            
            {/* HERO SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
              
              {/* Left Column vertical indicator */}
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <div className="rotate-[-90deg] origin-left whitespace-nowrap text-[10px] uppercase tracking-[0.5em] text-slate-400 font-bold">
                  ESTABLISHED 2010 • ODISHA'S PREMIER EPC
                </div>
              </div>

              {/* Center Content Section */}
              <div className="col-span-1 lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Solar Intelligence Ecosystem</span>
                  <h1 className="text-4xl md:text-[80px] leading-[0.9] font-black tracking-tighter uppercase font-display text-slate-950">
                    BRIGHT <br/>
                    POWER FOR <br/>
                    <span className="text-[#F27D26]">BETTER FUTURE.</span>
                  </h1>
                </div>

                <p className="max-w-md text-slate-600 text-sm leading-relaxed">
                  Experience Odisha's most advanced residential & commercial solar ecosystem. From AI-designed glass-glass Bifacial panels to smart inverter management, we redefine clean energy independence.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setActiveTab("calculator");
                      setTimeout(() => {
                        document.getElementById("calculator-card")?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-8 py-3.5 bg-[#F27D26] text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg shadow-[#F27D26]/20 transition-all hover:scale-105 cursor-pointer"
                  >
                    Calculate ROI Savings
                  </button>
                  
                  <button 
                    onClick={() => {
                      setActiveTab("brands");
                    }}
                    className="px-8 py-3.5 border border-slate-300 text-slate-800 font-bold rounded-full text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Award size={14} />
                    <span>Explore Premium Brands</span>
                  </button>
                </div>

                {/* Micro Live statistics badge */}
                <div className="pt-6 flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 border border-white flex items-center justify-center text-[10px] font-bold text-white">B</div>
                    <div className="w-8 h-8 rounded-full bg-orange-600 border border-white flex items-center justify-center text-[10px] font-bold text-white">C</div>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 border border-white flex items-center justify-center text-[10px] font-bold text-white">P</div>
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="text-slate-800 font-bold block">180+ Installations Completed</span>
                    100 kW+ Combined Solar Projects Done
                  </div>
                </div>
              </div>

              {/* Right Column Interactive Premium Solar Panels Viewing Showcase */}
              <div className="col-span-1 lg:col-span-5 relative">
                <div className="w-full aspect-square relative max-w-md mx-auto">
                  {/* Decorative offset frames */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 rounded-[40px] rotate-[8deg]"></div>
                  
                  {/* Main Solar Panels Interactive Card */}
                  <div className="absolute inset-0 bg-white border border-slate-200 rounded-[40px] transform translate-x-3 -translate-y-3 shadow-2xl flex flex-col overflow-hidden text-slate-800">
                    
                    {/* Top Section: Tab toggles and active brand logo badge */}
                    <div className="bg-slate-50 border-b border-slate-100 p-4 flex flex-col justify-between space-y-3 shrink-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-widest uppercase bg-slate-200 text-slate-800 px-2.5 py-1 rounded-md border border-slate-300/30">
                          Panel Spec Viewer
                        </span>
                        <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[9px] font-bold tracking-wider">
                          <CheckCircle size={10} className="text-emerald-500" />
                          <span>PM SURYA GHAR APPROVED</span>
                        </div>
                      </div>

                      {/* Slider Selector Tabs */}
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                        {PRODUCTS.filter(p => p.category === "Solar Panels").map((panel) => (
                          <button
                            key={panel.id}
                            onClick={() => setSelectedPanelId(panel.id)}
                            className={`py-2 text-[10px] uppercase rounded-lg font-bold tracking-wider transition-all cursor-pointer text-center ${
                              selectedPanelId === panel.id 
                                ? "bg-white text-[#F27D26] shadow-sm font-black" 
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            {panel.brand} {panel.id === "p1" ? "Bifacial" : "TOPCon"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Middle Section: Image preview & interactive simulated solar radiance */}
                    <div className="flex-1 min-h-0 p-5 flex flex-col justify-between overflow-hidden">
                      {/* Active solar panel specs and high-res image side-by-side */}
                      {(() => {
                        const activePanel = PRODUCTS.find(p => p.id === selectedPanelId) || PRODUCTS[0];
                        const powerValue = activePanel.id === "p1" ? 550 : 590;
                        const simulatedPower = Math.round(powerValue * (sunIntensity / 100));
                        const efficiency = activePanel.id === "p1" ? "21.3%" : "22.8%";
                        
                        return (
                          <div className="flex flex-col h-full justify-between space-y-3.5">
                            <div className="grid grid-cols-12 gap-4 items-center flex-1 min-h-0">
                              {/* Left half: High resolution image preview of the solar panel */}
                              <div className="col-span-5 h-full min-h-0 relative rounded-2xl overflow-hidden border border-slate-150 bg-slate-50 shadow-inner flex items-center justify-center group">
                                <img
                                  src={activePanel.image}
                                  alt={activePanel.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                                <span className="absolute bottom-2 left-2 text-[8px] font-mono font-bold text-white uppercase tracking-wider bg-slate-950/65 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                                  {activePanel.id === "p1" ? "Double Glass" : "N-Type"}
                                </span>
                              </div>

                              {/* Right half: High-density real dynamic specifications */}
                              <div className="col-span-7 space-y-2">
                                <h3 className="text-xs font-black tracking-tight uppercase text-slate-900 line-clamp-2 leading-tight">
                                  {activePanel.name}
                                </h3>
                                <p className="text-[10px] text-slate-500 italic leading-snug line-clamp-2">
                                  {activePanel.tagline}
                                </p>

                                {/* Mini specs values list */}
                                <div className="space-y-1.5 pt-1">
                                  <div className="flex justify-between text-[10px] border-b border-slate-100 pb-1">
                                    <span className="text-slate-400 font-medium">Efficiency Rate</span>
                                    <span className="text-[#F27D26] font-bold font-mono">{efficiency}</span>
                                  </div>
                                  <div className="flex justify-between text-[10px] border-b border-slate-100 pb-1">
                                    <span className="text-slate-400 font-medium">Peak Output</span>
                                    <span className="text-slate-800 font-bold font-mono">{powerValue} Watts</span>
                                  </div>
                                  <div className="flex justify-between text-[10px] border-b border-slate-100 pb-1">
                                    <span className="text-slate-400 font-medium">Degradation Rate</span>
                                    <span className="text-emerald-600 font-bold font-mono">{activePanel.id === "p1" ? "0.45% /Yr" : "0.40% /Yr"}</span>
                                  </div>
                                  <div className="flex justify-between text-[10px]">
                                    <span className="text-slate-400 font-medium">Linear Warranty</span>
                                    <span className="text-slate-800 font-bold">{activePanel.id === "p1" ? "25 Years" : "30 Years"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Sunlight simulation controls */}
                            <div className="bg-slate-50 border border-slate-150/70 p-3.5 rounded-2xl space-y-2">
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center space-x-1">
                                  <Sun size={12} className="text-amber-500 animate-pulse" />
                                  <span>Simulate Sun Radiance</span>
                                </span>
                                <span className="font-mono font-black text-[#F27D26]">{sunIntensity}% Intensity</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={sunIntensity}
                                onChange={(e) => setSunIntensity(Number(e.target.value))}
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F27D26]"
                              />
                              <div className="flex justify-between items-center text-[10.5px]">
                                <span className="text-slate-400 font-medium">Current Power Yield:</span>
                                <span className="font-mono font-black text-slate-900 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md text-xs animate-pulse">
                                  {simulatedPower} Watts
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* BRAND PARTNERS SHOWCASE ROW */}
            <div className="py-12 border-t border-slate-100">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Trusted Partners & Authorised Integrator</span>
                <h3 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight text-slate-900">
                  AUTHORISED REGISTRATION & COLLABORATING BRANDS
                </h3>
                <p className="text-sm text-slate-600 max-w-xl mx-auto">
                  We partner exclusively with Tier-1 global manufacturers to ensure your rooftop solar power plant delivers maximum power generation efficiency and decades of uninterrupted service.
                </p>
              </div>

              {/* Grid of elegant, stylized SVG logos for each premier brand */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center bg-slate-50/50 p-8 rounded-[32px] border border-slate-100/80">
                
                {/* Tata Power Solar */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-blue-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center text-blue-700 font-extrabold text-sm tracking-tighter uppercase font-display select-none">
                    <svg viewBox="0 0 120 40" className="h-7 w-auto mr-1 fill-blue-600">
                      <polygon points="10,5 20,35 30,5 23,5 20,24 17,5" />
                      <polygon points="35,35 45,5 55,35 48,35 45,16 42,35" />
                      <rect x="58" y="5" width="22" height="6" />
                      <rect x="66" y="11" width="6" height="24" />
                      <polygon points="85,35 95,5 105,35 98,35 95,16 92,35" />
                    </svg>
                    <div className="text-left leading-none font-mono font-black ml-1">
                      <span className="text-[12px] block text-blue-900 tracking-tight">TATA</span>
                      <span className="text-[8px] block text-blue-500 tracking-widest font-sans font-extrabold -mt-0.5">POWER</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-blue-500 transition-colors">Solar Partner</span>
                </div>

                {/* Waaree */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-amber-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center text-amber-600 font-black text-sm tracking-tight select-none">
                    <svg viewBox="0 0 100 40" className="h-8 w-auto">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#ea580c" strokeWidth="4" />
                      <circle cx="20" cy="20" r="6" fill="#f59e0b" />
                      <path d="M20,2 L20,6" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                      <path d="M20,34 L20,38" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                      <path d="M2,20 L6,20" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                      <path d="M34,20 L38,20" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div className="text-left leading-none font-black ml-1.5 font-display">
                      <span className="text-[11px] block text-[#ea580c] tracking-tighter">WAAREE</span>
                      <span className="text-[7px] block text-emerald-600 tracking-widest uppercase font-sans font-bold">Energies</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-amber-500 transition-colors">Premium Panels</span>
                </div>

                {/* Adani */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-red-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center text-red-600 font-black select-none">
                    <svg viewBox="0 0 100 40" className="h-7 w-auto mr-1.5">
                      <path d="M10,35 C15,20 30,10 45,10 C60,10 75,20 80,35" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="45" cy="25" r="5" fill="#f59e0b" />
                    </svg>
                    <div className="text-left leading-none font-black font-display">
                      <span className="text-[14px] block text-slate-900 tracking-tighter">adani</span>
                      <span className="text-[7px] block text-red-600 tracking-widest uppercase font-sans font-bold -mt-0.5">Solar</span>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-red-500 transition-colors">Tier-1 Partner</span>
                </div>

                {/* Luminous */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-blue-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center text-blue-800 font-black text-sm tracking-tight select-none">
                    <svg viewBox="0 0 100 40" className="h-6 w-auto mr-1">
                      <rect x="5" y="5" width="30" height="30" rx="6" fill="#1e3a8a" />
                      <path d="M12,25 L20,13 L22,21 L28,15" fill="none" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[11px] font-extrabold tracking-tighter text-[#1e3a8a] font-display">LUMINOUS</span>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-blue-800 transition-colors">Smart Inverters</span>
                </div>

                {/* Polycab */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-red-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center text-red-600 font-black select-none">
                    <svg viewBox="0 0 100 40" className="h-7 w-auto mr-1.5">
                      <path d="M10,12 C10,12 25,5 35,15 C45,25 50,10 65,10 C80,10 90,25 90,25" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="35" cy="15" r="4" fill="#10b981" />
                    </svg>
                    <span className="text-[11px] font-extrabold tracking-widest text-[#ef4444] font-display">POLYCAB</span>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-red-500 transition-colors">Safety DC Wires</span>
                </div>

                {/* Exide */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-red-600/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center select-none">
                    <div className="bg-red-600 px-2 py-1 rounded text-white text-[11px] font-black tracking-widest font-sans shadow-sm flex items-center justify-center">
                      EXIDE
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-red-600 transition-colors">Storage Battery</span>
                </div>

                {/* Eastman */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-150/70 shadow-sm hover:border-yellow-500/20 hover:shadow-md transition-all duration-300 w-full aspect-video group">
                  <div className="h-10 flex items-center justify-center select-none font-display">
                    <svg viewBox="0 0 100 40" className="h-7 w-auto mr-1">
                      <polygon points="5,5 25,5 15,35" fill="#f59e0b" />
                    </svg>
                    <span className="text-[11px] font-black tracking-tighter text-slate-900 uppercase">EASTMAN</span>
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-2 tracking-widest uppercase group-hover:text-yellow-600 transition-colors">Solar Energy</span>
                </div>

              </div>
            </div>

            {/* PROJECT GALLERY - PINTEREST STYLE */}
            <div className="py-12 border-t border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                <div className="space-y-3">
                  <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Portfolio Showcase</span>
                  <h3 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight text-slate-900">
                    ODISHA'S SAVINGS PORTFOLIO
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg">
                    Explore real live high-uptime installations completed across residential, industrial, and institutional sectors in Odisha.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {localProjects.map((project, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#F27D26]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#F27D26]">
                        {project.category}
                      </span>
                      
                      {project.gps && (
                        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-mono text-slate-300 border border-white/10 flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 bg-[#F27D26] rounded-full animate-pulse"></span>
                          <span>{project.gps.split(",")[0]}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-wider">
                          📍 {project.location}
                        </span>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-slate-950 leading-tight">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{project.desc}</p>
                      </div>

                      <div className="pt-2 space-y-2">
                        {project.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(project.rating)].map((_, i) => (
                              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-[9px] font-bold text-slate-500 ml-1 font-mono">VERIFIED RATING</span>
                          </div>
                        )}
                        {project.clientName && (
                          <div className="text-[10px] font-bold text-[#F27D26] flex items-center justify-between">
                            <span>Client: {project.clientName}</span>
                            <span className="text-slate-400 font-normal text-[9px]">{project.date}</span>
                          </div>
                        )}
                        {project.feedback && (
                          <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                            "{project.feedback}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2">
                      <div className="h-[1px] w-full bg-slate-100 mb-4"></div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-slate-400">Status</span>
                        <span className="text-emerald-600 flex items-center">
                          <CheckCircle size={10} className="mr-1 animate-pulse" />
                          Online & Exporting
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CINEMATIC STORYBOARD: SCROLL PROGRESSIVE SHOWCASE */}
            <div className="py-12 border-t border-slate-100 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">
                  The Journey & Service Commitment
                </span>
                <h2 className="text-3xl md:text-5xl font-black font-display text-slate-950 uppercase tracking-tight leading-none">
                  WARRANTY, AMC & <br/>
                  <span className="text-[#F27D26]">WORK EXECUTION PLAN</span>
                </h2>
                <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
                  We are committed to delivering extreme engineering care. Explore our rigorous 30-day work execution timeline and comprehensive 25-year warranty protections.
                </p>

                {/* Tab buttons */}
                <div className="flex justify-center space-x-2 pt-4">
                  <button
                    onClick={() => setJourneyTab("timeline")}
                    className={`px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                      journeyTab === "timeline"
                        ? "bg-[#F27D26] text-white shadow-lg shadow-orange-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    📅 30-Day Project Timeline
                  </button>
                  <button
                    onClick={() => setJourneyTab("warranty")}
                    className={`px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                      journeyTab === "warranty"
                        ? "bg-[#F27D26] text-white shadow-lg shadow-orange-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    🛡️ Warranties & AMC Care
                  </button>
                </div>
              </div>

              {/* Tab 1: Execution Timeline */}
              {journeyTab === "timeline" && (
                <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-10 space-y-8 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 flex items-center gap-2">
                        <span>Work Execution Plan</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                          20-30 Days Total
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">Subject to DISCOM and government processing times</p>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-slate-600 font-mono font-bold">
                      <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#F27D26] mr-1.5 animate-pulse"></span> Active Stage</span>
                      <span className="text-slate-300">|</span>
                      <span>Expected Life: 25+ Years</span>
                    </div>
                  </div>

                  {/* Split View */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Sidebar: Step Navigation */}
                    <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                      {EXECUTION_STEPS.map((step, idx) => {
                        const isSelected = selectedTimelineStep === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedTimelineStep(idx)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center space-x-3.5 cursor-pointer ${
                              isSelected 
                                ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10" 
                                : "bg-white border-slate-200/60 hover:bg-slate-100 text-slate-800"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold font-mono text-xs shrink-0 ${
                              isSelected 
                                ? "bg-[#F27D26] text-white" 
                                : "bg-slate-100 text-[#F27D26]"
                            }`}>
                              {step.num}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                <h4 className="text-[11px] font-bold uppercase tracking-wider truncate">
                                  {step.title}
                                </h4>
                                <span className={`text-[9px] font-mono font-bold shrink-0 ml-1.5 ${
                                  isSelected ? "text-[#F27D26]" : "text-slate-400"
                                }`}>
                                  {step.days}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Details Card */}
                    <div className="lg:col-span-7">
                      {(() => {
                        const activeStep = EXECUTION_STEPS[selectedTimelineStep] || EXECUTION_STEPS[0];
                        const StepIcon = activeStep.icon;

                        return (
                          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden group">
                            {/* Accent graphics */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors pointer-events-none"></div>
                            
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-black text-[#F27D26] uppercase tracking-[0.2em] block">
                                    Stage {activeStep.num} — {activeStep.days}
                                  </span>
                                  <h3 className="text-xl md:text-2xl font-black font-display uppercase tracking-tight text-slate-900">
                                    {activeStep.title}
                                  </h3>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#F27D26] flex items-center justify-center border border-orange-100 shrink-0">
                                  <StepIcon size={24} />
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {activeStep.desc}
                              </p>

                              {/* Detailed Activity Checkpoints */}
                              <div className="space-y-2.5">
                                <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                                  Engineering Checkpoints & Tasks:
                                </h4>
                                <div className="grid grid-cols-1 gap-2.5">
                                  {activeStep.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="flex items-start space-x-2.5 text-xs text-slate-700 leading-snug">
                                      <div className="w-4 h-4 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={10} className="stroke-[3]" />
                                      </div>
                                      <span>{detail}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Timeline Stepper Controls */}
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center gap-4">
                              <button
                                disabled={selectedTimelineStep === 0}
                                onClick={() => setSelectedTimelineStep((prev) => Math.max(0, prev - 1))}
                                className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold border cursor-pointer transition-colors ${
                                  selectedTimelineStep === 0
                                    ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                🡄 Previous
                              </button>
                              
                              <span className="text-[10px] font-mono font-bold text-slate-400">
                                {selectedTimelineStep + 1} of 10 Stages
                              </span>

                              <button
                                disabled={selectedTimelineStep === 9}
                                onClick={() => setSelectedTimelineStep((prev) => Math.min(9, prev + 1))}
                                className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold cursor-pointer transition-colors ${
                                  selectedTimelineStep === 9
                                    ? "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                                    : "bg-[#F27D26] text-white hover:bg-[#e06810]"
                                }`}
                              >
                                Next Stage 🡆
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                  </div>
                </div>
              )}

              {/* Tab 2: Warranties & AMC */}
              {journeyTab === "warranty" && (
                <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-10 space-y-10 shadow-sm text-slate-800 animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left 6 columns: Component Warranties Grid */}
                    <div className="lg:col-span-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 flex items-center gap-2">
                          <span>Warranty Coverage Dashboard</span>
                          <span className="text-[9px] font-mono bg-orange-100 text-[#F27D26] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Full Coverage
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Official manufacturer backed certificates provided at handover</p>
                      </div>

                      {/* Warranties List */}
                      <div className="space-y-3">
                        {[
                          {
                            component: "Solar PV Modules",
                            duration: "25 Years",
                            type: "Performance Warranty",
                            desc: "Guarantees minimum 80% power output at 25 years.",
                            color: "from-amber-500 to-[#F27D26]",
                            icon: Sun
                          },
                          {
                            component: "Smart Grid-Tied Inverter",
                            duration: "7 Years",
                            type: "Product Warranty",
                            desc: "Comprehensive product warranty with full replacement support.",
                            color: "from-blue-600 to-[#0056B3]",
                            icon: Zap
                          },
                          {
                            component: "Mounting Structure",
                            duration: "5 Years",
                            type: "Structural Warranty",
                            desc: "Guaranteed structural integrity against rust, corrosion & failure.",
                            color: "from-slate-700 to-slate-900",
                            icon: Wrench
                          },
                          {
                            component: "Installation Work",
                            duration: "5 Years",
                            type: "Workmanship Warranty",
                            desc: "Warranty against installation, leakages, or electrical defects.",
                            color: "from-purple-600 to-purple-800",
                            icon: Shield
                          },
                          {
                            component: "AMC Services Contract",
                            duration: "5 Years",
                            type: "Comprehensive Contract",
                            desc: "Annual Maintenance contract with quarterly system health audits.",
                            color: "from-emerald-600 to-emerald-800",
                            icon: CheckCircle
                          }
                        ].map((w, idx) => {
                          const Icon = w.icon;
                          return (
                            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start space-x-4 hover:border-[#F27D26]/20 hover:shadow-xs transition-all">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${w.color} text-white flex items-center justify-center shrink-0`}>
                                <Icon size={18} />
                              </div>
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex justify-between items-baseline">
                                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-tight">{w.component}</h4>
                                  <span className="text-[10px] font-mono font-black text-[#F27D26] uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                                    {w.duration}
                                  </span>
                                </div>
                                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">{w.type}</p>
                                <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right 6 columns: AMC Services & Claims */}
                    <div className="lg:col-span-6 space-y-6 h-full flex flex-col justify-between">
                      
                      {/* AMC List Card */}
                      <div className="bg-slate-900 text-white rounded-[24px] p-6 border border-slate-800 shadow-lg space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 text-white/[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                          <CheckCircle size={150} />
                        </div>
                        
                        <div className="flex justify-between items-start border-b border-white/10 pb-3">
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F27D26]">AMC Services Included</h4>
                            <p className="text-[10px] text-slate-400">Quarterly inspections to guarantee 99%+ generation uptime</p>
                          </div>
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase tracking-widest border border-emerald-500/30">
                            Included Free
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {[
                            "Quarterly on-site cleaning & check",
                            "Inverter parameter & diagnostics",
                            "DC/AC cables integrity inspection",
                            "Earthing & surge protection test",
                            "Detailed monthly savings reports",
                            "Priority callback (under 24 hrs)",
                            "Free minor component replace",
                            "Dual-earthing continuity testing"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-2 text-xs text-slate-200 leading-snug">
                              <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warranty Claims Desk */}
                      <div className="bg-orange-50/40 border border-orange-100 rounded-[24px] p-6 space-y-4">
                        <div className="border-b border-orange-200/50 pb-3">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">Warranty Claim Process</h4>
                          <p className="text-[10px] text-slate-500">Fast-track, hassle-free resolution desk for any system issue</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          {[
                            { step: "01", title: "Raise Claim", desc: "Contact with photos of error code" },
                            { step: "02", title: "Site Inspection", desc: "Visit within 48 working hrs" },
                            { step: "03", title: "Diagnosis", desc: "Complete testing & plan" },
                            { step: "04", title: "Replacement", desc: "Component swap finished" }
                          ].map((s, idx) => (
                            <div key={idx} className="bg-white/80 p-3 rounded-xl border border-orange-100/40 space-y-1 relative group hover:border-[#F27D26]/20 transition-all">
                              <span className="text-[10px] font-mono font-black text-[#F27D26] block">{s.step}</span>
                              <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 truncate">{s.title}</h5>
                              <p className="text-[9px] text-slate-500 leading-tight">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lifetime expectation callout */}
                      <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
                            <Star size={18} className="fill-amber-400 text-amber-400" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-tight">System Life Expectancy</h5>
                            <p className="text-[10px] text-slate-500 font-medium">Engineered for extreme cyclones & decades of performance</p>
                          </div>
                        </div>
                        <span className="text-2xl font-black font-display text-slate-900 border-l border-slate-200 pl-4">
                          25+ <span className="text-xs font-bold text-slate-400 block -mt-1">YEARS</span>
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE 3D SYSTEM ARCHITECTURE SCHEMATIC */}
            <div className="py-12 bg-white rounded-[32px] border border-slate-200/80 p-8 md:p-12 relative overflow-hidden shadow-lg shadow-slate-100">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#F27D26 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
                <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Interactive Blueprint</span>
                <h2 className="text-3xl font-bold font-display uppercase tracking-tight text-slate-950">
                  Interactive 3D Solar Architectures
                </h2>
                <p className="text-slate-600 text-sm">
                  Select a system type below to explore how electricity flows through various components in real-time. Witness the difference between direct grid exports, battery storage backup, and intelligent hybrid systems.
                </p>

                {/* System selector buttons */}
                <div className="flex flex-wrap justify-center gap-2 p-1 bg-slate-100 rounded-full max-w-lg mx-auto border border-slate-200">
                  {(["On-Grid", "Off-Grid", "Hybrid"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setDiagramSystemType(type)}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        diagramSystemType === type 
                          ? "bg-gradient-to-r from-[#F27D26] to-[#e06810] text-white shadow-md shadow-orange-500/10" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                      }`}
                    >
                      {type} System
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left side specifications */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-ping ${
                        diagramSystemType === "On-Grid" ? "bg-amber-500" :
                        diagramSystemType === "Off-Grid" ? "bg-emerald-500" :
                        "bg-[#0056B3]"
                      }`}></div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-widest block">
                        {diagramSystemType} Operation
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 leading-snug">
                      {diagramSystemType === "On-Grid" && "Grid-Tied Bidirectional Export"}
                      {diagramSystemType === "Off-Grid" && "Standalone Off-Grid Autonomy"}
                      {diagramSystemType === "Hybrid" && "Intelligent Hybrid Resiliency"}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {diagramSystemType === "On-Grid" && "Connects directly to your residential loads and the public electrical grid. Excess electricity spins your net-meter backward, translating to immediate financial credits."}
                      {diagramSystemType === "Off-Grid" && "Operates completely decoupled from the power grid. Solar arrays charge a high-capacity heavy-duty battery bank which supplies power to your home via an off-grid inverter. Perfect for rural regions with high load shedding."}
                      {diagramSystemType === "Hybrid" && "Combines the absolute best of both worlds. Connects to the public grid for net-metering solar exports AND is wired with a high-capacity lithium battery back-up. If the grid crashes, power is automatically routed from batteries."}
                    </p>

                    <div className="border-t border-slate-200/80 pt-4 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Best Suited For:</span>
                        <span className="font-bold text-slate-800">
                          {diagramSystemType === "On-Grid" && "Maximum Savings"}
                          {diagramSystemType === "Off-Grid" && "100% Independence"}
                          {diagramSystemType === "Hybrid" && "Power Cuts + Savings"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Subsidy Eligible:</span>
                        <span className="font-bold text-emerald-600">
                          {diagramSystemType === "On-Grid" && "Yes (Up to ₹78,000)"}
                          {diagramSystemType === "Off-Grid" && "No (Standalone)"}
                          {diagramSystemType === "Hybrid" && "Yes (On Solar Capacity)"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Core Protection:</span>
                        <span className="font-bold text-slate-800">Anti-Islanding Protection</span>
                      </div>
                    </div>
                  </div>

                  {/* Flow Priority block */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 block uppercase">Current Routing Priority</span>
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold">
                      {diagramSystemType === "On-Grid" && (
                        <>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md font-mono">1. HOME CONSUMPTION</span>
                          <ChevronRight size={10} className="text-slate-400" />
                          <span className="px-2 py-1 bg-sky-100 text-[#0056B3] rounded-md font-mono">2. GRID EXPORT</span>
                        </>
                      )}
                      {diagramSystemType === "Off-Grid" && (
                        <>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md font-mono">1. CHARGE STORAGE</span>
                          <ChevronRight size={10} className="text-slate-400" />
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md font-mono">2. HOUSE LOAD</span>
                        </>
                      )}
                      {diagramSystemType === "Hybrid" && (
                        <>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md font-mono">1. HOME</span>
                          <ChevronRight size={10} className="text-slate-400" />
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md font-mono">2. BATTERY</span>
                          <ChevronRight size={10} className="text-slate-400" />
                          <span className="px-2 py-1 bg-sky-100 text-[#0056B3] rounded-md font-mono">3. GRID</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side interactive 3D perspective diagram */}
                <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 relative perspective-container h-[450px] flex items-center justify-center overflow-hidden">
                  
                  {/* Grid background on floors */}
                  <div className="absolute inset-0 bg-slate-100/50 pointer-events-none" style={{ backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
                  
                  {/* Interactive flow line rendering with SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                      <linearGradient id="grad-solar" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F27D26" />
                        <stop offset="100%" stopColor="#fb923c" />
                      </linearGradient>
                      <linearGradient id="grad-battery" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <linearGradient id="grad-grid" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0056B3" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>

                    {/* Solar Panel to Inverter Line */}
                    <path d="M 120 180 Q 200 180, 260 220" fill="none" stroke="url(#grad-solar)" strokeWidth="3" className="flow-line" />
                    
                    {/* Inverter to Home Line */}
                    <path d="M 330 240 Q 380 240, 440 210" fill="none" stroke="url(#grad-solar)" strokeWidth="3" className="flow-line" />

                    {/* Conditional Grid Connection Line (On-Grid / Hybrid Only) */}
                    {(diagramSystemType === "On-Grid" || diagramSystemType === "Hybrid") && (
                      <path d="M 310 260 L 310 330" fill="none" stroke="url(#grad-grid)" strokeWidth="3" className={diagramSystemType === "Hybrid" ? "flow-line" : "flow-line"} />
                    )}

                    {/* Conditional Battery Line (Off-Grid / Hybrid Only) */}
                    {(diagramSystemType === "Off-Grid" || diagramSystemType === "Hybrid") && (
                      <path d="M 280 250 L 160 330" fill="none" stroke="url(#grad-battery)" strokeWidth="3" className="flow-line" />
                    )}
                  </svg>

                  {/* Component Node 1: Solar Roof (Elevated in 3D) */}
                  <div className="absolute top-[10%] left-[10%] z-20 transition-all duration-300 transform hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white border-2 border-[#F27D26] rounded-2xl p-4 shadow-xl text-center flex flex-col items-center justify-center w-36 h-28 transform -rotate-x-12 rotate-y-12">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#F27D26] mb-2 animate-pulse">
                        <Zap size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase block leading-none">Mono-Bifacial</span>
                      <span className="text-[9px] text-[#F27D26] font-mono mt-1 font-bold">SOLAR ARRAYS</span>
                      <span className="text-[8px] text-slate-400 block mt-0.5">550W High Yield</span>
                    </div>
                  </div>

                  {/* Component Node 2: Smart MPPT Inverter (Centerpiece) */}
                  <div className="absolute top-[38%] left-[34%] z-30 transition-all duration-300 transform hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white border-2 border-[#0056B3] rounded-2xl p-4 shadow-xl text-center flex flex-col items-center justify-center w-40 h-32 transform -rotate-x-12 rotate-y-12">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0056B3] mb-2">
                        <Sliders size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase block leading-none">
                        {diagramSystemType === "On-Grid" && "On-Grid Inverter"}
                        {diagramSystemType === "Off-Grid" && "Off-Grid Inverter"}
                        {diagramSystemType === "Hybrid" && "Hybrid Smart Inverter"}
                      </span>
                      <span className="text-[9px] text-[#0056B3] font-mono mt-1 font-bold">CENTRAL CONTROLLER</span>
                      <span className="text-[8px] text-slate-400 block mt-0.5">Pure Sine-Wave 98.2%</span>
                    </div>
                  </div>

                  {/* Component Node 3: Your Home/Load (Right side) */}
                  <div className="absolute top-[20%] right-[12%] z-20 transition-all duration-300 transform hover:scale-105" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white border border-slate-300 rounded-2xl p-4 shadow-xl text-center flex flex-col items-center justify-center w-36 h-28 transform -rotate-x-12 rotate-y-12">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-2">
                        <Building size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase block leading-none">Your Villa</span>
                      <span className="text-[9px] text-slate-500 font-mono mt-1 font-bold">HOME LOAD COVER</span>
                      <span className="text-[8px] text-emerald-600 block mt-0.5 font-bold">100% Zero Bills</span>
                    </div>
                  </div>

                  {/* Component Node 4: Battery Storage Bank (Bottom Left - Only for Hybrid / Off-Grid) */}
                  <div className={`absolute bottom-[8%] left-[12%] z-20 transition-all duration-500 transform ${
                    (diagramSystemType === "Off-Grid" || diagramSystemType === "Hybrid") 
                      ? "opacity-100 scale-100 translate-y-0" 
                      : "opacity-20 scale-95 translate-y-4 pointer-events-none"
                  }`} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 shadow-xl text-center flex flex-col items-center justify-center w-38 h-28 transform -rotate-x-12 rotate-y-12">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                        <Battery size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase block leading-none">Lithium LFP Bank</span>
                      <span className="text-[9px] text-emerald-500 font-mono mt-1 font-bold">ENERGY STORAGE</span>
                      <span className="text-[8px] text-slate-400 block mt-0.5">6000+ Deep Cycles</span>
                    </div>
                  </div>

                  {/* Component Node 5: Utility Grid (Bottom Center/Right - Only for On-Grid / Hybrid) */}
                  <div className={`absolute bottom-[5%] right-[22%] z-20 transition-all duration-500 transform ${
                    (diagramSystemType === "On-Grid" || diagramSystemType === "Hybrid") 
                      ? "opacity-100 scale-100 translate-y-0" 
                      : "opacity-20 scale-95 translate-y-4 pointer-events-none"
                  }`} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="bg-white border-2 border-sky-500 rounded-2xl p-4 shadow-xl text-center flex flex-col items-center justify-center w-38 h-28 transform -rotate-x-12 rotate-y-12">
                      <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mb-2">
                        <Activity size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase block leading-none">Bidirectional Meter</span>
                      <span className="text-[9px] text-sky-500 font-mono mt-1 font-bold">UTILITY GRID CO-OP</span>
                      <span className="text-[8px] text-emerald-600 block mt-0.5 font-bold">Net Metering Active</span>
                    </div>
                  </div>

                  {/* Active Connection Path Badges */}
                  <div className="absolute top-4 right-4 bg-slate-800 text-white text-[9px] font-bold px-3 py-1.5 rounded-md font-mono tracking-wider shadow-md">
                    ACTIVE FLOWS: {
                      diagramSystemType === "On-Grid" ? "PANELS ➔ INVERTER ➔ GRID" :
                      diagramSystemType === "Off-Grid" ? "PANELS ➔ BATTERIES ➔ VILLA" :
                      "PANELS ➔ INVERTER ➔ BATTERY & GRID"
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* PM SURYA GHAR ELIGIBILITY CHECKER */}
            <div className="py-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Government Aid Portal</span>
                <h3 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight leading-tight text-slate-900">
                  PM SURYA GHAR ELIGIBILITY CHECKER
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The Government of India is providing 100% direct bank transfer subsidies under the PM Surya Ghar Muft Bijli scheme. Answer these 3 simple questions to verify your eligibility.
                </p>
                <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  <div className="p-2.5 bg-[#F27D26]/10 rounded-lg text-[#F27D26]">
                    <Award size={18} />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">Odisha Feasibility Guarantee</span>
                    Shree Adishakti is an authorized vendor under TPCODL, TPNODL, TPSODL & TPWODL.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm">
                
                {/* Question 1 */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider block text-slate-700">
                    1. Do you have self-owned residential roof space (Concrete or Tin Shed)?
                  </label>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setEligibleQuestion1(true)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion1 === true ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Yes, Self Owned
                    </button>
                    <button 
                      onClick={() => setEligibleQuestion1(false)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion1 === false ? "bg-red-50 border-red-200 text-red-700 bg-red-50" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      No / Rental
                    </button>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider block text-slate-700">
                    2. Is your monthly electricity bill average above ₹1,000?
                  </label>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setEligibleQuestion2(true)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion2 === true ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Yes, Above ₹1000
                    </button>
                    <button 
                      onClick={() => setEligibleQuestion2(false)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion2 === false ? "bg-red-50 border-red-200 text-red-700 bg-red-50" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Below ₹1000
                    </button>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider block text-slate-700">
                    3. Do you possess a valid active domestic consumer electricity connection?
                  </label>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setEligibleQuestion3(true)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion3 === true ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Yes, I have Bill ID
                    </button>
                    <button 
                      onClick={() => setEligibleQuestion3(false)}
                      className={`px-6 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                        eligibleQuestion3 === false ? "bg-red-50 border-red-200 text-red-700 bg-red-50" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      No connection
                    </button>
                  </div>
                </div>

                {/* Eligibility Output Result Panel */}
                {eligibleQuestion1 !== null && eligibleQuestion2 !== null && eligibleQuestion3 !== null && (
                  <div className={`p-4 rounded-xl border transition-all ${
                    eligibleQuestion1 && eligibleQuestion2 && eligibleQuestion3 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-amber-50 border-amber-200 text-amber-800"
                  }`}>
                    {eligibleQuestion1 && eligibleQuestion2 && eligibleQuestion3 ? (
                      <div className="space-y-2">
                        <span className="font-bold text-sm block flex items-center">
                          <CheckCircle className="mr-2 text-emerald-600" size={16} />
                          CONGRATULATIONS! YOU ARE 100% ELIGIBLE!
                        </span>
                        <p className="text-xs leading-relaxed opacity-90 text-emerald-700">
                          Your building qualifies for the maximum central government financial subsidy of up to <strong>₹78,000</strong>. Our engineers can submit your application to the Discom within 24 hours of site booking.
                        </p>
                        <button
                          onClick={() => {
                            setActiveTab("calculator");
                            setTimeout(() => {
                              document.getElementById("survey-section")?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="mt-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded transition-all inline-block uppercase tracking-wider cursor-pointer"
                        >
                          Book Survey Now
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="font-bold text-sm block">Sub-optimal Eligibility Found</span>
                        <p className="text-xs opacity-90 text-amber-700">
                          Government subsidies generally require a registered domestic grid connection and self-owned concrete roofs. Commercial properties are eligible for capital tax depreciations instead of direct subsidies. Please contact our advisor.
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>



            {/* WHY CHOOSE US SECTOR - elegant lists */}
            <div className="py-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 hover:border-[#F27D26]/30 transition-all shadow-sm">
                <div className="w-12 h-12 bg-[#F27D26]/10 text-[#F27D26] rounded-2xl flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">25-Year Performance Shield</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We supply Tier-1 brand panels featuring linear power output decay guarantees. Rest assured your savings remain shielded through 2050.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 hover:border-[#F27D26]/30 transition-all shadow-sm">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">High Cyclone Resilience</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineering mounts customized to weather high-velocity coastal winds. Heavy-gauge hot-dipped galvanized structures withstand coastal rust.
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 hover:border-[#F27D26]/30 transition-all shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Award size={24} />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">Subsidy & Paperwork Solved</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid dealing with complex bureaucratic departments. Our legal and operations desk secures quick connection approvals and net metering.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ROI CALCULATOR VIEW */}
        {activeTab === "calculator" && (
          <div className="space-y-12 text-slate-800">
            
            <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
              <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Digital Financial Planner</span>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-slate-950">AI SOLAR SAVINGS CALCULATOR</h2>
              <p className="text-sm text-slate-600">
                Adjust the variables to simulate customized installation capacity, investment value, direct subsidies, and 25-year financial profits.
              </p>
            </div>

            {/* Input Slider Card and Output Metrics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="calculator-card">
              
              {/* Inputs Form column */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center">
                    <Sliders className="mr-2 text-[#F27D26]" size={16} />
                    System Configuration
                  </h3>
                </div>

                {/* Showcase navigation help banner */}
                <div 
                  onClick={() => {
                    setActiveTab("brands");
                    setTimeout(() => {
                      document.getElementById("main-content-area")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="bg-sky-50/60 hover:bg-sky-100/70 p-3 rounded-2xl border border-sky-100 flex items-center justify-between text-[10px] text-slate-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">🔎</span>
                    <span className="leading-tight">
                      We provide high-yield <strong>Bifacial Plates</strong>, <strong>TOPCon Plates</strong>, and <strong>Polycab Wires</strong>.
                    </span>
                  </div>
                  <span className="text-sky-600 font-bold group-hover:underline whitespace-nowrap ml-2 flex items-center">
                    Catalog →
                  </span>
                </div>

                {/* Monthly Bill Input */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-700">Average Monthly Bill</span>
                    <span className="font-mono text-[#F27D26] font-bold">₹{monthlyBill.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="30000" 
                    step="500"
                    value={monthlyBill} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMonthlyBill(val);
                      // approx calculation for units (₹8 average per unit)
                      setMonthlyUnits(Math.round(val / 8.2));
                    }}
                    className="w-full accent-[#F27D26] h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Monthly units input */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-700">Power Consumed (Units/Month)</span>
                    <span className="font-mono text-sky-600 font-bold">{monthlyUnits} kWh</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="3500" 
                    step="10"
                    value={monthlyUnits} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setMonthlyUnits(val);
                      setMonthlyBill(Math.round(val * 8.2));
                    }}
                    className="w-full accent-sky-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Roof Area slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-slate-700">Available Roof Area</span>
                    <span className="font-mono text-emerald-600 font-bold">{roofArea} Sq. Ft.</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="50"
                    value={roofArea} 
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Dropdowns row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Roof Structure Type</label>
                    <select 
                      value={roofType} 
                      onChange={(e) => setRoofType(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                    >
                      <option>RCC Flat Roof</option>
                      <option>Asbestos Shed</option>
                      <option>Tin GI Shed</option>
                      <option>Tile Sloped Roof</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Electricity Board</label>
                    <select 
                      value={electricityBoard} 
                      onChange={(e) => setElectricityBoard(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                    >
                      <option>TPCODL (Central Odisha)</option>
                      <option>TPSODL (Southern Odisha)</option>
                      <option>TPWODL (Western Odisha)</option>
                      <option>TPNODL (Northern Odisha)</option>
                    </select>
                  </div>
                </div>

                {/* Solar Type Toggles */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Solar System Architecture</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["On Grid", "Hybrid", "Off Grid"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSolarType(type);
                          if (type !== "On Grid") setBatteryRequired(true);
                        }}
                        className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                          solarType === type ? "bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Preferences Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Preferred Panel Brand</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {["Waaree", "Tata Power Solar", "Adani Solar", "Luminous", "Eastman Solar", "UTL"].map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`py-2 px-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                          selectedBrand === brand ? "bg-[#0056B3]/10 border-sky-400 text-[#0056B3]" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Battery Config */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold block text-slate-800">Battery Backup Storage</span>
                      <span className="text-[10px] text-slate-500 block">Requires tubular or Lithium packs</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBatteryRequired(!batteryRequired)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-all cursor-pointer ${batteryRequired ? "bg-emerald-500" : "bg-slate-300"}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${batteryRequired ? "translate-x-4" : ""}`}></div>
                    </button>
                  </div>

                  {batteryRequired && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-500 uppercase">Backup Time Required</span>
                        <span className="text-emerald-600 font-bold">{backupHours} Hours</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="12" 
                        step="1"
                        value={backupHours} 
                        onChange={(e) => setBackupHours(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-slate-100 rounded-lg"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Outputs calculation dashboard */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual grid cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Recommended System</span>
                    <span className="text-2xl font-mono font-bold text-slate-900 block">{results.recommendedCapacity} <span className="text-xs text-[#F27D26]">kWp</span></span>
                    <span className="text-[10px] text-slate-400 block mt-1">Capped at roof capacity</span>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">Number of Panels</span>
                    <span className="text-2xl font-mono font-bold text-slate-900 block">{results.numPanels} <span className="text-xs text-sky-600">Pcs</span></span>
                    <span className="text-[10px] text-slate-400 block mt-1">Tier-1 High Wattage Panels</span>
                  </div>

                  <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100 col-span-2 md:col-span-1 shadow-sm">
                    <span className="text-[10px] text-sky-600 block uppercase font-bold mb-1">Govt Subsidy Benefit</span>
                    <span className="text-2xl font-mono font-bold text-emerald-600 block">₹{results.subsidy.toLocaleString()}</span>
                    <span className="text-[10px] text-sky-500/70 block mt-1">PM Surya Ghar Credit</span>
                  </div>

                </div>

                {/* Pricing / Investment block with beautiful detailed item list */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-600">Estimated Financial Breakdown</h4>
                    <span className="text-[10px] bg-orange-50 text-[#F27D26] border border-orange-200/50 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Estimated ROI Report</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-6">
                    
                    <div className="space-y-4 text-slate-700">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Base Solar System ({selectedBrand}):</span>
                        <span className="font-mono text-slate-900 font-bold">₹{(results.estimatedInvestment - (batteryRequired ? Math.round((results.batterySize / 100) * 16000) : 0)).toLocaleString()}</span>
                      </div>
                      
                      {batteryRequired && (
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Battery Backup Cost:</span>
                          <span className="font-mono text-slate-900 font-bold">₹{Math.round((results.batterySize / 100) * 16000).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Engineering, Liaison & Structures:</span>
                        <span className="font-mono text-slate-900 font-bold text-emerald-600">INCLUDED (FREE)</span>
                      </div>

                      <div className="h-[1px] w-full bg-slate-100 my-2"></div>

                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#F27D26]">Gross Investment Estimate:</span>
                        <span className="font-mono text-slate-900 text-base">₹{results.estimatedInvestment.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-xs text-emerald-600 font-bold">
                        <span>Direct Gov. Subsidy Rebate:</span>
                        <span className="font-mono">- ₹{results.subsidy.toLocaleString()}</span>
                      </div>

                      {results.subsidy > 0 && (
                        <div className="pl-3 border-l border-emerald-200 text-[10px] text-slate-500 space-y-1 my-1 bg-emerald-50/30 p-2 rounded-lg">
                          <div className="flex justify-between">
                            <span>Central Govt. Subsidy (PM Surya Ghar):</span>
                            <span className="font-mono font-semibold text-emerald-700">₹{results.subsidyCentral?.toLocaleString() || "0"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>State Govt. Subsidy (Odisha):</span>
                            <span className="font-mono font-semibold text-emerald-700">₹{results.subsidyState?.toLocaleString() || "0"}</span>
                          </div>
                        </div>
                      )}

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center">
                        <div className="text-xs font-bold uppercase text-emerald-800">Net Capital Outlay:</div>
                        <div className="text-xl font-mono font-bold text-emerald-600">₹{results.netCost.toLocaleString()}</div>
                      </div>

                    </div>

                    {/* Financial return estimations */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block tracking-wider">SAVINGS & RETURNS</span>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Monthly Profit</span>
                          <span className="text-base font-bold font-mono text-slate-900">₹{results.monthlySavings.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Annual Profit</span>
                          <span className="text-base font-bold font-mono text-slate-900">₹{results.annualSavings.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="h-[1px] w-full bg-slate-200 my-2"></div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">25-Yr Net Yield</span>
                          <span className="text-base font-bold font-mono text-emerald-600">₹{results.savings25Years.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold">Payback Period</span>
                          <span className="text-base font-bold font-mono text-sky-600">{results.roiYears} Years</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 text-center flex justify-around items-center space-x-2 shadow-sm">
                        <div>🌳 {results.treesSaved} Trees Saved</div>
                        <div>☁️ {results.co2Saved} Tons CO2 Cut</div>
                      </div>

                    </div>

                  </div>

                  {/* 25-Year Trajectory Recharts Bar Chart */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">25-Year Cumulative Financial ROI Trajectory</h5>
                        <p className="text-[10px] text-slate-500">Dynamic break-even simulation based on 4.5% annual grid tariff inflation</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center text-[9px] font-bold text-slate-500">
                          <span className="w-2.5 h-2.5 bg-[#38BDF8] rounded-sm mr-1 block"></span> Savings
                        </span>
                        <span className="flex items-center text-[9px] font-bold text-slate-500">
                          <span className="w-2.5 h-2.5 bg-[#F27D26] rounded-sm mr-1 block"></span> Payback
                        </span>
                        <span className="flex items-center text-[9px] font-bold text-slate-500">
                          <span className="w-2.5 h-2.5 bg-[#10B981] rounded-sm mr-1 block"></span> Profit
                        </span>
                      </div>
                    </div>

                    <div className="h-64 w-full bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={Array.from({ length: 25 }, (_, i) => {
                            const year = i + 1;
                            let cumulativeSavings = 0;
                            for (let y = 0; y < year; y++) {
                              cumulativeSavings += results.annualSavings * Math.pow(1.045, y);
                            }
                            const cumulativeNetBenefit = cumulativeSavings - results.netCost;
                            return {
                              year: `Yr${year}`,
                              cumulativeSavings: Math.round(cumulativeSavings),
                              cumulativeNetBenefit: Math.round(cumulativeNetBenefit)
                            };
                          })}
                          margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="year" 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ fontSize: 8, fill: "#64748b", fontWeight: "bold" }} 
                          />
                          <YAxis 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                            tick={{ fontSize: 8, fill: "#64748b", fontFamily: "monospace" }} 
                          />
                          <Tooltip 
                            formatter={(value: any, name: string) => [
                              `₹${Number(value).toLocaleString()}`, 
                              name === "cumulativeSavings" ? "Cumulative Energy Savings" : "Net Wallet Balance (ROI)"
                            ]}
                            contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "10px" }}
                          />
                          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
                          <Bar dataKey="cumulativeSavings" fill="#38BDF8" opacity={0.65} radius={[2, 2, 0, 0]} />
                          <Bar dataKey="cumulativeNetBenefit" radius={[2, 2, 0, 0]}>
                            {Array.from({ length: 25 }).map((_, i) => {
                              const year = i + 1;
                              let cumulativeSavings = 0;
                              for (let y = 0; y < year; y++) {
                                cumulativeSavings += results.annualSavings * Math.pow(1.045, y);
                              }
                              const val = cumulativeSavings - results.netCost;
                              return (
                                <Cell 
                                  key={`cell-${i}`} 
                                  fill={val < 0 ? "#F27D26" : "#10B981"} 
                                />
                              );
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center text-[9px] bg-sky-50/50 p-2.5 rounded-xl border border-sky-100/50">
                      <div>
                        <span className="block text-slate-500 font-bold uppercase">Payback Target</span>
                        <span className="text-slate-700 font-semibold">Break-even at Year {Math.ceil(results.roiYears)} of operations</span>
                      </div>
                      <div>
                        <span className="block text-emerald-700 font-bold uppercase">25-Year Clean Profit</span>
                        <span className="text-emerald-600 font-black">₹{results.savings25Years.toLocaleString()} net lifetime yield</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                        alert("Quotation PDF generated! Downloading system specifications for " + results.recommendedCapacity + "kW Waaree-Tata Custom Installation.");
                      }}
                      className="px-6 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <FileDown size={14} />
                      <span>Download PDF Proposal</span>
                    </button>

                    <a 
                      href={`https://wa.me/919583390808?text=Hello%20Shree%20Adishakti%20Solar,%20I%20calculated%20solar%20ROI%20for%20my%20home%20in%20${city}.%20Recommended%20Capacity%20is%20${results.recommendedCapacity}kW%20with%20estimated%20savings%20of%20₹${results.monthlySavings}/month.%20Please%20call%20me!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-2 transition-all"
                    >
                      <Phone size={14} />
                      <span>Request WhatsApp Quote</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>

            {/* FORM: BOOK SITE SURVEY OR SUBMIT LEAD FOR VERIFICATION */}
            <div className="py-12 border-t border-slate-200 scroll-mt-20" id="survey-section">
              <div className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-[32px] border border-slate-200 shadow-lg">
                <div className="text-center space-y-2">
                  <span className="text-[#F27D26] text-[10px] uppercase tracking-[0.2em] font-bold block">Physical Engineering Feasibility</span>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-slate-900">BOOK DETAILED ON-SITE SURVEY</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Schedule our premium certified solar engineers to physically audit your roof space, concrete beams, electrical mains, and net-meter feasibility.
                  </p>
                </div>

                {surveyBooked ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
                    <CheckCircle className="mx-auto text-emerald-600 animate-bounce" size={36} />
                    <div className="space-y-1">
                      <span className="font-bold text-sm block uppercase text-emerald-800">Survey Successfully Booked!</span>
                      <p className="text-xs opacity-90 leading-relaxed text-emerald-700">
                        Thank you for trusting Shree Adishakti Solar Pvt. Ltd. Our senior engineers will call you within 2 business hours to coordinate physical arrival at your site.
                      </p>
                    </div>

                    {/* Dynamic Email Dispatch Status Notification box */}
                    {surveyEmailStatus && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/50">
                        {surveyEmailStatus.sent ? (
                          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-left space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-800 flex items-center">
                              <Mail size={12} className="mr-1.5 text-blue-600 animate-pulse" />
                              Email Notification Dispatched!
                            </span>
                            <p className="text-[10px] text-blue-700 leading-snug font-medium">
                              An automated premium HTML summary copy has been dispatched successfully to <strong>{process.env.NOTIFICATION_EMAIL || "your administrator inbox"}</strong>.
                            </p>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-left space-y-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 flex items-center">
                              <AlertTriangle size={12} className="mr-1.5 text-amber-600 animate-pulse" />
                              SMTP CONFIGURATION REQUIRED FOR EMAIL
                            </span>
                            <p className="text-[10px] text-amber-700 leading-snug">
                              Your survey request was saved in our secure local CRM database successfully, but the system could not dispatch the notification email because <strong>SMTP_PASS is not configured</strong> in AI Studio yet.
                            </p>
                            <div className="text-[9px] text-amber-800 bg-white/60 p-2.5 rounded-lg border border-amber-200/40 font-mono space-y-1 break-all">
                              <div className="font-bold uppercase tracking-wider text-[8px] text-amber-900 border-b border-amber-200/40 pb-1 mb-1">
                                Setup Instructions for pravatjenny@gmail.com:
                              </div>
                              <span className="block">1. Open AI Studio Settings Panel</span>
                              <span className="block">2. Go to "Environment Variables" section</span>
                              <span className="block">3. Define the following secret values:</span>
                              <span className="block" style={{ color: "#d97706" }}>• SMTP_HOST = smtp.gmail.com</span>
                              <span className="block" style={{ color: "#d97706" }}>• SMTP_PORT = 587</span>
                              <span className="block" style={{ color: "#d97706" }}>• SMTP_USER = your-gmail@gmail.com</span>
                              <span className="block" style={{ color: "#d97706" }}>• SMTP_PASS = your-gmail-app-password</span>
                              <span className="block" style={{ color: "#d97706" }}>• NOTIFICATION_EMAIL = pravatjenny@gmail.com</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSurveyBooked(false);
                          setSurveyEmailStatus(null);
                          setSurveyForm({ name: "", email: "", phone: "", city: "Bhubaneswar", address: "", preferredDate: "" });
                        }}
                        className="text-xs underline text-slate-800 font-bold cursor-pointer"
                      >
                        Book another site survey
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSurveySubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Your Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Pravat Kumar Jena"
                          value={surveyForm.name}
                          onChange={(e) => setSurveyForm({...surveyForm, name: e.target.value})}
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Mobile Phone</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="+91 94370 12345"
                          value={surveyForm.phone}
                          onChange={(e) => setSurveyForm({...surveyForm, phone: e.target.value})}
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="pravat@gmail.com"
                          value={surveyForm.email}
                          onChange={(e) => setSurveyForm({...surveyForm, email: e.target.value})}
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Preferred Date</label>
                        <input 
                          type="date" 
                          required
                          value={surveyForm.preferredDate}
                          onChange={(e) => setSurveyForm({...surveyForm, preferredDate: e.target.value})}
                          className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Odisha Town / City</label>
                      <select 
                        value={surveyForm.city}
                        onChange={(e) => setSurveyForm({...surveyForm, city: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                      >
                        <option>Bhubaneswar</option>
                        <option>Cuttack</option>
                        <option>Sambalpur</option>
                        <option>Rourkela</option>
                        <option>Berhampur</option>
                        <option>Balasore</option>
                        <option>Puri</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Site Full Address (Include Landmarks)</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="e.g. 472/1561, Lane 4, Basudev Nagar, Bhubaneswar, Odisha 751018"
                        value={surveyForm.address}
                        onChange={(e) => setSurveyForm({...surveyForm, address: e.target.value})}
                        className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3 bg-[#F27D26] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Confirm site survey booking
                    </button>
                    
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: BRANDS & PRODUCTS SHOWCASE */}
        {activeTab === "brands" && (
          <div className="space-y-16 text-slate-800">
            
            <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
              <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Manufacturer Alliances</span>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-slate-950">AUTHORIZED PREMIUM PARTNERS</h2>
              <p className="text-sm text-slate-600">
                Shree Adishakti installs exclusively certified, high-yield, Tier-1 solar modules, intelligent inverters, and safe battery storage packs.
              </p>
            </div>

            {/* Brands Carousel Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.keys(BRANDS).map((brandKey) => {
                const brand = BRANDS[brandKey];
                return (
                  <div key={brandKey} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 hover:border-[#F27D26]/30 hover:shadow-lg transition-all flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-black font-display tracking-widest text-[#F27D26]">{brand.logoText}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest">AUTHORIZED</span>
                      </div>
                      
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">{brand.name}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{brand.history}</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-400 uppercase">Warranty Offered</span>
                        <span className="text-emerald-600 text-right">{brand.warranty.split(",")[0]}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {brand.productCategories.map((cat, idx) => (
                          <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[8px] text-slate-600 font-mono uppercase font-bold">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Brand-Wise Pricing Comparison Table */}
            <div className="pt-8 pb-4 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[#F27D26] text-[10px] uppercase tracking-[0.2em] font-bold block">Official Domestic Solar Tariffs</span>
                <h3 className="text-xl font-bold uppercase tracking-wider text-slate-900 font-display">
                  BRAND-WISE SYSTEM PRICE MATRIX
                </h3>
                <p className="text-xs text-slate-600 max-w-xl mx-auto">
                  Complete authorized distributor pricing for standard domestic solar capacities in Odisha. These rates are fully structured with no hidden costs and include 100% of our layout design, structural engineering, liaison, and commissioning support.
                </p>
              </div>

              <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold tracking-widest text-[9px]">
                        <th className="py-4 px-5">Brand Partner</th>
                        <th className="py-4 px-5 border-l border-slate-200 text-center">2 kW System</th>
                        <th className="py-4 px-5 border-l border-slate-200 text-center">3 kW System</th>
                        <th className="py-4 px-5 border-l border-slate-200 text-center">5 kW System</th>
                        <th className="py-4 px-5 border-l border-slate-200 text-center">Key Warranty Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800 text-center">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block"></span>
                          <span>Tata Power Solar</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,75,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹2,25,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,55,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">25-Yr Linear Performance Guarantee</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 block"></span>
                          <span>Adani Solar</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,51,999</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹2,10,999</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,35,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">30-Yr N-Type TOPCon Product Lifetime</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 block"></span>
                          <span>Waaree Energies</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,51,999</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹2,10,999</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,35,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">27-Yr High-yield Bifacial Warranty</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                          <span>Eastman Solar</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,45,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,85,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,15,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">5-Yr Hassle-Free Tubular Replacement</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                          <span>UTL Solar</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,50,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,89,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,13,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">Heavy-duty Inverter and Gantry Warranty</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-5 font-bold text-left text-slate-900 flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
                          <span>Luminous</span>
                        </td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,50,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹1,99,999</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 font-mono text-slate-900 font-bold">₹3,13,000</td>
                        <td className="py-3.5 px-5 border-l border-slate-100 text-[10px] text-slate-500 font-sans">5-Yr Smart Pure-Sine Wave Warranty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Interactive Products Grid with Tech Specifications */}
            <div className="pt-12 border-t border-slate-200 space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-wider font-display text-center text-slate-900">
                TECHNICAL PRODUCT SPECIFICATIONS CATALOG
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PRODUCTS.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 flex flex-col md:flex-row shadow-sm">
                    <div className="w-full md:w-1/3 relative h-48 md:h-auto">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold text-[#F27D26]">
                        {prod.category}
                      </span>
                    </div>

                    <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono font-bold text-sky-600 uppercase block tracking-widest">
                          BY {prod.brand.toUpperCase()}
                        </span>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-950">{prod.name}</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{prod.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[9px] font-mono">
                        {Object.keys(prod.specs).map((specKey) => (
                          <div key={specKey} className="flex justify-between border-b border-slate-200 pb-1 last:border-0">
                            <span className="text-slate-500">{specKey}:</span>
                            <span className="text-slate-800 font-bold">{prod.specs[specKey]}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold pt-2">
                        <span className="text-slate-400">Warranty</span>
                        <span className="text-emerald-600">{prod.warranty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <div className="py-12 border-t border-slate-200">
              <h3 className="text-xl font-bold uppercase tracking-wider text-center font-display mb-8 text-slate-900">
                Frequently Answered Inquiries
              </h3>

              <div className="max-w-2xl mx-auto space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#F27D26]/30 transition-all shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F27D26] block mb-2 flex items-center">
                      <HelpCircle size={14} className="mr-1.5" />
                      {faq.q}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {faq.q === "How does the PM Surya Ghar Muft Bijli Yojana subsidy system work in Odisha?" ? (
                        <>
                          The subsidy is incredibly straightforward and directly credited to your bank account post-installation. Residential systems get <strong>₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum flat subsidy of ₹78,000</strong> for any system of 3 kW or larger. Shree Adishakti Solar Pvt. Ltd. handles 100% of the online registration, technical feasibility checks, discom approvals, and joint physical surveys so you don't have to fill out complex government portals.
                        </>
                      ) : faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3.5: COMPLETED PROJECTS & CUSTOMER SATISFACTION */}
        {activeTab === "gallery" && (
          <div className="space-y-16 text-slate-800">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block animate-pulse">
                Customer Satisfaction & Trust
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-slate-900 leading-none">
                VERIFIED INSTALLATIONS <br/>
                <span className="text-[#F27D26]">& CUSTOMER HAPPINESS</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                We design and build high-uptime solar plants across Odisha. Every single panel is fitted with extreme engineering care, guaranteed to withstand cyclones and deliver maximum free electricity under the <strong>PM SURYA SURYAGHAR YOJANA</strong>.
              </p>
            </div>

            {/* Metrics Dashboard Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 shadow-xl space-y-3 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Building size={120} />
                </div>
                <div className="w-10 h-10 bg-[#F27D26]/20 text-[#F27D26] rounded-xl flex items-center justify-center border border-[#F27D26]/30">
                  <Building size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Rooftops Energized</h4>
                  <p className="text-3xl font-black font-display tracking-tight text-white mt-1">180+ Sites</p>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Residential, industrial, and institutional solar plants running perfectly across Odisha since 2010.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 shadow-xl space-y-3 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Star size={120} />
                </div>
                <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center border border-amber-500/30">
                  <Star size={20} className="fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Customer Satisfaction</h4>
                  <p className="text-3xl font-black font-display tracking-tight text-white mt-1">4.96 / 5.0</p>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Based on 180+ verified audits and client testimonies. Our engineering standards speak for themselves.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 shadow-xl space-y-3 relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Shield size={120} />
                </div>
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Direct Subsidy Uptime</h4>
                  <p className="text-3xl font-black font-display tracking-tight text-white mt-1">100% Cleared</p>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Every consumer we assisted successfully received their PM Surya Ghar flat ₹78,000 subsidy.
                </p>
              </div>
            </div>

            {/* Filter Buttons & Portfolio Grid */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-4 gap-4">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                    Active Projects Explorer
                  </h3>
                  <p className="text-xs text-slate-500">Filter through our real-world completed setups and on-site engineering snaps</p>
                </div>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {["All", "Residential", "Commercial", "Industrial", "Under Construction"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setGalleryFilter(filter)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                        galleryFilter === filter 
                          ? "bg-[#F27D26] text-white shadow-md shadow-[#F27D26]/20" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {localProjects
                  .filter((p) => {
                    if (galleryFilter === "All") return true;
                    if (galleryFilter === "Under Construction") return p.category === "Under Construction";
                    return p.category === galleryFilter;
                  })
                  .map((project, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#F27D26]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm"
                    >
                      {/* Image part with high tech GPS overlay */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* NoteCam Style GPS Timestamp Certificate Overlay */}
                        {project.gps && (
                          <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 backdrop-blur-xs p-3 border-t border-white/10 text-white space-y-1 font-mono text-[9px]">
                            <div className="flex justify-between items-center text-[#F27D26] font-bold border-b border-white/5 pb-1 mb-1 uppercase tracking-wider">
                              <span>🌐 SHREE ADISHAKTI VERIFIED SITE</span>
                              <span className="text-emerald-400">● LIVE</span>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-300">
                              <span className="truncate">📍 {project.gps.split(",")[0]}</span>
                              <span className="truncate">{project.gps.split(",")[1]}</span>
                              <span>📅 Date: {project.date}</span>
                              <span className="text-emerald-400 font-bold">⚡ Cap: {project.capacity}</span>
                            </div>
                            {project.clientName && (
                              <div className="text-[8px] text-slate-400 uppercase tracking-widest mt-1 border-t border-white/5 pt-1">
                                Client: <strong className="text-white">{project.clientName}</strong>
                              </div>
                            )}
                          </div>
                        )}

                        <span className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold text-[#F27D26] border border-white/10">
                          {project.category}
                        </span>
                      </div>

                      {/* Content details and Customer Review section */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                            📍 {project.location}
                          </span>
                          <h4 className="text-base font-bold uppercase tracking-tight text-slate-950 leading-tight">
                            {project.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {project.desc}
                          </p>
                        </div>

                        {/* Customer Testimony Sub-card */}
                        {project.feedback && (
                          <div className="bg-orange-50/40 rounded-2xl p-4 border border-orange-100/50 space-y-2 relative">
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-0.5">
                                {[...Array(project.rating || 5)].map((_, i) => (
                                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[8px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                                Verified
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed italic">
                              "{project.feedback}"
                            </p>
                            {project.clientName && (
                              <span className="text-[10px] font-bold text-slate-800 block text-right">
                                — {project.clientName}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer check-off */}
                      <div className="px-6 pb-6 pt-2">
                        <div className="h-[1px] w-full bg-slate-100 mb-4"></div>
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                          <span>Structure Type</span>
                          <span className="text-[#0056B3]">
                            Hot-Dip Galvanized Gantry
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>
            </div>

            {/* Interactive "Attach Your Image & Add Review" Form Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-4xl mx-auto space-y-8 shadow-sm">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[#F27D26] text-xs uppercase tracking-[0.2em] font-bold block">
                  Add Your Project
                </span>
                <h3 className="text-2xl font-black font-display uppercase tracking-tight text-slate-900">
                  SHREE ADISHAKTI CLIENT DESK
                </h3>
                <p className="text-xs text-slate-500">
                  Are you an existing customer? Have you completed a solar project with us? Submit your system image, coordinates, and feedback to display your verified savings certificate!
                </p>
              </div>

              {/* Form Status Messages */}
              {formStatus === "success" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3 text-emerald-800 text-xs leading-relaxed">
                  <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold uppercase tracking-wider block mb-1">Project Submitted Successfully!</strong>
                    Thank you! Your completed project details have been verified, fitted with auto-coordinates, and successfully published to the main portfolio registry. It is now live on the homepage as well!
                  </div>
                </div>
              )}

              {formErrorMsg && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 text-rose-800 text-xs leading-relaxed">
                  <X size={18} className="text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <strong className="font-bold uppercase tracking-wider block mb-1">Submission Failed</strong>
                    {formErrorMsg}
                  </div>
                </div>
              )}

              {/* Active Form */}
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramakrushna Mohanty"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-lg focus:border-[#F27D26] outline-none font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                      Project Location / City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tankapani Road, Bhubaneswar, Odisha"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-lg focus:border-[#F27D26] outline-none font-semibold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                        System Capacity
                      </label>
                      <select
                        value={newReviewCapacity}
                        onChange={(e) => setNewReviewCapacity(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-lg focus:border-[#F27D26] outline-none font-semibold text-slate-800"
                      >
                        <option value="1 kW System">1 kW System</option>
                        <option value="2 kW System">2 kW System</option>
                        <option value="3 kW System">3 kW System</option>
                        <option value="3.3 kW System">3.3 kW System</option>
                        <option value="5 kW System">5 kW System</option>
                        <option value="10 kW System">10 kW System</option>
                        <option value="15 kW+ System">15 kW+ System</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={newReviewCategory}
                        onChange={(e) => setNewReviewCategory(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-lg focus:border-[#F27D26] outline-none font-semibold text-slate-800"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                      Rooftop Rating
                    </label>
                    <div className="flex items-center space-x-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            size={24}
                            className={`${
                              star <= (hoverRating !== null ? hoverRating : newReviewRating)
                                ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase ml-2">
                        {newReviewRating} Star Rating
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                      Your Review & Satisfaction Feedback
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share your experience with Shree Adishakti Solar! E.g. 'Very pleased with the elevated structure and overall coordination for the PM Surya Ghar subsidy...'"
                      value={newReviewFeedback}
                      onChange={(e) => setNewReviewFeedback(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-lg focus:border-[#F27D26] outline-none resize-none font-medium text-slate-700"
                    />
                  </div>

                  {/* Photo Uploader with Preview */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">
                      Attach Project Rooftop Image
                    </label>
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-8">
                        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#F27D26]/40 rounded-xl p-4 bg-white cursor-pointer transition-colors group">
                          <Upload size={18} className="text-slate-400 group-hover:text-[#F27D26] transition-colors mb-1.5" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide group-hover:text-slate-700">Choose File</span>
                          <span className="text-[8px] text-slate-400 mt-0.5">JPG or PNG (Max 5MB)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="col-span-4 flex items-center justify-center">
                        {newReviewImage ? (
                          <div className="relative w-16 h-16 rounded-xl border border-slate-200 overflow-hidden shadow-sm group">
                            <img src={newReviewImage} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setNewReviewImage(null)}
                              className="absolute top-1 right-1 bg-slate-950/80 hover:bg-slate-900 text-white rounded-full p-0.5"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-[8px] text-slate-400 uppercase tracking-widest font-bold text-center">
                            <span>No</span>
                            <span>Photo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#F27D26] to-[#0056B3] hover:from-[#e36e1c] hover:to-[#004799] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-md text-center"
                  >
                    🚀 Publish Verified Project
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

        {/* TAB 4: CUSTOMER PORTAL & TRACKER */}
        {activeTab === "portal" && (
          <div className="space-y-12 max-w-4xl mx-auto text-slate-800">
            
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Secure Client Access</span>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-slate-950">CUSTOMER PROJECT TRACKER</h2>
              <p className="text-sm text-slate-600">
                Log in with your Mobile number registered during site survey booking to track real-time feasibility and Discom feasibility status.
              </p>
            </div>

            {!isLoggedIn ? (
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 max-w-md mx-auto space-y-6 shadow-xl">
                <div className="text-center">
                  <span className="font-bold text-sm block uppercase tracking-wider text-slate-900">PROJECT LOGIN</span>
                  <p className="text-[11px] text-slate-500 block mt-1">
                    Demo: Enter any Mobile number (e.g. 94370 12345) to spin up a mock tracker dashboard!
                  </p>
                </div>

                <form onSubmit={handlePortalLogin} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Registered Phone</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 94370 12345"
                      value={portalPhone}
                      onChange={(e) => setPortalPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none animate-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Email Address (Optional)</label>
                    <input 
                      type="email"
                      placeholder="customer@gmail.com"
                      value={portalEmail}
                      onChange={(e) => setPortalEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#F27D26] hover:bg-[#ea580c] text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Retrieve Project Tracking Status
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8 bg-white p-6 md:p-10 rounded-[32px] border border-slate-200 shadow-xl">
                
                {/* Header info bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                      🟢 PROJECT ACTIVE
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-wide mt-3 text-slate-900">Welcome, {activeSurvey?.name || "Premium Client"}</h3>
                    <p className="text-xs text-slate-500 mt-1">Site Location: {activeSurvey?.address}, {activeSurvey?.city}</p>
                  </div>

                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="mt-4 md:mt-0 text-xs text-slate-500 hover:text-slate-800 underline font-bold cursor-pointer"
                  >
                    Logout from Portal
                  </button>
                </div>

                {/* TRACKER STEP-BY-STEP WORKFLOW METRICS */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                    Installation Progress Pipeline
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                    {[
                      { step: 1, title: "1. Site Audit", desc: "Engineers mapping structural weight load capability and angles." },
                      { step: 2, title: "2. CAD Drafting", desc: "Detailed engineering drawings prepared for solar design submission." },
                      { step: 3, title: "3. Discom Feasibility", desc: "Pending technical approval validation from TPCODL/Discom desk." },
                      { step: 4, title: "4. Installation Work", desc: " GI Framing anchorages and wiring module assemblies mounted." },
                      { step: 5, title: "5. Bidirectional commission", desc: "Net-meter verification completed, grid synchronization online." }
                    ].map((pipelineStep) => {
                      const isCompleted = (activeSurvey?.progressStep || 1) >= pipelineStep.step;
                      const isCurrent = (activeSurvey?.progressStep || 1) === pipelineStep.step;
                      
                      return (
                        <div 
                          key={pipelineStep.step}
                          className={`p-4 rounded-xl border transition-all ${
                            isCurrent ? "bg-blue-50 border-blue-400 text-blue-800" :
                            isCompleted ? "bg-emerald-50 border-emerald-300 text-emerald-800" :
                            "bg-slate-50 border-slate-200 text-slate-400"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-mono font-bold">
                              {isCompleted ? "✓ COMPLETE" : isCurrent ? "● ACTIVE WORK" : "PENDING"}
                            </span>
                            <span className="text-[11px] font-bold">{pipelineStep.step}/5</span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider block mb-1">{pipelineStep.title}</span>
                          <p className="text-[10px] leading-relaxed opacity-80 text-slate-600">{pipelineStep.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Technical System configuration cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Recommended Size</span>
                    <span className="text-base font-bold text-slate-950 block mt-1">{activeSurvey?.capacityQuote || "4.5"} kW System</span>
                    <span className="text-[10px] text-slate-400 block">Optimized for average billing load</span>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Hardware Specified</span>
                    <span className="text-base font-bold text-slate-950 block mt-1">{activeSurvey?.brandQuote || "Waaree"} Elite Arrays</span>
                    <span className="text-[10px] text-slate-400 block">Linear Performance warrantied</span>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Feasibility Status</span>
                    <span className="text-base font-bold text-sky-600 block mt-1">Pending Approval</span>
                    <span className="text-[10px] text-slate-400 block">Discom feasibility checking ongoing</span>
                  </div>
                </div>

                {/* Invoices and PDF proposal downloads */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-800 block">Client Document Desk</span>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-900 block">Adishakti_Signed_Contract.pdf</span>
                      <span className="text-[10px] text-slate-500 block">1.8 MB • Authorized Digital Signature</span>
                    </div>
                    <button 
                      onClick={() => alert("Downloading Contract Document. Verified and signed under digital stamp act.")}
                      className="mt-3 md:mt-0 text-[10px] uppercase bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded font-bold tracking-widest text-slate-700 cursor-pointer"
                    >
                      Download Signed Copy
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 5: PARTNER DESK / SIMULATED ADMIN CRM PANEL */}
        {activeTab === "admin" && (
          <div className="space-y-12 text-slate-800">
            
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[#F27D26] text-xs uppercase tracking-[0.3em] font-bold block">Internal Partner Portal</span>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-slate-950">PARTNER DESK CRM</h2>
              <p className="text-sm text-slate-600">
                View calculation leads and update customer survey steps in real-time. Manage global pricing parameters dynamically.
              </p>
            </div>

            {!isAdminLoggedIn ? (
              <div className="bg-white p-8 rounded-[32px] border border-slate-200 max-w-md mx-auto space-y-4 text-center shadow-xl">
                <span className="font-bold text-xs uppercase tracking-widest block text-slate-900">ADMIN AUTHENTICATION</span>
                <p className="text-[11px] text-slate-500">
                  Demo access password: <strong>admin123</strong>
                </p>
                <div className="space-y-2 text-left pt-2">
                  <input 
                    type="password" 
                    placeholder="Enter Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:border-[#F27D26] outline-none"
                  />
                  <button 
                    onClick={() => {
                      if (adminPassword === "admin123") {
                        setIsAdminLoggedIn(true);
                      } else {
                        alert("Invalid password! Demo password is: admin123");
                      }
                    }}
                    className="w-full py-3 bg-[#F27D26] text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Authenticate Partner Credentials
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                
                {/* Admin configuration panel */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-md">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600">Global Pricing Strategy Desk</h3>
                    <button 
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      Logout Admin
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold uppercase text-slate-700">
                        <span>Solar Base Rate Factor</span>
                        <span className="text-[#F27D26]">{Math.round(pricingMultiplier * 100)}% of Base</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.8" 
                        max="1.5" 
                        step="0.05"
                        value={pricingMultiplier}
                        onChange={(e) => setPricingMultiplier(Number(e.target.value))}
                        className="w-full accent-[#F27D26] h-1 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-500 italic">
                        Increasing this factor simulates market inflation (e.g. rising polysilicon panel costs). This scales calculator ROI outputs globally!
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-3 text-center gap-2">
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">Captured Leads</span>
                        <span className="text-xl font-bold font-mono text-slate-900">{leadsList.length + 3}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">Feasibility Bookings</span>
                        <span className="text-xl font-bold font-mono text-slate-900">{surveysList.length + 1}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block uppercase">Sync Status</span>
                        <span className="text-xs font-bold text-emerald-700 flex items-center justify-center">
                          <CheckCircle size={10} className="mr-1" /> ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Surveyfeasilbilty leads datatable */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-md">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 border-b border-slate-100 pb-3">
                    Active Feasibility Survey Requests
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs space-y-2">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Client</th>
                          <th className="py-2.5 px-3">City</th>
                          <th className="py-2.5 px-3">Quote Estimate</th>
                          <th className="py-2.5 px-3">Pipeline Step</th>
                          <th className="py-2.5 px-3 text-right">Update Step</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        
                        {/* Static Seed lead for demo */}
                        <tr className="hover:bg-slate-50 transition-all text-slate-800">
                          <td className="py-3 px-3 font-mono text-slate-500">2026-06-29</td>
                          <td className="py-3 px-3">
                            <span className="font-bold block">Pravat Kumar Jena</span>
                            <span className="text-[10px] text-slate-400">94370 12345</span>
                          </td>
                          <td className="py-3 px-3 font-bold">Bhubaneswar</td>
                          <td className="py-3 px-3 font-mono text-slate-700">4.5 kW (Waaree)</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 font-bold rounded text-[10px]">Step 3/5: Feasibility</span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button 
                              onClick={() => {
                                setEditingSurveyId("static_lead_1");
                                setEditingSurveyStep(3);
                              }}
                              className="text-[10px] bg-slate-100 px-2.5 py-1 rounded hover:bg-slate-200 uppercase tracking-widest font-bold text-slate-700 cursor-pointer"
                            >
                              Edit Progress
                            </button>
                          </td>
                        </tr>

                        {surveysList.map((survey) => (
                          <tr key={survey.id} className="hover:bg-slate-50 transition-all text-slate-800">
                            <td className="py-3 px-3 font-mono text-slate-500">
                              {survey.createdAt ? survey.createdAt.split("T")[0] : "2026-06-29"}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold block">{survey.name}</span>
                              <span className="text-[10px] text-slate-400">{survey.phone}</span>
                            </td>
                            <td className="py-3 px-3 font-bold">{survey.city}</td>
                            <td className="py-3 px-3 font-mono text-slate-700">
                              {survey.capacityQuote || 3} kW ({survey.brandQuote || "Tata"})
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold rounded text-[10px]">
                                Step {survey.progressStep || 1}/5
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              {editingSurveyId === survey.id ? (
                                <div className="flex space-x-1 justify-end items-center">
                                  <input 
                                    type="number" 
                                    min="1" 
                                    max="5"
                                    value={editingSurveyStep}
                                    onChange={(e) => setEditingSurveyStep(Number(e.target.value))}
                                    className="w-12 bg-white border border-slate-300 text-center p-1 rounded font-mono text-xs text-slate-800"
                                  />
                                  <button 
                                    onClick={() => updateSurveyStep(survey.id, editingSurveyStep)}
                                    className="px-2 py-1 bg-emerald-600 text-white rounded text-[9px] font-bold cursor-pointer"
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => {
                                    setEditingSurveyId(survey.id);
                                    setEditingSurveyStep(survey.progressStep || 1);
                                  }}
                                  className="text-[10px] bg-slate-100 px-2.5 py-1 rounded hover:bg-slate-200 uppercase tracking-widest font-bold text-slate-700 cursor-pointer"
                                >
                                  Edit Progress
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Submissions of leads lists */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-md">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 border-b border-slate-100 pb-3">
                    Captured Calculator Leads Database
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Lead Contact</th>
                          <th className="py-2 px-3">Parameters</th>
                          <th className="py-2 px-3">Calculated Output</th>
                          <th className="py-2 px-3">Estimated Investment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        
                        <tr className="hover:bg-slate-50 transition-all text-slate-800">
                          <td className="py-3 px-3 font-mono text-slate-500">2026-06-29</td>
                          <td className="py-3 px-3">
                            <span className="font-bold block">Debasish Mohanty</span>
                            <span className="text-[10px] text-slate-400">deb@gmail.com • 9861001234</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="block text-[11px] text-slate-700">Units: 550 kWh • Bill: ₹4,500</span>
                            <span className="text-[10px] text-slate-400">Type: Hybrid • Brand: Adani</span>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-sky-600">4.6 kWp</td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-600">₹3,54,200</td>
                        </tr>

                        {leadsList.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition-all text-slate-800">
                            <td className="py-3 px-3 font-mono text-slate-500">
                              {lead.createdAt ? lead.createdAt.split("T")[0] : "2026-06-29"}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold block">{lead.name}</span>
                              <span className="text-[10px] text-slate-400">{lead.email} • {lead.phone}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="block text-[11px] text-slate-700">Units: {lead.monthlyUnits} kWh • Bill: ₹{lead.electricityBill}</span>
                              <span className="text-[10px] text-slate-400">Type: {lead.solarType} • Brand: {lead.panelBrand}</span>
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-sky-600">{lead.recommendedCapacity} kWp</td>
                            <td className="py-3 px-3 font-mono font-bold text-emerald-600">₹{lead.estimatedInvestment?.toLocaleString() || "N/A"}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating Chat Assistant Sidebar/Drawer Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl relative z-50"
            >
              
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-tr from-[#F27D26] to-[#0056B3] rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Shree Adishakti AI</h4>
                    <span className="text-[9px] text-emerald-700 block font-bold tracking-widest">🟢 SOLAR CHAT GROUNDED</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-[#F27D26] text-white rounded-tr-none" 
                        : "bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-wrap"
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex items-center space-x-2 text-slate-500 text-xs bg-slate-100 border border-slate-200 p-3 rounded-xl max-w-[120px] rounded-tl-none">
                    <RefreshCw size={12} className="animate-spin text-slate-600" />
                    <span>AI is drafting...</span>
                  </div>
                )}
              </div>

              {/* Chat Quick suggestions */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[9px] uppercase tracking-wider font-bold text-slate-600">
                <button 
                  onClick={() => {
                    setChatInput("What is the government subsidy for 3 kW solar system?");
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 whitespace-nowrap cursor-pointer"
                >
                  3kW Subsidy
                </button>
                <button 
                  onClick={() => {
                    setChatInput("How does Net Metering work in Odisha?");
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 whitespace-nowrap cursor-pointer"
                >
                  Net Metering
                </button>
                <button 
                  onClick={() => {
                    setChatInput("Which brand is better: Tata Power or Waaree?");
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-slate-50 whitespace-nowrap cursor-pointer"
                >
                  Tata vs Waaree
                </button>
              </div>

              {/* Chat Input Footer */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-slate-50 flex space-x-3">
                <input 
                  type="text"
                  required
                  placeholder="Ask about PM Surya Ghar eligibility, warranties..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#F27D26]"
                />
                <button 
                  type="submit"
                  className="p-2.5 bg-[#F27D26] hover:bg-[#ea580c] text-white rounded-lg transition-all cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER Section - from Design mock */}
      <footer className="relative z-20 px-6 md:px-12 py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" textSize="lg" />
            <p className="text-xs text-slate-600 leading-relaxed font-semibold uppercase tracking-wider text-[#F27D26]">
              BRIGHT POWER FOR BETTER FUTURE
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Empowering Odisha under the <strong>PM SURYA GHAR YOJANA</strong> with premium bifacial & TOPCon solar technology.
            </p>
          </div>

          {/* Statistics Column */}
          <div className="md:col-span-4 grid grid-cols-3 gap-4 border-y md:border-y-0 md:border-x border-slate-200 py-6 md:py-0 md:px-8">
            <div className="flex flex-col justify-center text-center">
              <span className="text-[24px] font-black font-display text-[#F27D26]">180+</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Projects Installed</span>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-[24px] font-black font-display text-sky-600">100 kW</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Capacity Done</span>
            </div>
            <div className="flex flex-col justify-center text-center">
              <span className="text-[24px] font-black font-display text-emerald-600">98%</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Uptime Guaranteed</span>
            </div>
          </div>

          {/* Physical Address & Contact Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Corporate Office</span>
            
            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed font-medium">
                472/1561, Lane 4, Basudev Nagar, Basuaghai,<br />
                TANKAPANI ROAD, Near SAI TEMPLE, Bhubaneswar,<br />
                Khordha, Odisha 751018
              </p>
              
              <div className="flex flex-col space-y-1.5 pt-1 text-[11px]">
                <a href="tel:+919583390808" className="hover:text-[#F27D26] transition-colors flex items-center space-x-2 font-bold text-slate-800">
                  <span>📞</span> <span>+91 95833 90808</span>
                </a>
                <a href="mailto:info.sassolar@gmail.com" className="hover:text-[#F27D26] transition-colors flex items-center space-x-2 font-bold text-slate-800">
                  <span>✉</span> <span>info.sassolar@gmail.com</span>
                </a>
                <a href="https://www.shreeadishaktisolar.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F27D26] transition-colors flex items-center space-x-2 font-bold text-slate-800">
                  <span>🌐</span> <span>www.shreeadishaktisolar.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Associated Brands logos from Design mock */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 mt-6 border-t border-slate-200 gap-4 text-[9px] uppercase tracking-wider text-slate-400 font-bold">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-slate-800 transition-colors">TATA POWER SOLAR</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors">WAAREE ENERGIES</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors text-[#F27D26]">ADANI SOLAR</span>
          </div>
          <span>© 2026 Shree Adishakti Solar Pvt. Ltd. Bhubaneswar, Odisha. All rights reserved.</span>
        </div>
      </footer>

      {/* Floating Fast Action Contact Dock */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        {/* Instagram Tooltip & Button */}
        <div className="flex items-center group">
          <span className="mr-2 px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider font-mono">
            Instagram
          </span>
          <a
            href="https://www.instagram.com/shreeadishaktisolar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-purple-600 to-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 hover:rotate-6"
            title="Follow us on Instagram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>

        {/* WhatsApp Tooltip & Button */}
        <div className="flex items-center group">
          <span className="mr-2 px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider font-mono">
            WhatsApp Chat
          </span>
          <a
            href="https://wa.me/919583390808?text=Hello%20Shree%20Adi%20Shakti%20Solar%2C%20I%20am%20interested%20in%20a%20solar%20rooftop%20installation%20and%20would%20like%20to%20get%20more%20information."
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 hover:-rotate-6 relative"
            title="Chat on WhatsApp"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
            <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.452.99 6.014.99 1.593 5.36 1.59 10.792c-.001 1.761.474 3.481 1.376 4.982L1.948 21.9l6.3-1.636c-1.459.79-2.223.511-1.601-.11zM15.93 14.15c-.237-.117-1.4-.689-1.616-.767-.216-.078-.373-.117-.53.117s-.607.767-.745.925c-.137.157-.275.177-.511.06-.237-.117-.999-.368-1.902-1.171-.703-.627-1.177-1.4-1.315-1.636-.137-.236-.015-.363.104-.48.107-.107.237-.275.355-.412.118-.137.157-.236.237-.393.078-.157.039-.295-.02-.412s-.53-1.277-.726-1.748c-.19-.459-.384-.396-.53-.404-.135-.007-.29-.009-.445-.009s-.408.059-.62.29c-.212.231-.81.792-.81 1.932s.83 2.24 1.004 2.47c.174.23 1.63 2.49 3.95 3.49.552.23 1.037.382 1.391.495.555.176 1.059.151 1.457.091.444-.067 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12s-.222-.16-.46-.277z"/>
            </svg>
          </a>
        </div>

        {/* Phone Call Tooltip & Button */}
        <div className="flex items-center group">
          <span className="mr-2 px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider font-mono">
            Direct Call Support
          </span>
          <a
            href="tel:+919583390808"
            className="w-12 h-12 rounded-full bg-[#F27D26] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 duration-200 hover:rotate-12"
            title="Call +91 95833 90808"
          >
            <Phone size={20} className="stroke-[2.5]" />
          </a>
        </div>
      </div>

    </div>
  );
}
