import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCGndo_jrVxNLKv-PbTYx-J7LUwAbv0-XI",
  authDomain: "blog-app-4e22a.firebaseapp.com",
  projectId: "blog-app-4e22a",
  storageBucket: "blog-app-4e22a.firebasestorage.app",
  messagingSenderId: "897927374921",
  appId: "1:897927374921:web:08bb966150b114e6bdf798",
  measurementId: "G-T03YZD5DM4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
