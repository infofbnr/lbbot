import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHYnW3qaNo7oGKMPs9DFALdWXIeYv6ixY",
  authDomain: "gossip-38bf8.firebaseapp.com",
  projectId: "gossip-38bf8",
  storageBucket: "gossip-38bf8.firebasestorage.app",
  messagingSenderId: "224975261462",
  appId: "1:224975261462:web:f08fd243ec4a5c1a4a4a37",
  measurementId: "G-N7S9894R3N"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Fetch patchnotes
export async function fetchPatchnotes(orderByField = "version", desc = true) {
  const q = query(
    collection(db, "patchnotes"),
    orderBy(orderByField, desc ? "desc" : "asc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Add a new patchnote
export async function addPatchnote(version, date, categories, changes) {
  return addDoc(collection(db, "patchnotes"), {
    version,
    date,
    categories,
    changes
  });
}

// Delete patchnote
export async function deletePatchnote(id) {
  return deleteDoc(doc(db, "patchnotes", id));
}
