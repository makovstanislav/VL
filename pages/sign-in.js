import SignInForm from "../components/forms/sign-in-form"

import { auth } from "../firebaseClient"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import {React, useState, useEffect} from "react"

import { useRouter } from 'next/router'

import { logOut } from "../utils"
import Navbar from '../components/Navbar'


export default function SignIn() {
    
    const [credentials, setCredentials] = useState({
        email: "", 
        password: "",
      })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()
    

    //handlers
    function handleChange(event) {
        setCredentials(prevCred => {
            return {
            ...prevCred,
            [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        signInWithEmailAndPassword(credentials.email, credentials.password)
        console.log("fghjkl")

    }
    
    
    //sign out
    async function signOut() {
        await logOut()
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
            error={error}
            loading={loading}
            user={user}
        />
    )

     if(user) {
        router.push('/') 
    } 

    return (
        <div>
            <Navbar />
            {signInForm}
        </div>
        
        
    )
}