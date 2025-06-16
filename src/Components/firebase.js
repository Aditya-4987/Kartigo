// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_YOEyjtjV0FS7-xtCS_SZizFGIzeUtuw",
  authDomain: "e-commerce-template-b5810.firebaseapp.com",
  projectId: "e-commerce-template-b5810",
  storageBucket: "e-commerce-template-b5810.firebasestorage.app",
  messagingSenderId: "425888612067",
  appId: "1:425888612067:web:b1717f2de97bf3a5dacfd6",
  measurementId: "G-B2BH922TD4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
