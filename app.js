import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  doc, deleteDoc, setDoc, updateDoc,
  collection, addDoc, getDocs, getDoc, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyADUyFGrNK9IjWmGK2DNThhEDjiSDsS1o4",
  authDomain: "school-system-509b8.firebaseapp.com",
  projectId: "school-system-509b8",
  storageBucket: "school-system-509b8.appspot.com",
  messagingSenderId: "648022654367",
  appId: "1:648022654367:web:0d7e5a6341251f508cd1aa"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

window.db   = db;
window.auth = auth;
window._fb  = {
  doc, deleteDoc, setDoc, updateDoc,
  collection, addDoc, getDocs, getDoc,
  query, where, signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
};

// ── ROLE ROUTING ──────────────────────────────────────────
window.routeByRole = function(role){
  if(role === "admin")   window.location.href = "admin-dashboard.html";
  if(role === "teacher") window.location.href = "teacher-dashboard.html";
  if(role === "student") window.location.href = "student-portal.html";
};

// ── SESSION HELPERS ───────────────────────────────────────
window.saveSession = function(userData){
  localStorage.setItem("cmc_user", JSON.stringify(userData));
};

window.getSession = function(){
  try { return JSON.parse(localStorage.getItem("cmc_user")); }
  catch(e){ return null; }
};

window.clearSession = function(){
  localStorage.removeItem("cmc_user");
};

window.requireRole = function(role){
  const user = window.getSession();
  if(!user){ window.location.href = "login.html"; return null; }
  if(role && user.role !== role){ window.location.href = "login.html"; return null; }
  return user;
};