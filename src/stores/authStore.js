import { writable } from "svelte/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { goto } from "$app/navigation"

export let user = writable(null);
export let sign_up = writable(false);

export const logOut = async () => {
  try {
    await signOut(auth);
    user.set(null); // Fix: Use the set method to update the writable store
    goto('/')
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    const userData = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
    };

    console.log("USER STORE OK");
    user.set(userData); // Usa il metodo set per aggiornare lo store
  } else {
    console.log("USER STORE NULL");
    user.set(null); // Usa il metodo set per resettare lo store
  }
});


// const savePhotoToSessionStorage = async (photoURL) => {
//   try {
//   const response = await fetch(photoURL);
//   if (!response.ok) {
//     user.set({ ...user, photoURL: null }); 
//     return;
//   }

//   const blob = await response.blob(); // convert the response to a blob (binary large object) that represents the binary data of the image
//   const reader = new FileReader(); // create a new FileReader object

//   reader.onload = () => {
//     sessionStorage.setItem("photoURL", reader.result); // store the image in the sessionStorage
//   };

//   reader.readAsDataURL(blob); 
//   } catch (error) {
//     console.error("Error saving photo to session storage:", error);
//   }
// }

// onAuthStateChanged(auth, (firebaseUser) => {
//   if (firebaseUser) {
//     const userData = {
//       uid: firebaseUser.uid,
//       displayName: firebaseUser.displayName,
//       email: firebaseUser.email,
//       photoURL: firebaseUser.photoURL,
//     };

//     console.log("USER STORE OK")
//     user.set(userData);
//     //savePhotoToSessionStorage(userData.photoURL);
//   } else {
//     console.log("USER STORE NULL")
//     user.set(null);
//   }
// });

//export const getPhotoFromSessionStorage = () => {
//  return sessionStorage.getItem("photoURL");
//};