
import { initializeApp } from 'firebase/app';

import {

    getFirestore,onSnapshot,
    collection,query,where,
    getDocs,orderBy,
    addDoc,serverTimestamp,deleteDoc,updateDoc

} from 'firebase/firestore';

import {
    getAuth,onAuthStateChanged,
    createUserWithEmailAndPassword,sendPasswordResetEmail,
    signOut,signInWithEmailAndPassword,sendEmailVerification

} from 'firebase/auth';

import { getStorage,ref,getMetadata,listAll,list, getDownloadURL } from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyAk0N0MBNyOvMy9mcWx9PBn25FZFY_hWj4",
    databaseURL: "https://musix-c3842-default-rtdb.asia-southeast1.firebasedatabase.app",
    authDomain: "musix-c3842.firebaseapp.com",
    projectId: "musix-c3842",
    storageBucket: "musix-c3842.appspot.com",
    messagingSenderId: "435576250386",
    appId: "1:435576250386:web:44ed9e78f1bbaa7ef478cb"
  };

//   var jsmediatags = require("jsmediatags");
//   var jsmediatags = window.jsmediatags;

  //init firebase app
  initializeApp(firebaseConfig);

  // init services
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  const artistRef = ref(storage, 'Artist');

  //collection ref

  const colRef = collection(db, 'Music');

 




const q = query(colRef, where('category', '==', 'Top Hits Hindi'));






let signform = document.getElementById('signform');
let signup = document.getElementById('signup');
let loginform = document.getElementById('loginform');
let forgot = document.getElementById('forgot');
let logform = document.querySelector('.hidd');
let forgotform = document.getElementById('forgotform');



//forgot password


forgot.addEventListener('click',()=>{
    loginform.style.display = 'none';
    forgotform.style.display = 'block';
});

forgotform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = forgotform.email.value;
    sendPasswordResetEmail(auth, email).then(()=>{
        alert('Password reset email sent');
        forgotform.style.display = 'none';
        loginform.style.display = 'block';
    }).catch(err=>{
        alert(err.message);
    })

});


signup.addEventListener('click',()=>{

        logform.style.display = 'none';
        signform.style.display = 'block';
})


onAuthStateChanged(auth,(user)=>{
    if(user)
    {
        console.log(user.email,user.uid);
    }
    else
    {
        console.log('no user');
    }
})


loginform.addEventListener('submit',(e)=>{

    e.preventDefault();

    const email = loginform.email.value;
    const pass = loginform.password.value;

    signInWithEmailAndPassword(auth, email, pass)
    .then(cred => {
        loginform.reset();
        console.log(cred.user.email);

        // if(cred.user.emailVerified)
        window.location.href = '../dist/player.html';
    })
    .catch(err => {
        // console.log(err.message);
        loginform.reset();
        alert(`${err.message}`);
        
    })

});

// console.log(signform);

signform.addEventListener('submit',(e)=>{

    e.preventDefault();

    const email = signform.username.value;
    const password = signform.password.value;

    createUserWithEmailAndPassword(auth,email,password,)
    .then(cred => {
        alert(` Welcome to Spotify You have to login to continue`);
        //  //send verification email
        // sendEmailVerification(auth.currentUser)
        // .then(() => {
        //     console.log('email sent'); 
        // });
        signform.reset();
        signform.style.display = 'none';
        logform.style.display = 'block';
    })
})
.catch(err => {
    alert(`${err.message}`);
    signform.reset();
});


