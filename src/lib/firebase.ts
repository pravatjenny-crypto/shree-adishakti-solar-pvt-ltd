/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import config from "../../firebase-applet-config.json";

// Initialize Firebase using the provisioned config
const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

export const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom databaseId provided in config
export const db = getFirestore(app, (config as any).firestoreDatabaseId || "(default)");

// Initialize Storage
export const storage = getStorage(app);

/**
 * Compresses base64 images if they are too large for Firestore (max document size 1MB)
 */
function compressBase64(base64Str: string, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    if (!base64Str.startsWith("data:image")) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
}

/**
 * Uploads an image to Firebase Storage if possible, falls back to direct base64
 */
export async function uploadImage(base64Image: string, prefix = "rooftop"): Promise<string> {
  if (!base64Image || !base64Image.startsWith("data:image")) {
    return base64Image;
  }

  try {
    const uniqueName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
    const storageRef = ref(storage, `projects/${uniqueName}`);
    
    // Upload base64 string directly
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err) {
    console.warn("Firebase Storage upload failed/not enabled, compressing and falling back to direct Firestore base64:", err);
    // Compress base64 to fit comfortably under Firestore's 1MB document limit
    return await compressBase64(base64Image, 600, 600, 0.6);
  }
}

export interface ProjectData {
  title: string;
  category: string;
  location: string;
  image: string;
  desc: string;
  clientName: string;
  gps: string;
  date: string;
  capacity: string;
  rating: number;
  feedback: string;
}

/**
 * Saves a project record to Firestore
 */
export async function saveProjectToFirebase(project: ProjectData): Promise<any> {
  try {
    let finalImage = project.image;
    if (project.image && project.image.startsWith("data:image")) {
      finalImage = await uploadImage(project.image, "rooftop");
    }

    const docData = {
      title: project.title,
      category: project.category,
      location: project.location,
      image: finalImage,
      desc: project.desc,
      clientName: project.clientName,
      gps: project.gps,
      date: project.date || new Date().toLocaleDateString("en-GB"),
      capacity: project.capacity,
      rating: project.rating || 5,
      feedback: project.feedback,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "projects"), docData);
    return { id: docRef.id, ...docData };
  } catch (err: any) {
    console.error("Error saving project to Firebase Firestore:", err);
    throw new Error(`Failed to save project/feedback to Firestore: ${err.message || String(err)}`);
  }
}

/**
 * Fetches all custom projects from Firestore
 */
export async function fetchProjectsFromFirebase(): Promise<any[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const projects: any[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        createdAt: data.createdAt,
        title: data.title || `${data.capacity || "3 kW"} Solar Installation`,
        category: data.category || "Residential",
        location: data.location || "Odisha, India",
        image: data.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        desc: data.desc || "High-durability solar array installation completed under PM Surya Ghar Yojana.",
        clientName: data.clientName || "Verified Customer",
        gps: data.gps || "Verified Location",
        date: data.date || new Date(data.createdAt || Date.now()).toLocaleDateString("en-GB"),
        capacity: data.capacity || "3 kW System",
        rating: data.rating || 5,
        feedback: data.feedback || "Excellent solar setup!"
      });
    });

    return projects;
  } catch (err) {
    console.error("Error fetching projects from Firebase Firestore:", err);
    return [];
  }
}

// Initialize Auth
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Google Sheets scope to read/write spreadsheets
provider.addScope("https://www.googleapis.com/auth/spreadsheets");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get access token from Firebase Auth");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Google Sheets Sync function
export async function syncToGoogleSheet(
  surveys: any[],
  leads: any[],
  accessToken: string
): Promise<{ success: boolean; spreadsheetId?: string; spreadsheetUrl?: string; error?: string }> {
  try {
    let spreadsheetId = localStorage.getItem("sas_google_spreadsheet_id");

    if (spreadsheetId) {
      // Validate spreadsheet existence by making a light metadata call
      const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!verifyRes.ok) {
        console.warn("Stored spreadsheet ID not valid/found. Creating a new one...");
        spreadsheetId = null;
      }
    }

    if (!spreadsheetId) {
      // Create a beautiful spreadsheet containing separate sheets for Surveys and Leads
      const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          properties: {
            title: "Shree Adishakti Solar - Portal Bookings"
          },
          sheets: [
            {
              properties: {
                title: "Feasibility Surveys",
                gridProperties: { frozenRowCount: 1 }
              }
            },
            {
              properties: {
                title: "Calculator Leads",
                gridProperties: { frozenRowCount: 1 }
              }
            }
          ]
        })
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create Google Sheet: ${createRes.statusText}`);
      }

      const sheetData = await createRes.json();
      spreadsheetId = sheetData.spreadsheetId;
      if (spreadsheetId) {
        localStorage.setItem("sas_google_spreadsheet_id", spreadsheetId);
      } else {
        throw new Error("No spreadsheetId returned from Sheets API");
      }
    }

    // Prepare data rows
    const surveyRows = [
      [
        "Date Booked",
        "Client Name",
        "Phone Number",
        "Email Address",
        "City",
        "Address",
        "Capacity (kW)",
        "Preferred Brand",
        "Pipeline Step",
        "Status",
        "Additional Notes"
      ],
      ...surveys.map((s) => [
        s.createdAt ? s.createdAt.split("T")[0] : "",
        s.name || "",
        s.phone || "",
        s.email || "",
        s.city || "",
        s.address || "",
        s.capacityQuote || "3",
        s.brandQuote || "Tata Power Solar",
        `Step ${s.progressStep || 1}/5`,
        s.status || "Scheduled",
        s.notes || ""
      ])
    ];

    const leadRows = [
      [
        "Date Submitted",
        "Lead Contact Name",
        "Email Address",
        "Phone Number",
        "Monthly Units (kWh)",
        "Monthly Bill (₹)",
        "Recommended Capacity (kWp)",
        "Estimated Cost (₹)",
        "Brand Selection",
        "System Setup Type",
        "Status"
      ],
      ...leads.map((l) => [
        l.createdAt ? l.createdAt.split("T")[0] : "",
        l.name || "",
        l.email || "",
        l.phone || "",
        l.monthlyUnits || "",
        l.electricityBill || "",
        l.recommendedCapacity || "",
        l.estimatedCost || l.estimatedInvestment || "",
        l.brandPreference || "",
        l.systemType || "",
        l.status || "Pending Contact"
      ])
    ];

    // Write to both sheets in the spreadsheet
    const writeData = async (range: string, values: any[][]) => {
      const res = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            range,
            majorDimension: "ROWS",
            values
          })
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to update range ${range}: ${res.statusText}`);
      }
    };

    // Update both tables (ensure sheets are properly filled)
    await writeData("'Feasibility Surveys'!A1:K" + surveyRows.length, surveyRows);
    await writeData("'Calculator Leads'!A1:K" + leadRows.length, leadRows);

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
    };
  } catch (error: any) {
    console.error("Google Sheets sync failed:", error);
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}

/**
 * Saves a lead record to Firestore
 */
export async function saveLeadToFirebase(lead: any): Promise<any> {
  try {
    const docData = {
      ...lead,
      createdAt: lead.createdAt || new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "leads"), docData);
    return { id: docRef.id, ...docData };
  } catch (err: any) {
    console.error("Error saving lead to Firebase:", err);
    throw err;
  }
}

/**
 * Fetches all leads from Firestore
 */
export async function fetchLeadsFromFirebase(): Promise<any[]> {
  try {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const leads: any[] = [];
    querySnapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() });
    });
    return leads;
  } catch (err) {
    console.error("Error fetching leads from Firebase:", err);
    return [];
  }
}

/**
 * Saves a survey record to Firestore
 */
export async function saveSurveyToFirebase(survey: any): Promise<any> {
  try {
    const docData = {
      ...survey,
      progressStep: survey.progressStep || 1,
      status: survey.status || "Scheduled",
      createdAt: survey.createdAt || new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "surveys"), docData);
    return { id: docRef.id, ...docData };
  } catch (err: any) {
    console.error("Error saving survey to Firebase:", err);
    throw err;
  }
}

/**
 * Fetches all surveys from Firestore
 */
export async function fetchSurveysFromFirebase(): Promise<any[]> {
  try {
    const q = query(collection(db, "surveys"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const surveys: any[] = [];
    querySnapshot.forEach((doc) => {
      surveys.push({ id: doc.id, ...doc.data() });
    });
    return surveys;
  } catch (err) {
    console.error("Error fetching surveys from Firebase:", err);
    return [];
  }
}

/**
 * Updates a survey's progress step in Firestore
 */
export async function updateSurveyStepInFirebase(id: string, step: number): Promise<boolean> {
  try {
    const docRef = doc(db, "surveys", id);
    await updateDoc(docRef, { progressStep: step });
    return true;
  } catch (err) {
    console.error("Error updating survey step in Firebase:", err);
    return false;
  }
}

