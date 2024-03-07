import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfuy7L9PXjTtRYnNa3crNE7ecA-KWAslI",
  authDomain: "tennis-club-platform.firebaseapp.com",
  projectId: "tennis-club-platform",
  storageBucket: "tennis-club-platform.appspot.com",
  messagingSenderId: "300239757122",
  appId: "1:300239757122:web:918f82bc2a3a8e16b7b2db",
  measurementId: "G-PMWXYDSPQW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);