import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider, signOut, getRedirectResult} from "firebase/auth";
//import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
//import 'firebaseui/dist/firebaseui.css'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//document elements (buttons)
const startRsvpButton = document.getElementById('startRsvp');
const button = document.querySelector('button');
//const button = document.getElementByID('button');

const provider = new GoogleAuthProvider();

//let auth;
//let rsvpListener = null;

async function main() {
  const firebaseConfig = {
    apiKey: "AIzaSyCTqwCTAtFN_grmxzB8TlOiNCk57yppk44",
    authDomain: "v6-toptrack.firebaseapp.com",
    projectId: "v6-toptrack",
    storageBucket: "v6-toptrack.appspot.com",
    messagingSenderId: "680793384814",
    appId: "1:680793384814:web:10372e8ae09d3e1c7bc37f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const ui = new firebaseui.auth.AuthUI(auth);

  

  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      provider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      },
    },
  };

 /* onAuthStateChanged(auth, user => {
    if(user == null) {return;} 
    console.log('user');
  });
  */

 

  startRsvpButton.addEventListener('click', () => {
    if (auth.currentUser) {
      signOut(auth).then(() => {
      // Sign-out successful.
      }).catch((error) =>{
      // An error happened.
      });
    } else {
      signInWithRedirect(auth, provider);
    } 
    //ui.start('#firebaseui-auth-container', uiConfig);
    // Listen to the current Auth state
  });


  button.addEventListener('click', () => {
    if (auth.currentUser) {
      signOut(auth).then(() => {
      // Sign-out successful.
      }).catch((error) =>{
      // An error happened.
      });
    } else {
      signInWithRedirect(auth, provider);
    } 
    //ui.start('#firebaseui-auth-container', uiConfig);
    // Listen to the current Auth state
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      startRsvpButton.textContent = 'LOGOUT';
      //guestbookContainer.style.display = 'block';
    } else {
      startRsvpButton.textContent = 'SIGN IN';
      //guestbookContainer.style.display = 'none';
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      button.textContent = 'LOGOUT';
      //guestbookContainer.style.display = 'block';
    } else {
      button.textContent = 'SIGN IN';
      //guestbookContainer.style.display = 'none';
    }
  });

  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = provider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
   const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = provider.credentialFromError(error);
    // ...
  });

}
main();

function showMore() {
  var paragraph = document.getElementById("hero-paragraph");
  var readMoreLink = document.getElementById("read-more-link");

  // Toggle the visibility of the hidden portion of the text
  if (paragraph.style.display === "none" || paragraph.style.display === "") {
    paragraph.style.display = "block";
    readMoreLink.style.display = "none"; // Hide the "Read more" link
  } else {
    paragraph.style.display = "none"; // Hide the full text
    readMoreLink.style.display = "inline"; // Show the "Read more" link
  }
}
