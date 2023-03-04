import { React, useState } from "react"
import { ref, set } from "firebase/database"
import AddItemForm from "../components/forms/add-item-form"
import { v4 } from "uuid"
import { database } from "../firebaseClient"
import Link from "next/link"
import Layout from "../components/layout"
export default function AddItem() {

    //states
    const [details, setDetails] = useState({
        name: "",
        description: "", 
        price: ""
      })

    const [isSubmitted, setSubmitted] = useState(false)
    
    
    //handlers
    function handleChange(event) {
        setDetails(prevDet => {
            return {
            ...prevDet,
            [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const addToBd = await addItem()
        const switchSubmitted = await setSubmitted(true)
    }

    // adding to db
    function addItem() {
        const {name, description, price} = details
        const uid = v4()
        console.log(uid)
        set(ref(database, "products/" + uid), {
            name: details.name,
            description: details.description,
            price: details.price
        })
    }


    return (
        <Layout>
            <section>
                {!isSubmitted && <AddItemForm 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    details={details}
                />}
                <div>
                    <Link href="/">Back home </Link>
                </div>
            </section>
        </Layout>
        
    )
}

