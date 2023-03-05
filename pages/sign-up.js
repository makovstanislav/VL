import { React, useState } from "react"
import { auth, database } from '../firebaseClient'
import { ref, set} from "firebase/database"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import Link from "next/link"
import SignUpForm from "../components/forms/sign-up-form"
import Layout from '../components/layout'




export default function SignUp() {
    //states
    const [credentials, setCredentials] = useState({
        name: "",
        email: "", 
        password: "",
        isSeller: false
      })

    const [isSigned, setSigned] = useState(false)

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
            [event.target.name]: event.target.type === "checkbox" ? !credentials.isSeller : event.target.value
            }
        })
    }

    async function handleSubmit() {
        await signUp(credentials.email, credentials.password)
        await setSigned(true)
        writeUserData()
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

    {loading && <h3>Loading</h3>}
    {error && <h3>error.message</h3>}
    {user && <h3>user.user.email</h3>}
        
    
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
    } else if(user) {
        return(
            <div>
                <h1>{user.user.email} successfully registered. Thank you! </h1>
            </div>
        )
    }

    return(
        <Layout>
            <section>
                <section>
                    <Link href="/">Back home</Link>
                </section>
                {signUpForm}
            </section>
        </Layout>
        
        
    )
    

}