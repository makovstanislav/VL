import {React} from "react"
import styles from '../styles/ds-layout.module.css'


export default function Footer() {
    return (
        <footer className={`footer mt-auto py-3 bg-light ${styles['footer']}`}>
            <div class="container">
                {/*
                <a href="https://virtual-lab.bio" alt="https://virtual-lab.bio">Virtual Lab</a>
                */}
            </div>
            <div class="container">
                <span>© Copyright 2023 <a href="https://virtual-lab.bio" alt="https://virtual-lab.bio">Virtual Lab</a>, all rights reserved</span>
                {/*
                <span class="text-muted">Terms & Conditions</span>
                */}
            </div>
            <div class="container">
                {/*
                <img className={`mb-2 ${styles['linkedin']}`} src="/images/linkedin.svg" alt="" width="24" height="19"/>
                <img class="mb-2" src="/images/twitter.svg" alt="" width="24" height="19"/>
                */}
            </div>
        </footer>
    )
}