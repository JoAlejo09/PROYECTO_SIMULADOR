import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqM__qT_YHd79ovUPrExWGDBr94FNZDjk",
  authDomain: "futbolsimapp.firebaseapp.com",
  projectId: "futbolsimapp",
  storageBucket: "futbolsimapp.firebasestorage.app",
  messagingSenderId: "281261908976",
  appId: "1:281261908976:web:d74d53cd10d93742c4b335"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};