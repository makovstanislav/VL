import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth"
import { auth } from '../firebaseClient'
import Note from '../components/Note'

import {React, useState} from "react"


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

  // Google Auth Provider
  const provider = new GoogleAuthProvider();

  // Sign In via Google with a pop-up
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("cvhkjl")
        console.log(result.user)
        setSigned(true)
      })
      .then((result) => {
        console.log(isSigned)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
        <button
          onClick={signIn}
          >Sign In via Google
        </button>
      </section>
      {isSigned && <Note />}
      {isSigned && <button onClick={logOut}>Log out</button>}
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
    </Layout>
  );
}
