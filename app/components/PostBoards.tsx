import React from "react";
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "firebase/compat/app";

firebase.initializeApp({
    apiKey: "AIzaSyCfuy7L9PXjTtRYnNa3crNE7ecA-KWAslI",
    authDomain: "tennis-club-platform.firebaseapp.com",
    projectId: "tennis-club-platform",
    storageBucket: "tennis-club-platform.appspot.com",
    messagingSenderId: "300239757122",
    appId: "1:300239757122:web:918f82bc2a3a8e16b7b2db",
    measurementId: "G-PMWXYDSPQW"
})

// Initialize Firebase
const auth = firebase.auth();
const firestore = firebase.firestore();


function App(){
    return(
        <div className=" pb">
            <header className="pb-header"></header>
            <section></section> // Add a closing tag for the section element
        </div>
    )
}