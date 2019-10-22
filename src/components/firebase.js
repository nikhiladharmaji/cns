import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCz-MReDWmp5IGT4DrX8KQJT-eskR9zqIE",
  authDomain: "cryptobucket-14475.firebaseapp.com",
  databaseURL: "https://cryptobucket-14475.firebaseio.com",
  projectId: "cryptobucket-14475",
  storageBucket: "cryptobucket-14475.appspot.com",
  messagingSenderId: "287007036988",
  appId: "1:287007036988:web:2c7494aa982c02192c1539",
  measurementId: "G-DBP94HLBE1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
