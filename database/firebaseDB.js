import * as firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyCYX46frfa5jC6nJkTYHP4UPrm_QXDsg3o",
    authDomain: "buddy-plant.firebaseapp.com",
    projectId: "buddy-plant",
    storageBucket: "buddy-plant.appspot.com",
    messagingSenderId: "520350671764",
    appId: "1:520350671764:web:6de3a8dc26d661ff97a581",
    measurementId: "G-LLB38P9H5K"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
