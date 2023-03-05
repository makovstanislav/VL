import {React, useState} from "react"

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

import Note from '../components/Note'
import Menubar from '../components/Menubar'
import Navbar from '../components/Navbar'

import { auth } from "../firebaseClient"
import { useAuthState } from "react-firebase-hooks/auth"


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {

  const [user, loading, error ] = useAuthState(auth)

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
    <>
      <Navbar />
    </>
  )
}
