import { React, useState, useEffect } from "react"
import { ref, set } from "firebase/database"
import AddItemForm from "../components/forms/add-item-form"
import { v4 } from "uuid"
import { database } from "../firebaseClient"
import Layout from "../components/dashboard/layout"
import { getCookie } from "cookies-next"
import ItemSubmitted from "../components/dashboard/item-submitted"
import formData from "../etc/item_metadata.json"

export default function AddItem() {
    const [isSubmitted, setSubmitted] = useState(null)
    const [title, setTitle] = useState("")

    function importTitle(title) {
        setTitle(title)
    }
    
    return (
        <Layout>
            {!isSubmitted ? <AddItemForm
              setSubmitted={setSubmitted}
              exportTitle={importTitle}
            /> : <ItemSubmitted 
                title={title}
            />}
        </Layout>
    )
}

