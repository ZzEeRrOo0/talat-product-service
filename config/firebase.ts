import * as admin from "firebase-admin";
import path from "path";
import firebaseAdminJson from "../talat-admin-cert.json"

admin.initializeApp({
	credential: admin.credential.cert(
		path.resolve(__dirname, "../talat-admin-cert.json")
	),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();

export { admin, db };
