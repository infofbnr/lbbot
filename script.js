// patchnotes.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHYnW3qaNo7oGKMPs9DFALdWXIeYv6ixY",
  authDomain: "gossip-38bf8.firebaseapp.com",
  projectId: "gossip-38bf8",
  storageBucket: "gossip-38bf8.firebasestorage.app",
  messagingSenderId: "224975261462",
  appId: "1:224975261462:web:f08fd243ec4a5c1a4a4a37",
  measurementId: "G-N7S9894R3N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Utility functions
export async function fetchPatchnotes(orderByField = "date", desc = true) {
  const q = query(collection(db, "patchnotes"), orderBy(orderByField, desc ? "desc" : "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addPatchnote(version, date, categories, changes) {
  await addDoc(collection(db, "patchnotes"), { version, date, categories, changes });
}

export async function deletePatchnote(id) {
  await deleteDoc(doc(db, "patchnotes", id));
}
