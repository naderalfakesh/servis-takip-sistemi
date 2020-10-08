import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6ecDyNK6bHh3B-b4hLpKc3LZ9fjomYPk",
  authDomain: "servis-takibi.firebaseapp.com",
  databaseURL: "https://servis-takibi.firebaseio.com",
  projectId: "servis-takibi",
  storageBucket: "servis-takibi.appspot.com",
  messagingSenderId: "597472903610",
  appId: "1:597472903610:web:48ca1685e0073445eedd83",
  measurementId: "G-YJ5XHLG25V",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const RTdb = firebaseApp.database();
const auth = firebase.auth();

export { db, firebaseApp, RTdb, auth };
