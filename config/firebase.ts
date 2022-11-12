import * as admin from "firebase-admin";
import path from "path";

admin.initializeApp({
	credential: admin.credential.cert(
		path.resolve(__dirname, "../talat-admin-cert.json")
	),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();

export { admin, db };
