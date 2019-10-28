import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBziEv39fjPNO2v-H66fO5AVnkNYw6dUN4",
    authDomain: "csse-c87e3.firebaseapp.com",
    databaseURL: "https://csse-c87e3.firebaseio.com",
    projectId: "csse-c87e3",
    storageBucket: "",
    messagingSenderId: "292576144553",
    appId: "1:292576144553:web:22e2e723d9da6b17bacdb8"
};

firebase.initializeApp(firebaseConfig);

export default firebase;