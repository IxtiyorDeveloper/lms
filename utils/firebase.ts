import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";
import { getFirestore } from "@firebase/firestore";
import env from "./env";
export const firebase_app =
  getApps().length === 0
    ? initializeApp(JSON.parse(env.firebase))
    : getApps()[0];
export const database = getDatabase(firebase_app);
export const firestore = getFirestore(firebase_app);
