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
  user.set(firebaseUser
    ? {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      }
    : null
  ); // Fix: Use the set method to update the writable store
});