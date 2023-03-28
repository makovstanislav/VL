import { useState } from 'react'
import styles from '../../styles/ds-layout.module.css'
import CreateButton from './create-button'
import UserButton from './user-button'

export default function Header() {

    const [search, setSearch] = useState('')

    function handleChange(event) {
        setSearch(prev => event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <header className={`navbar navbar-expand-sm bg-body-tertiary ${styles['header1']}`}>

            <a className={`navbar-brand ${styles['logo']}`} href="/">
                <img 
                    src="/images/virtuallab_logo_v3_grey.png" 
                    alt="Logo" 
                    width="100%" 
                    height="24" 
                    class="d-inline-block align-text-top" 
                />
            </a>

            <div className={styles['box-right']}>
                <div className={styles['create-button-container']}>
                    <CreateButton />
                </div>
                <div className={styles['box-root']}>
                    <div className={styles['profile-tools']}>
                            <svg className={styles['settings-icon']} title="Settings">
                                <title>Settings</title>
                                <circle cx="50" cy="50" r="40" fill="blue" />
                            </svg>
                        <UserButton/>
                    </div>
                </div>
            </div>
        </header>
    )
}
