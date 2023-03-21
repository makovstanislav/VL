import styles from '../../styles/ds-layout.module.css'
import Header from './header'
import { React, useState, useEffect } from 'react';
import { database } from "../../firebaseClient"
import { ref, onValue} from "firebase/database"
import Footer from '../footer';
import TableComponent from './table';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseClient';

export default function Layout() {

    const [user, loading, error] = useAuthState(auth)
    const [samplesData, setSamplesData] = useState([])
    
    useEffect(() => {
        if (user) {
            getSamplesData(user.uid);
        }
    }, [user]);
    
    // fetch
    function fetchDB(path) {
        const itemsrRef = ref(database, path)
        return new Promise((resolve, reject) => {
            onValue(itemsrRef, (snapshot) => {
                resolve(snapshot.val());
            }, (error) => {
                reject(error);
            })
        })
    }
    
    // sets a list of objects with samples data
    function getSamplesData(userUid) {
        fetchDB('users/' + userUid + '/products')
            .then((data) => {
                const promises = Object.keys(data).map(uid =>
                    fetchDB('products/' + uid)
                        .then((productData) => ({
                            uid: uid, 
                            title: productData.title,
                            type: productData.type,
                            date: productData.date_created
                        }))
                        .catch((error) => {
                            console.log(error)
                        })
                )
                Promise.all(promises).then(samples => {
                    setSamplesData(samples)
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className={styles['dashboard']}>
                <Header />
            </div>
            <main>
                <TableComponent
                    samplesData={samplesData} 
                />
            </main>
            <Footer />
        </>
    )
}