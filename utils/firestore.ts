import admin          from "firebase-admin"
import { credential } from "../config/firebase"

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(credential),
        })
    } catch (error) {
        console.error("Firebase admin initialization error", error)
    }
}

export default admin.firestore()
