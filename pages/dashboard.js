import Layout from "../components/dashboard/layout"
import TableComponent from '../components/dashboard/table'
import { React, useState, useEffect } from 'react'
import { ref, onValue} from "firebase/database"
import styles from '../styles/ds-layout.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from "../firebaseClient"


export default function Dashboard() {

    const [user, loading, error] = useAuthState(auth)
    const [samplesData, setSamplesData] = useState([])
    
    useEffect(() => {
        if (user) {
            console.log("before access")
            getSamplesData(user.uid)
            console.log("after access")
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
        console.log("fetching started...")
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
        <div>
            <Layout>
                <div className={`${styles['tbd']}`}>
                    <a href="/add-item">
                        <button class="btn btn-primary" type="submit" >Share new specimen</button>
                    </a>
                    
                </div>
                <TableComponent
                    samplesData={samplesData} 
                />
            </Layout>
        </div>
    )
}