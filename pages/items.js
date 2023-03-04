import { React, useState, useEffect } from "react"
import { ref, onValue} from "firebase/database"
import { database } from "../firebaseClient"
import Table from "../components/table"
import Layout from "../components/layout"


export default function Items() {

    const [items, setItems] = useState([])

    useEffect(function() {
        fetchItems()
    }, []) 

    function fetchItems() {
        const itemsrRef = ref(database, 'items/')
        onValue(itemsrRef, (snapshot) => {
            const data = snapshot.val();
            setItems(() => {
                const fetchedItems = []
                const itemsList = Object.keys(data)
                itemsList.forEach((key) => {
                    fetchedItems.push([data[key].name, data[key].description, data[key].price])
                })
                return fetchedItems
            })
            console.log(items)
        })
        
    } 

    return (
        <Layout>
            <div>
                <h1>hi</h1>
                <Table 
                    items={items}
                />
            </div>
        </Layout> 
    )
}


