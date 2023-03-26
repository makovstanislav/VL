import AllSamplesTable from "../components/dashboard/table-all-samples"
import styles from "../styles/all-samples.module.css"

import Layout from "../components/dashboard/layout"
import { React, useState, useEffect } from 'react'
import { ref, onValue} from "firebase/database"
import { database } from "../firebaseClient"

export default function AllSamples() {

    const [samplesData, setSamplesData] = useState([])
    
    useEffect(() => {
        getSamplesData()
    }, []);
    
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
    function getSamplesData() {
        console.log("fetching started...")
        fetchDB('/products')
            .then((data) => {
                const list = Object.keys(data).map(uid => data[uid])
                console.log('data !!!!') 
                console.log(data)
                console.log(Object.keys(data))
                setSamplesData(list)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <Layout>
            <div className={styles['filters']}></div>
            <AllSamplesTable samplesData={samplesData} />
        </Layout>
    )
}

