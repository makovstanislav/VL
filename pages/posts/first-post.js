import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import Note from '../../components/Note'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




export default function FirstPost() {
  
  const auth = getAuth()
  
  createUserWithEmailAndPassword(auth, "makovstpm@gmail.com", "StarBucks2023#$%^&")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
      <Note />
      <button
        onClick={createUserWithEmailAndPassword}
        >SignUp</button>
    </Layout>
  );
  }

