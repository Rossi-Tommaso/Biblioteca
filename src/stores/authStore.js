import { writable } from "svelte/store";
import { auth, onAuthStateChanged } from "firebase/auth";

export const user = writable(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser ? {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL
  } : null);
});
