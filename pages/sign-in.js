import { signInWithEmailAndPassword } from "firebase/auth"
import SignInForm from "../components/forms/sign-in-form"
import auth from "../firebaseClient"
import {React, useState} from "react"
import Link from "next/link"

export default function SignIn() {
    
    //states
    const [credentials, setCredentials] = useState({
        email: "", 
        password: "",
      })

    const [isSigned, setSigned] = useState(false)

    //handlers
    function handleChange(event) {
        setCredentials(prevCred => {
            return {
            ...prevCred,
            [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit() {
        const logUp = await signIn(credentials.email, credentials.password)
        const switchSigned = await setSigned(true)
    }
    
    //sign-in
    function signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password) 
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }
    
    

    //success text
    const success = (
        <div>
            <h1>You have signed in</h1>
        </div>
    )

    const signInForm = (
        <SignInForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            credentials={credentials}
        />
    )


    return (
        <section>
            {isSigned ? success : signInForm}
            <div>
                <Link href="/">Back home </Link>
            </div>
        </section>
    )
}