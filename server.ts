import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Send professional HTML email notification when a site survey is booked
async function sendSurveyEmail(survey: any) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER || "info.sassolar@gmail.com";
  const pass = process.env.SMTP_PASS;
  const toEmail = process.env.NOTIFICATION_EMAIL || "info.sassolar@gmail.com";

  if (!pass) {
    console.log("------------------------------------------------------------------");
    console.warn("SMTP_PASS is not defined. Skipping site survey email notification.");
    console.log(`To enable email notifications, configure your environment variables in AI Studio settings:`);
    console.log(`SMTP_HOST=smtp.gmail.com`);
    console.log(`SMTP_PORT=587`);
    console.log(`SMTP_USER=your-gmail-or-email@domain.com`);
    console.log(`SMTP_PASS=your-app-password`);
    console.log(`NOTIFICATION_EMAIL=info.sassolar@gmail.com`);
    console.log("------------------------------------------------------------------");
    throw new Error("SMTP_PASS is not defined in environment variables");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"Shree Adishakti Solar" <${user}>`,
    to: toEmail,
    subject: `☀️ NEW SITE SURVEY BOOKED: ${survey.name} (${survey.capacityQuote || "N/A"}kW)`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 25px; border-radius: 10px 10px 0 0; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">
            Shree Adishakti <span style="color: #F27D26;">Solar</span>
          </h1>
          <p style="margin: 5px 0 0 0; font-size: 11px; opacity: 0.8; letter-spacing: 2px; text-transform: uppercase; font-family: monospace;">
            PVT. LTD. — BHUBANESWAR
          </p>
          <div style="margin-top: 15px; display: inline-block; background-color: rgba(242, 125, 38, 0.2); border: 1px solid #F27D26; color: #ffedd5; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            ☀️ NEW SITE SURVEY REQUEST
          </div>
        </div>

        <div style="padding: 24px; color: #334155;">
          <p style="font-size: 15px; line-height: 1.6; margin-top: 0;">
            Hello Admin,
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            A new physical site survey request has been successfully booked through the online portal. Below are the complete technical and contact details:
          </p>

          <!-- Contact Information Card -->
          <div style="margin: 20px 0; background-color: #f8fafc; border-left: 4px solid #F27D26; padding: 16px; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #0f172a;">
              👤 Customer Details
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #64748b; width: 150px;">Name:</td>
                <td style="padding: 5px 0; color: #0f172a;">${survey.name}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
                <td style="padding: 5px 0; color: #0f172a; font-weight: bold;">
                  <a href="tel:${survey.phone}" style="color: #0056B3; text-decoration: none;">${survey.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 5px 0; color: #0f172a;">
                  <a href="mailto:${survey.email}" style="color: #0056B3; text-decoration: none;">${survey.email || "N/A"}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #64748b;">Preferred Date:</td>
                <td style="padding: 5px 0; color: #d97706; font-weight: bold;">${survey.preferredDate || "Not Specified"}</td>
              </tr>
            </table>
          </div>

          <!-- Technical Quote Card -->
          <div style="margin: 20px 0; background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #14532d;">
              ⚡ Proposed Technical Specs
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #15803d; width: 150px;">Req. Capacity:</td>
                <td style="padding: 5px 0; color: #14532d; font-weight: bold;">${survey.capacityQuote || "N/A"} kW</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #15803d;">Preferred Brand:</td>
                <td style="padding: 5px 0; color: #14532d; font-weight: bold;">${survey.brandQuote || "Any Premium Brand"}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #15803d;">Notes / Type:</td>
                <td style="padding: 5px 0; color: #334155; font-style: italic;">${survey.notes || "N/A"}</td>
              </tr>
            </table>
          </div>

          <!-- Installation Address Card -->
          <div style="margin: 20px 0; background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 16px; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #0c4a6e;">
              📍 Site Location
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #0369a1; width: 150px;">City/District:</td>
                <td style="padding: 5px 0; color: #0c4a6e; font-weight: bold;">${survey.city || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; font-weight: bold; color: #0369a1; vertical-align: top;">Full Address:</td>
                <td style="padding: 5px 0; color: #334155; line-height: 1.4;">${survey.address}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="https://wa.me/${survey.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 30px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2); transition: all 0.2s;">
              💬 Chat with Customer on WhatsApp
            </a>
          </div>
        </div>

        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
          <p style="margin: 0;">
            This notification was automatically sent from the Shree Adishakti Solar Portal.
          </p>
          <p style="margin: 4px 0 0 0;">
            © 2026 Shree Adishakti Solar Pvt. Ltd. Bhubaneswar, Odisha. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Booking email notification sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending booking email notification:", error);
  }
}

const app = express();
const PORT = 3000;

// Increase body parser limits to support base64 project image uploads up to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Initialize Gemini SDK lazily
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Chat will run in local backup mode.");
    }
    ai = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

// In-memory / file-based storage for persistence inside the container
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SURVEYS_FILE = path.join(DATA_DIR, "surveys.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");

function readJsonFile<T>(filePath: string, defaultVal: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

function writeJsonFile<T>(filePath: string, data: T) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Routes for Leads and Site Surveys
app.post("/api/leads", (req, res) => {
  const leads = readJsonFile<any[]>(LEADS_FILE, []);
  const newLead = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Pending Contact",
    ...req.body,
  };
  leads.push(newLead);
  writeJsonFile(LEADS_FILE, leads);
  res.status(201).json({ success: true, lead: newLead });
});

app.get("/api/leads", (req, res) => {
  const leads = readJsonFile<any[]>(LEADS_FILE, []);
  res.json(leads);
});

app.post("/api/surveys", async (req, res) => {
  const surveys = readJsonFile<any[]>(SURVEYS_FILE, []);
  const newSurvey = {
    id: `survey_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Scheduled",
    progressStep: 1, // 1: Survey Scheduled, 2: Structural Audit, 3: Approval Pending, 4: Installing, 5: Commissioned
    ...req.body,
  };
  surveys.push(newSurvey);
  writeJsonFile(SURVEYS_FILE, surveys);
  
  let emailSent = false;
  let emailError = null;

  try {
    await sendSurveyEmail(newSurvey);
    emailSent = true;
  } catch (err: any) {
    emailError = err.message || String(err);
    console.error("Survey email dispatch failed:", emailError);
  }

  res.status(201).json({ 
    success: true, 
    survey: newSurvey, 
    emailSent, 
    emailError 
  });
});

app.get("/api/surveys", (req, res) => {
  const surveys = readJsonFile<any[]>(SURVEYS_FILE, []);
  res.json(surveys);
});

// Custom User Rooftop Projects / Reviews database endpoints
app.get("/api/projects", (req, res) => {
  const projects = readJsonFile<any[]>(PROJECTS_FILE, []);
  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const projects = readJsonFile<any[]>(PROJECTS_FILE, []);
  const newProject = {
    id: `project_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  projects.push(newProject);
  writeJsonFile(PROJECTS_FILE, projects);
  res.status(201).json({ success: true, project: newProject });
});

// Update lead or survey status (Simulated CRM / Admin Panel)
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const leads = readJsonFile<any[]>(LEADS_FILE, []);
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...req.body };
    writeJsonFile(LEADS_FILE, leads);
    return res.json({ success: true, lead: leads[index] });
  }
  res.status(404).json({ error: "Lead not found" });
});

app.patch("/api/surveys/:id", (req, res) => {
  const { id } = req.params;
  const surveys = readJsonFile<any[]>(SURVEYS_FILE, []);
  const index = surveys.findIndex((s) => s.id === id);
  if (index !== -1) {
    surveys[index] = { ...surveys[index], ...req.body };
    writeJsonFile(SURVEYS_FILE, surveys);
    return res.json({ success: true, survey: surveys[index] });
  }
  res.status(404).json({ error: "Survey not found" });
});

// Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  try {
    const client = getGeminiClient();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return beautiful mock responses related to Shree Adishakti Solar if no key is present
      const lowercaseMsg = message.toLowerCase();
      let responseText = "Thank you for reaching out to Shree Adishakti Solar! I'm your digital Solar Assistant. Since the server is running in offline sandbox mode, I'm happy to tell you that Shree Adishakti Solar Pvt. Ltd. is Odisha's premium solar EPC company. We specialize in Residential, Commercial, and Industrial solar setups with Tier-1 brands like Tata, Waaree, and Adani. How can I assist you with your green energy transition today?";

      if (lowercaseMsg.includes("subsidy") || lowercaseMsg.includes("pmsuryaghar") || lowercaseMsg.includes("government")) {
        responseText = "Under the PM Surya Ghar Muft Bijli Yojana, residential projects are eligible for significant subsidies:\n- 1 kW: ₹30,000 subsidy\n- 2 kW: ₹60,000 subsidy\n- 3 kW or higher: ₹78,000 (maximum capped subsidy).\nShree Adishakti Solar Pvt. Ltd. handles the entire end-to-end subsidy application, approval, and net metering processes for you!";
      } else if (lowercaseMsg.includes("price") || lowercaseMsg.includes("cost") || lowercaseMsg.includes("calculator")) {
        responseText = "Our solar systems range from ₹55,000 to ₹75,000 per kW depending on the specific configurations, inverter type (On-grid/Hybrid/Off-grid), and choice of brands (Waaree, Adani, or Tata Solar). Would you like to check out our interactive Solar Calculator tab on this page to get a full customized estimate and financial report instantly?";
      } else if (lowercaseMsg.includes("brand") || lowercaseMsg.includes("panel")) {
        responseText = "We proudly install top-tier premium solar brands:\n1. **Tata Power Solar**: Highly robust panels and extensive Indian track record.\n2. **Waaree**: India's largest manufacturer, providing premium bifacial and mono-PERC panels.\n3. **Adani Solar**: Ultra-high efficiency and premium performance under low-light conditions.\nAll panels come with an extensive 25-year performance warranty.";
      } else if (lowercaseMsg.includes("contact") || lowercaseMsg.includes("phone") || lowercaseMsg.includes("location") || lowercaseMsg.includes("address")) {
        responseText = "Our headquarters is located in Bhubaneswar, Odisha. You can reach out directly via Phone (+91 94370 12345) or email (info@adishaktisolar.com). You can also click the 'Book Site Survey' button to schedule a physical or digital assessment!";
      }

      return res.json({ text: responseText });
    }

    // Configure system instruction to ground the model as the helper for Shree Adishakti Solar
    const systemInstruction = `
      You are the official premium Solar AI Assistant for "Shree Adishakti Solar Pvt. Ltd.", Odisha's premier solar energy EPC provider.
      Your goal is to answer visitor questions clearly, professionally, and enthusiastically to help them transition to clean energy.
      Keep answers concise and beautifully structured. Inform them about:
      - Residential, commercial, and industrial solar installations.
      - Supported premium brands: Waaree, Tata Power Solar, Adani Solar, Luminous, Eastman, Exide.
      - Financial and operational benefits: Net metering, spin-back meter, zero electricity bills.
      - PM Surya Ghar Muft Bijli Yojana: Subsidy values (1kW = ₹30k, 2kW = ₹60k, 3kW+ = ₹78k).
      - Maintenance, 25-year panel warranty, loan and EMI assistance.
      Keep the tone futuristic, helpful, premium, and friendly.
    `;

    // Format chat history correctly for @google/genai SDK
    const formattedContents = history ? history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }]
    })) : [];

    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Solar AI.", details: error.message });
  }
});

// Setup Vite Dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
