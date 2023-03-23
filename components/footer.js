import {React} from "react"
import styles from '../styles/ds-layout.module.css'


export default function Footer() {
    return (
        <footer className={`footer mt-auto py-3 bg-light ${styles['footer']}`}>
            <div class="container">
                <span class="text-muted">virtual-lab.bio</span>
            </div>
            <div class="container">
                <span class="text-muted">Terms & Conditions</span>
            </div>
            <div class="container">
                <img className={`mb-2 ${styles['linkedin']}`} src="/images/linkedin.svg" alt="" width="24" height="19"/>
                <img class="mb-2" src="/images/twitter.svg" alt="" width="24" height="19"/>
            </div>
        </footer>
    )
}