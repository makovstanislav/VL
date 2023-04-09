import styles from "../../styles/add-item.module.css"
import formData from "../../etc/item_metadata.json"
import { Form, FormControl } from 'react-bootstrap'
import { useState, useEffect } from "react"
export default function AddItemForm({handleChange, handleDateChange, handleTimeChange, handleCheckBoxChange, handleSubmit, details}) {

    const [forms, setForms] = useState([])

    useEffect(() => {
        setForms([createFields(formData.item.details), createFields(formData.item.pricingAndAvailability), createFields(formData.item.shipping)])
    }, [details])

    // create fields based on the JSON file
    function createFields(obj) {
        const fields = []

        Object.keys(obj).forEach(key => {
            let field = (<></>)
            if (obj[key].inputFormType === "text") {
                field = (
                    <div className={`mb-3 ${styles['description']}`}>
                        <label for={obj[key].name} class="form-label">{obj[key].name}</label>
                        <p>{obj[key].description}</p>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name={key}
                            value={details[key]}
                        ></input>
                    </div>
                )
            } else if (obj[key].inputFormType === "radio") {
                let options = []
                Object.keys(obj[key].option).forEach(sub_key => {
                    options.push(
                        <option value={obj[key].option[sub_key]}>
                            {obj[key].option[sub_key]}
                        </option>
                    )
                })
                field = (
                    <div>
                        <label for='type' class="form-label">{obj[key].name}</label>
                        <p>{obj[key].description}</p> 
                            <select 
                                class="form-select" 
                                name={key}
                                aria-label="Default select example" 
                                value={details[key]}
                                onChange={handleChange}
                            >
                            {options}
                            </select>
                    </div>
                )
            } else if (obj[key].inputFormType === "number") {
                field = (
                    <div className={`mb-3 ${styles['description']}`}>
                        <label for={obj[key].name} class="form-label">{obj[key].name}</label>
                        <p>{obj[key].description}</p>
                        <input
                            type="number"
                            class="form-control"
                            onChange={handleChange}
                            name={key}
                            value={details[key]}
                        ></input>
                    </div>
                )
            } else if (obj[key].inputFormType === "checkbox") {
                let options = []
                Object.keys(obj[key].option).forEach(sub_key => {
                    options.push(
                        <div name="checkbox" className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name={key} 
                                value={obj[key].option[sub_key]}
                                onChange={handleCheckBoxChange}
                            />
                            <label for="checkbox">{obj[key].option[sub_key]}</label>
                        </div>
                    )
                })
                field = (
                    <div>
                        <label for='checkbox' class="form-label">{obj[key].name}</label>
                        {options}
                    </div>
                )
            } else if (obj[key].inputFormType === "date") {
                field = (
                    <div>
                        <Form>
                            <Form.Group controlId="date-picker">
                                <Form.Label>Select a date:</Form.Label>
                                <FormControl name={key} type="date" onChange={handleDateChange} />
                            </Form.Group>
                        </Form>
                    </div>
                )
            } else if (obj[key].inputFormType === "time") {
                field = (
                    <div className="container">
                        <Form>
                            <Form.Group controlId="time-picker">
                                <Form.Label>Select a time:</Form.Label>
                                <FormControl name={key} type="time" onChange={handleTimeChange} />
                            </Form.Group>
                        </Form>
                    </div>
                )
            }
            fields.push(field)
        }) 
        return fields
    }

    return (
        <div className={styles['container']}>
            <h3>Create new specimens</h3>
            <form className={styles['form']} onSubmit={handleSubmit}>
                {forms}
                <button 
                    class="btn btn-primary" 
                    type="submit">Publish
                </button>
            </form>
        </div>
    )
}

