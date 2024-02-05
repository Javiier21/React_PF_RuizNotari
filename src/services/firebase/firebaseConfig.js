import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsZZRCDhi5BPsurIx2moRLUaFavFtsBHc",
  authDomain: "react-pf-javierruiz.firebaseapp.com",
  projectId: "react-pf-javierruiz",
  storageBucket: "react-pf-javierruiz.appspot.com",
  messagingSenderId: "574265091731",
  appId: "1:574265091731:web:2575749066758889c88f66"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)