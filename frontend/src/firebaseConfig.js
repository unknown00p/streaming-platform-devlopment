import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmBskEN4RtRcjsoeMDZTHBGG-mYcglI7U",
  authDomain: "watch-here-66014.firebaseapp.com",
  projectId: "watch-here-66014",
  storageBucket: "watch-here-66014.firebasestorage.app",
  messagingSenderId: "911742564886",
  appId: "1:911742564886:web:4a9c4fe333ab28c3a99337",
  measurementId: "G-SWSV00KRBQ"
};

const fireConfig = initializeApp(firebaseConfig);
export default fireConfig