import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCnFvGzuOsrRJ1t3vlS_CaQ9FgYTNzq6_g",
    authDomain: "vue-it-fire.firebaseapp.com",
    databaseURL: "https://vue-it-fire.firebaseio.com",
    projectId: "vue-it-fire",
    storageBucket: "",
    messagingSenderId: "79503726137",
    appId: "1:79503726137:web:ed18df117120d631fc5fe8"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();
