import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

import { createUserWithEmailAndPassword, signOut, GoogleAuthProvider } from "firebase/auth"
import { auth } from '../firebaseClient'
import Note from '../components/Note'

import {React, useState} from "react"

import {ref, set, onValue } from "firebase/database"
import {database} from "../firebaseClient"


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {

  const [isSigned, setSigned] = useState(false)
  const [credentials, setCredentials] = useState({
    name: "",
    email: "", 
    password: "",
    isSeller: false
  })

  const [seller, switchSeller] = useState(false)

  function handleChange(event) {
    setCredentials(prevCred => {
      return {
        ...prevCred,
        [event.target.name]: event.target.type === "checkbox" ? !credentials.isSeller : event.target.value
      }
    })
    readUserType()
  }

  function writeUserData() {
    const {name, email, password, isSeller} = credentials
    set(ref(database, "user"), {
      name: name,
      email: email,
      password: password,
      isSeller: isSeller
    })
  }
  
  writeUserData()

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  async function handleSubmit() {
   const logUp = await signUp(credentials.email, credentials.password)
   const addToDb = await writeUserData()
  }

  function readUserType() {
    const isSellerRef = ref(database, 'user/isSeller')
    onValue(isSellerRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      switchSeller(data)
    })
  }

  function logOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setSigned(false)
      console.log("Sign-out successful")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Type username'
            onChange={handleChange}
            name="name"
            value={credentials.name}
          ></input>
          <input
            type="email"
            placeholder='Type email'
            onChange={handleChange}
            name="email"
            value={credentials.email}
          ></input>
          <input
            type="password"
            placeholder='Type password'
            onChange={handleChange}
            name="password"
            value={credentials.password}
          ></input>
          <input
            type="checkbox"
            id="isSeller"
            name="isSeller"
            onChange={handleChange}
          >
          </input>
          <label for="isSeller">Are you a seller?</label>
          <button>Submit</button>
        </form>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      {seller && <Note />}
    </Layout>
  );
}
