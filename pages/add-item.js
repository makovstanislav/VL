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
        specimenType: "", 
        sourceOrganism: "",
        sourceStrain: "",
        sourceSamplingSite: "",
        samplingDate: "",
        samplingTime: "",
        storageCondition: "",
        experimentalConditions: "",
        treatment: "",
        availableData: "",
        number: "",
        volume: "",
        volumeUnit: "",
        concentration: "",
        concentrationUnit: "",
        availability: "",
        price: "",
        priceCurrency: "",
        countryOfOrigin: "",
        shippingOption: ""
    })

    const [isSubmitted, setSubmitted] = useState(false)
    const [validated, setValidated] = useState(null)
    
    //change handler
    function handleChange(e) {
        setDetails(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // hardcoded date, time and checkbox change handlers
    const handleDateChange = (e) => {
        

        setDetails(prev => {
            return {
                ...prev,
                [e.target.name]: new Date(e.target.value)
            }
        })
    }
    
    const handleTimeChange = (e) => {
        console.log(details)


        setDetails(prev => {
            return {
                ...prev,
                [e.target.name]: new Date(`1970-01-01T${e.target.value}:00`)
            }
        })
    }

    const handleCheckBoxChange = (e) => {
        console.log(details)

        setDetails(prev => {
            const field = e.target.name
            const option = e.target.value
            const value = e.target.checked

            return {
                ...prev,
                [field]: {
                    ...prev[field],
                    [option]: value
                }
            }
        })
    }

    // submit handler
    async function handleSubmit(event) {
        event.preventDefault()
        // check if all required fields are filled
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(false)
            console.log("validation failed")
        } else {
            setValidated(true)
            // submit to db
            const addToBd = await submitItem()
            const switchSubmitted = await setSubmitted(true)
        }
        console.log("validated" + validated)
    }

    // submit a sample to db
    function submitItem() {
        const {name, description, price} = details
        const uid = v4()
        set(ref(database, "products/" + uid), {
            user_id: userUid,
            date_created: new Date(Date.now()).toLocaleString().slice(0,10),
            title: details.title,
            description: details.description,
            specimenType: details.specimenType,
            sourceOrganism: details.sourceOrganism,
            sourceStrain: details.sourceStrain,
            sourceSamplingSite: details.sourceSamplingSite,
            samplingDate: details.samplingDate,
            samplingTime: details.samplingTime,
            storageCondition: details.storageCondition,
            experimentalConditions: details.experimentalConditions,
            treatment: details.treatment,
            availableData: details.availableData,
            number: details.number,
            volume: details.volume,
            volumeUnit: details.volumeUnit,
            concentration: details.concentration,
            concentrationUnit: details.concentrationUnit,
            availability: details.availability,
            price: details.price,
            priceCurrency: details.priceCurrency,
            countryOfOrigin: details.countryOfOrigin,
            shippingOption: details.shippingOption
        })
        set(ref(database, 'users/' + userUid + '/products/' + uid), true)
    }
    
    return (
        <Layout>
            {!isSubmitted && <AddItemForm
                details={details} 
                handleChange={handleChange}
                handleCheckBoxChange={handleCheckBoxChange}
                handleDateChange={handleDateChange}
                handleTimeChange={handleTimeChange}
                handleSubmit={handleSubmit}
                validated={validated}
            />}
        </Layout>
    )
}

