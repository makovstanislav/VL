import { React, useState, useEffect } from "react"
import { ref, set } from "firebase/database"
import AddItemForm from "../components/forms/add-item-form"
import { v4 } from "uuid"
import { database } from "../firebaseClient"
import Layout from "../components/dashboard/layout"
import { getCookie } from "cookies-next"

export default function AddItem() {

    //states
    const [userUid, setUserUid] = useState(getCookie('uid'))

    const [details, setDetails] = useState({
        title: "",
        description: "",
        type: "", 
        storage_condition: "",
        site: "",
        availability: "",
        price: "",
        strain: "",
        source: ""
    })

    const [isSubmitted, setSubmitted] = useState(false)
    
    //handlers
    function handleChange(event) {
        console.log(event.target.name)
        setDetails(prev => {
            return {
            ...prev,
            [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const addToBd = await submitItem()
        const switchSubmitted = await setSubmitted(true)
    }

    // adding to db
    function submitItem() {
        const {name, description, price} = details
        const uid = v4()
        console.log(userUid)
        set(ref(database, "products/" + uid), {
            title: details.title,
            description: details.description,
            type: details.type, 
            storage_condition: details.storage_condition,
            user_id: userUid,
            date_created: new Date(Date.now()).toLocaleString().slice(0,10),
            site: details.site,
            availability: details.availability,
            price: details.price,
            strain: details.strain,
            source: details.source
        })
        set(ref(database, 'users/' + userUid + '/products/' + uid), true)
    }

    return (
        <Layout>
            {!isSubmitted && <AddItemForm 
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                details={details}
            />}
        </Layout>
        
    )
}

