export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  electricityBill: number;
  monthlyUnits: number;
  roofArea: number;
  roofType: string;
  electricityBoard: string;
  solarType: "On Grid" | "Hybrid" | "Off Grid";
  panelBrand: string;
  batteryRequired: boolean;
  backupHours?: number;
  status: string;
  createdAt: string;
  // Calculator outputs for dynamic proposals
  recommendedCapacity: number;
  numPanels: number;
  requiredArea: number;
  batterySize?: number;
  estimatedInvestment: number;
  subsidy: number;
  netCost: number;
  monthlySavings: number;
  annualSavings: number;
  savings25Years: number;
  roiYears: number;
  co2Saved: number;
  treesSaved: number;
}

export interface Survey {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  preferredDate: string;
  status: string;
  progressStep: number; // 1 to 5 representing structural review -> commissioning
  createdAt: string;
  capacityQuote?: number;
  brandQuote?: string;
  notes?: string;
}

export interface Product {
  id: string;
  category: "Solar Panels" | "Inverters" | "Batteries" | "Ecosystem";
  name: string;
  brand: string;
  tagline: string;
  description: string;
  warranty: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
}

export interface BrandDetails {
  name: string;
  logoText: string;
  history: string;
  productCategories: string[];
  warranty: string;
  datasheetUrl?: string;
  videoTitle?: string;
  videoDesc?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}
