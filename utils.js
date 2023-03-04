// functions for re-using

import { signOut } from "firebase/auth"
import { auth } from "./firebaseClient"

function logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}

export { logOut }
