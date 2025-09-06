// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHYnW3qaNo7oGKMPs9DFALdWXIeYv6ixY",
  authDomain: "gossip-38bf8.firebaseapp.com",
  projectId: "gossip-38bf8",
  storageBucket: "gossip-38bf8.firebasestorage.app",
  messagingSenderId: "224975261462",
  appId: "1:224975261462:web:f08fd243ec4a5c1a4a4a37",
  measurementId: "G-N7S9894R3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Fetch all patchnotes, ordered by a field (default: date descending)
export async function fetchPatchnotes(orderByField = "date", desc = true) {
  const q = query(collection(db, "patchnotes"), orderBy(orderByField, desc ? "desc" : "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a patchnote
export async function addPatchnote(version, date, categories, changes) {
  await addDoc(collection(db, "patchnotes"), { version, date, categories, changes });
}

// Delete a patchnote by ID
export async function deletePatchnote(id) {
  await deleteDoc(doc(db, "patchnotes", id));
}
