/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
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
export const db = getFirestore(app, config.firestoreDatabaseId || "(default)");

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
