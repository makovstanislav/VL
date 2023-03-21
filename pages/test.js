import React from 'react'
import Head from 'next/head'
import styles from '../styles/test.module.css'

export default function Test() {
    return (
        <>
      <Head>
        <title>Page Title</title>
      </Head>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#">Link 1</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Link 2</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{<></>}</main>
      <footer className={styles.footer}>Copyright © 2023
      </footer>
    </>
  )
}

