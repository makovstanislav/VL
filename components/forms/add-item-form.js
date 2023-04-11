import styles from "../../styles/add-item.module.css"
import formData from "../../etc/item_metadata.json"
import { Form, FormControl } from 'react-bootstrap'
import { React, useState, useEffect } from "react"
import { ref, set } from "firebase/database"
import { v4 } from "uuid"
import { database } from "../../firebaseClient"
import { getCookie } from "cookies-next"


export default function AddItemForm({setSubmitted, exportTitle}) {

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

    const [forms, setForms] = useState([])
    const [requiredFields, setRequiredFields] = useState([])
    const [invalidFields, setInvalidFields] = useState([])

    useEffect(() => {
        setForms([
            createFields(formData.item.details), 
            createFields(formData.item.pricingAndAvailability), 
            createFields(formData.item.shipping)
        ])
    }, [details])
       
    useEffect(() => {
        // add required fields to the state
        const requiredDetails = getRequiredFileds(formData.item.details)
        setRequiredFields(prev => [...prev, ...requiredDetails])
        const requiredPricingAndAvailability = getRequiredFileds(formData.item.pricingAndAvailability)
        setRequiredFields(prev => [...prev, ...requiredPricingAndAvailability])
        const requiredShipping = getRequiredFileds(formData.item.shipping)
        setRequiredFields(prev => [...prev, ...requiredShipping])

    }, [])

    // get required fields from metadata
    function getRequiredFileds(obj) {
        const fields = []
        Object.keys(obj).forEach(key => {
            if (obj[key].required) {
                fields.push(key)
            }
        })
        return fields
    }

    // get invalid fields
    function getInvalidFields() {
        const invalidFields = []
        Object.keys(details).forEach(key => {
            if (requiredFields.includes(key) && details[key] === "") {
                invalidFields.push(key)
            }
        })
        return invalidFields
    }

    //change handler
    function handleChange(e) {
        setDetails(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

        if (e.target.name === 'title') {
            exportTitle(e.target.value)
        }
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
    async function handleSubmit(e) {
        e.preventDefault()
        if (requiredFields.every(field => details[field] !== "")) {
            // submit to db
            const addToBd = await submitItem()
            const switchSubmitted = await setSubmitted(true)
        } 
        const updInvalid = await setInvalidFields(getInvalidFields)

        // force rerender
        setDetails(prev => {
            return {
                ...prev
            }
        })

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

    // create fields based on the JSON file
    function createFields(obj) {
        const fields = []
        
        // iterate through the JSON file based on the inputFormType and create the corresponding form field
        Object.keys(obj).forEach(key => {
            let field = (<></>)

            // text field OR textarea based on the length of the text
            if (obj[key].inputFormType === "text") {
                const InputComponent = obj[key].lengthMax > 60 ? 'textarea' : 'input';
                const inputProps = {
                    id: "validationCustom01",
                    type: InputComponent === 'textarea' ? 'textarea' : 'text',
                    className: `form-control ${InputComponent === 'textarea' ? styles['inputTextBig'] : styles['inputTextNormal']}`,
                    onChange: handleChange,
                    name: key,
                    value: details[key],
                    maxlength: obj[key].lengthMax,
                    ...obj[key].required ? {required: true} : {required: false},
                }
                field = (
                    <div className={`mb-3 ${obj[key].lengthMax > 60 ? styles['field-normal'] : styles['field-box']}`}>
                        <div>
                            <label for="validationCustom01" class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-semibold" >Optional</div>}
                            {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                        </div>
                        {InputComponent === 'textarea' ? (
                            <textarea {...inputProps}></textarea>
                        ) : (
                            <input {...inputProps} />
                        )}
                    </div>
                );
            }
            
            // number 
            else if (obj[key].inputFormType === "number") {
                field = (
                    <div className={`mb-3 ${styles['number-box']}`}>
                        <div>
                            <label for={obj[key].name} class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-semibold" >Optional</div>}
                            {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                        </div>
                        <input
                            type="number"
                            class="form-control"
                            onChange={handleChange}
                            name={key}
                            value={details[key]}
                            {...obj[key].required ? {required: true} : {required: false}}
                        ></input>
                    </div>
                )
            }

            // radio button
            else if (obj[key].inputFormType === "radio") {
                let options = []
                Object.keys(obj[key].option).forEach(sub_key => {
                    options.push(
                        <option value={obj[key].option[sub_key]}>
                            {obj[key].option[sub_key]}
                        </option>
                    )
                })
                field = (
                    <div className={`${styles['selection-box']}`}>
                        <div >
                            <label for={obj[key].name} class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-bold" >Optional</div>}
                            {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                        </div>
                            <select 
                                class="form-select" 
                                name={key}
                                aria-label="Default select example" 
                                value={details[key]}
                                onChange={handleChange}
                                {...obj[key].required ? {required: true} : {required: false}}
                            >
                            <option value="">Select an option</option>
                            {options}
                            </select>
                    </div>
                )
            }

            // checkbox
            else if (obj[key].inputFormType === "checkbox") {
                let options = []
                // iterate through the options and create a checkbox for each option
                Object.keys(obj[key].option).forEach(sub_key => {
                    options.push(
                        <div name="checkbox" className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name={key} 
                                value={obj[key].option[sub_key]}
                                id="inlineCheckbox1"
                                onChange={handleCheckBoxChange}
                            />
                            <div>
                                <label for="inlineCheckbox1" className="form-check-label">{obj[key].option[sub_key]}&nbsp;&nbsp;</label>
                            </div>
                        </div>
                    )
                })
                // create the field with checkboxes
                field = (
                    <div className={`${Object.keys(obj[key].option).length > 3 ? styles['checkbox-box-wide'] : styles['checkbox-box']}`} {...obj[key].required && {required: true}}>
                        <div>
                            <label class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-normal">Optional</div>}
                            {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                        </div>
                        <div>{options}</div>
                    </div>
                )
                // className={`${Object.keys(obj[key].option).length > 2 ? styles['checkbox-options-box-wide'] : styles['checkbox-options-box']}`}
            }

            // date
            else if (obj[key].inputFormType === "date") {
                field = (
                    <div className={`${styles['dateTime-box']}`}>
                        <Form>
                            <Form.Group controlId="date-picker">
                                <div>
                                    <Form.Label for={obj[key].name} class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</Form.Label>
                                    {!obj[key].required && <div className="badge bg-secondary text-wrap fw-bold" >Optional</div>}
                                    {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                                </div>
                                <FormControl name={key} type="date" onChange={handleDateChange} {...obj[key].required ? {required: true} : {required: false}}/>
                            </Form.Group>
                        </Form>
                    </div>
                )
            }

            // time
            else if (obj[key].inputFormType === "time") {
                field = (
                    <div className={`${styles['dateTime-box']}`}>
                        <Form>
                            <Form.Group controlId="time-picker">
                                <div>
                                    <Form.Label for={obj[key].name} class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</Form.Label>
                                    {!obj[key].required && <div className="badge bg-secondary text-wrap fw-bold" >Optional</div>}
                                    {invalidFields.includes(key) && <div className="badge bg-danger text-wrap fw-semibold">Required</div>}
                                </div>
                                <FormControl name={key} type="time" onChange={handleTimeChange} {...obj[key].required ? {required: true} : {required: false}}/>
                            </Form.Group>
                        </Form>
                    </div>
                )
            }
            fields.push(field)
        })

        return (
            <div className={styles['box']}>
                {fields}
            </div>
        )
    }

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <h1 className={styles['h1']}>Create&nbsp;</h1> 
                <h1 className={styles['new-specimen']}>new specimens</h1>
            </div>
            <form className={styles['form']} onSubmit={handleSubmit} noValidate>
                {forms}
                <div className={styles['buttons']}>
                    <button className={`btn btn-outline-secondary btn-lg ${styles['saveBtn']}`} type="button">Save draft </button>
                    <button className={`btn btn-dark btn-lg ${styles['submitBtn']}`} type="submit">Publish </button>
                </div>
            </form>
        </div>
    )
}

