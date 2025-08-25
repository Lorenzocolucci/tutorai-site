// src/utils/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Le tue credenziali di configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfKilUIbpjtEcXg8FkXm9lQksMAu2wdLA",
  authDomain: "tutorai-website.firebaseapp.com",
  projectId: "tutorai-website",
  storageBucket: "tutorai-website.firebasestorage.app", // CORRETTO: era sbagliato
  messagingSenderId: "128237616580",
  appId: "1:128237616580:web:50463e22590880aa6c3891",
  measurementId: "G-JPMHM3LXD0"
};

// Inizializza Firebase solo se non è già stato fatto
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Esporta i servizi che useremo nel sito
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
