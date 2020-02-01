import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyDR6V0-LoIA6z0LN9hm4zyD-6k9Nsv-2Ng",
    authDomain: "code-1fdf7.firebaseapp.com",
    databaseURL: "https://code-1fdf7.firebaseio.com",
    projectId: "code-1fdf7",
    storageBucket: "code-1fdf7.appspot.com",
    messagingSenderId: "309441891339",
    appId: "1:309441891339:web:887d7864baee25dfa54b0e",
    measurementId: "G-HKPN39PBPY"
};
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
