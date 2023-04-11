import styles from '../../styles/ds-layout.module.css'
import Header from './header'
import Footer from '../Footer'


export default function Layout({children}) {

    return (
        <>
            <div className={styles['dashboard']}>
                <Header />
            </div>
            <main>
                <div className={styles['page-container']}>
                    <div className={styles['content-wrap']}>
                        {children}
                    </div>
                    <Footer/>
                </div>
            </main>
            
        </>
    )
}