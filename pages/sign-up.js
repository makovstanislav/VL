import { React, useState } from "react"
import { auth, database } from '../firebaseClient'
import { ref, set} from "firebase/database"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import SignUpForm from "../components/forms/sign-up-form"
import stylesUtils from '../styles/utils.module.css'


export default function SignUp() {
    //states
    const [credentials, setCredentials] = useState({
        email: "", 
        password: "",
        password2: ""
      })

    const [isSigned, setSigned] = useState(false)

    // hook
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);



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
        await signUp(credentials.email, credentials.password)
        await setSigned(true)
    }

    // record credentials to db
    function writeUserData(uid) {
        const {email, password} = credentials
        set(ref(database, "/users/" + uid), {
          email: email
        })
      }
    
    
    //signUp
    function signUp(email, password) {
        console.log("hjkl")
        createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    //reverse signUp
    function reverseSignUp() {
        setSigned(false)
        console.log(isSigned)
    }

    //success text
    const success = (
        <div>
            <h1>You have been registered</h1>
            <button onClick={reverseSignUp}>Sign Up again</button>
        </div>
    )

    const signUpForm = (
        <SignUpForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            credentials={credentials}
        />
    )

    
        
    
    if (error) {
        return(
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    } else if (loading) {
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }  else if(user) {
        console.log(user.user.uid)
        writeUserData(user.user.uid)
        return(
            <div>
                <h1>{user.user.email} successfully registered. Thank you! </h1>
            </div>
        )
    } 

    return(
        <div>
            <header className={stylesUtils['header']}>
                <a href="/" className={stylesUtils['logo']}></a>
            </header>
            {signUpForm}
        </div>
    )
    
//user.auth.uid
}