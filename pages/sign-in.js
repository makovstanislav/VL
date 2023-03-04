import { signInWithEmailAndPassword } from "firebase/auth"
import SignInForm from "../components/forms/sign-in-form"
import auth from "../firebaseClient"
import {React, useState} from "react"
import Link from "next/link"
import { logOut } from "../utils"
import Layout from '../components/layout'



export default function SignIn() {
    
    //states
    //hook1
    const [credentials, setCredentials] = useState({
        email: "", 
        password: "",
      })
      //derived hook
      const userEmail = credentials.email

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
        await signIn(credentials.email, credentials.password)
        await setSigned(true)
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
    
    //sign out
    async function signOut() {
        await logOut()
        await setSigned(false)
    }
    

    //success text
    const success = (
        <div>
            <h1>You have signed in</h1>
            <button onClick={signOut}>Log out</button>
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
        <Layout>
            <section>
                {isSigned ? success : signInForm}
                <div>
                    <Link href="/">Back home </Link>
                </div>
            </section>
        </Layout>
        
    )
}