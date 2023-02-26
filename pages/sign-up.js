import { React, useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, database } from '../firebaseClient'
import { ref, set} from "firebase/database"
import Link from "next/link"
import SignUpForm from "../components/forms/sign-up-form"



export default function SignUp() {
    //states
    const [credentials, setCredentials] = useState({
        name: "",
        email: "", 
        password: "",
        isSeller: false
      })

    const [isSigned, setSigned] = useState(false)

    //handlers
    function handleChange(event) {
        setCredentials(prevCred => {
            return {
            ...prevCred,
            [event.target.name]: event.target.type === "checkbox" ? !credentials.isSeller : event.target.value
            }
        })
    }

    async function handleSubmit() {
        const logUp = await signUp(credentials.email, credentials.password)
        const switchSigned = await setSigned(true)
        const addToDb = await writeUserData()
    }

    // record credentials to db
    function writeUserData() {
        const {name, email, password, isSeller} = credentials
        set(ref(database, "user"), {
          name: name,
          email: email,
          password: password,
          isSeller: isSeller
        })
      }
    
    
    //signUp
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
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
        
    


    return(
        <section>
            <section>
                <Link href="/">Back home</Link>
            </section>
            {isSigned ? success : signUpForm}
        </section>
        
    )
    

}