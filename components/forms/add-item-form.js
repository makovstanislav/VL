import styles from "../../styles/add-item.module.css"
import formData from "../../etc/item_metadata.json"

export default function AddItemForm({handleChange, handleSubmit, details}) {
    
    return (
        <div className={styles['container']}>
            <h3>Create new specimens</h3>
            {Object.keys(formData.item.details).forEach(key => {
                    if (formData.item.details[key].type === "text") {
                        console.log(formData.item.details[key].name)
                        return (
                            <div className={`mb-3 ${styles['description']}`}>
                                <label for={formData.item.details[key].name} class="form-label">{formData.item.details[key].name}</label>
                                <p>{formData.item.details[key].description}</p>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder=''
                                    onChange={handleChange}
                                    name={formData.item.details[key].name}
                                    value={details.name}
                                ></input>
                            </div>
                        )
                    }
                })}
            <form className={styles['form']} onSubmit={handleSubmit}>
                <div className={styles['basic-inputs']}>
                    <div class="mb-3">
                        <label for='title' class="form-label">Collection title</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name="title"
                            value={details.title}
                        ></input>
                    </div>
                    <div className={`mb-3 ${styles['description']}`}>
                        <label for='description' class="form-label">Description</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name="description"
                            value={details.description}
                        ></input>
                    </div>
                </div>
                <div className={styles['selections']}>
                    <div>
                        <label for='strain' class="form-label">Strain</label> 
                        <select 
                            class="form-select" 
                            name="strain"
                            aria-label="Default select example" 
                            value={details.strain}
                            onChange={handleChange}
                        >  
                            <option value="C57BL/6J" selected>C57BL/6J</option>
                            <option value="DBA2J">DBA2J</option>
                            <option value="CD1">CD1</option>
                            <option value="PWK">PWK</option>
                        </select>
                    </div>

                    <div>
                        <label for='type' class="form-label">Sample type</label> 
                        <select 
                            class="form-select" 
                            name="type"
                            aria-label="Default select example" 
                            value={details.type}
                            onChange={handleChange}
                        >  
                            <option value="Blood" selected>Blood</option>
                            <option value="Urine">Urine</option>
                            <option value="Stool">Stool</option>
                            <option value="Tissue">Tissue</option>
                            <option value="Cells">Cells</option>
                            <option value="Saliva">Saliva</option>
                            <option value="Swabs">Swabs</option>
                            <option value="DNA">DNA</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label for='description' class="form-label">Storage condition</label> 
                        <select 
                            class="form-select" 
                            name="storage_condition"
                            aria-label="Storage condition" 
                            value={details.storage_condition}
                            onChange={handleChange}
                        >
                            <option value="Good" selected>Good</option>
                            <option value="Bad">Bad</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                    </div>

                    <div> 
                        <label for='availability' class="form-label">Availability</label>
                        <select 
                            class="form-select" 
                            name="availability"
                            aria-label="Default select example" 
                            value={details.availability}
                            onChange={handleChange}
                        >  
                            <option value="In stock" selected>In stock</option>
                            <option value="On demand">On demand</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>

                    <div className={`mb-3 ${styles['description']}`}>
                        <label for='source' class="form-label">Source organism</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name="source"
                            value={details.source}
                        ></input>
                    </div>

                    <div className={`mb-3 ${styles['description']}`}>
                        <label for='site' class="form-label">Site</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name="site"
                            value={details.site}
                        ></input>
                    </div>

                    <div className={`mb-3 ${styles['description']}`}>
                        <label for='price' class="form-label">Price</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder=''
                            onChange={handleChange}
                            name="price"
                            value={details.price}
                        ></input>
                    </div>
                    
                </div>
                <button class="btn btn-primary" type="submit">Publish</button>
            </form>
        </div>
    )
}

