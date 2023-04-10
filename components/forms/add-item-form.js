import styles from "../../styles/add-item.module.css"
import formData from "../../etc/item_metadata.json"
import { Form, FormControl } from 'react-bootstrap'
import { useState, useEffect } from "react"
export default function AddItemForm({handleChange, handleDateChange, handleTimeChange, handleCheckBoxChange, handleSubmit, details, validated}) {

    const [forms, setForms] = useState([])

    useEffect(() => {
        setForms([
            createFields(formData.item.details), 
            createFields(formData.item.pricingAndAvailability), 
            createFields(formData.item.shipping)
        ])
    }, [details])

    // create fields based on the JSON file
    function createFields(obj) {
        const fields = []

        // iterate through the JSON file based on the inputFormType and create the corresponding form field
        Object.keys(obj).forEach(key => {
            let field = (<></>)

            // text field
            if (obj[key].inputFormType === "text") {
                field = (
                    <div className={`mb-3 ${obj[key].lengthMax > 60 ? styles['field-normal'] : styles['field-box']}`}>
                        <div>
                            <label for="validationCustom01" class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-semibold" >Optional</div>}
                        </div>
                        <input
                            id="validationCustom01"
                            type="text"
                            className={`form-control ${obj[key].lengthMax > 60 && styles['inputTextBig']}`}
                            onChange={handleChange}
                            name={key}
                            value={details[key]}
                            {...obj[key].required ? {required: true} : {required: false}}
                        ></input>
                    </div>
                )
            }

            // number 
            else if (obj[key].inputFormType === "number") {
                field = (
                    <div className={`mb-3 ${styles['number-box']}`}>
                        <div>
                            <label for={obj[key].name} class="form-label fw-semibold">{obj[key].name}&nbsp;&nbsp;</label>
                            {!obj[key].required && <div className="badge bg-secondary text-wrap fw-semibold" >Optional</div>}
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
                        </div>
                        {(obj[key].required && details[key] === "" && validated === false) && <p className="text-danger">Please select an option</p>}
                            <select 
                                class="form-select" 
                                name={key}
                                aria-label="Default select example" 
                                value={details[key]}
                                onChange={handleChange}
                                {...obj[key].required ? {required: true} : {required: false}}
                            >
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
            <form className={styles['form']} onSubmit={handleSubmit}>
                {forms}
            </form>
            <div className={styles['buttons']}>
                <button className={`btn btn-secondary btn-lg ${styles['saveBtn']}`} type="button">Save draft </button>
                <button className={`btn btn-primary btn-lg ${styles['submitBtn']}`} type="submit">Publish </button>
            </div>
        </div>
    )
}

