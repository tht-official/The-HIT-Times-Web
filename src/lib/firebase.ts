import admin from "firebase-admin";

if (!admin.apps.length) {
  let projectId = process.env.FIREBASE_PROJECT_ID;
  let clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  // Fallback to local firebaseConfig file if env vars are missing
  if (!projectId || !clientEmail || !privateKey) {
    try {
      const firebaseConfig = require("./firebaseConfig").default;
      projectId = projectId || firebaseConfig.project_id;
      clientEmail = clientEmail || firebaseConfig.client_email;
      privateKey = privateKey || firebaseConfig.private_key;
    } catch (e) {
      // The firebaseConfig file is gitignored and might not exist, which is fine
    }
  }

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      if (!/already exists/.test(message)) {
        console.error("Firebase admin initialization error:", error);
      }
    }
  }
}

export default admin;
