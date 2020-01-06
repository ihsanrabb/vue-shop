import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDdTCnxpaWRJ4Roh4EbZfVXKfWFrKsudCU",
    authDomain: "vue-shop-45549.firebaseapp.com",
    databaseURL: "https://vue-shop-45549.firebaseio.com",
    projectId: "vue-shop-45549",
    storageBucket: "vue-shop-45549.appspot.com",
    messagingSenderId: "864326290342",
    appId: "1:864326290342:web:8850c2ba7ab1f930275d67",
    measurementId: "G-MHSH64NXZM"
  };
  // Initialize Firebase
  export const fb = firebase.initializeApp(firebaseConfig);
  export const analytics = firebase.analytics();