import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "demo-api-key",
//   authDomain: "yatratrack-demo.firebaseapp.com",
//   projectId: "yatratrack-demo",
//   storageBucket: "yatratrack-demo.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "demo-app-id"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDGZ-91-6-VCfwSK4Yym4B6fz4mdzlgaEs",
  authDomain: "yatratrack-a0cd7.firebaseapp.com",
  projectId: "yatratrack-a0cd7",
  storageBucket: "yatratrack-a0cd7.firebasestorage.app",
  messagingSenderId: "30552062901",
  appId: "1:30552062901:web:33ab766ed4f6fa7a9877fc",
  measurementId: "G-Q9TD2CN52T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;