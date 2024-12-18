import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase.config"

export const user = writable(null);
export let sign_up = writable(false);

export const logOut = async () => {
  await logOut();
  user.set(null);
}

if (browser) {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser
      ? {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        }
      : null
    );
  });
}
