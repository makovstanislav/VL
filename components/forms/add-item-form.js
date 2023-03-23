export default function AddItemForm({handleChange, handleSubmit, details}) {

    return (
        <div >
            <h3>Create new specimens</h3>
            <form onSubmit={handleSubmit}>
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
                <div class="mb-3">
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
                <div> 
                    <select 
                        class="form-select" 
                        name="mouse_strain"
                        aria-label="Default select example" 
                        placeholder="Choose a strain" 
                        value={details.mouse_strain}
                        onChange={handleChange}
                    >  
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div> 
                    <select 
                        class="form-select" 
                        name="tissue"
                        aria-label="Default select example" 
                        placeholder="Choose a strain" 
                        value={details.tissue}
                        onChange={handleChange}
                    >  
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div> 
                    <select 
                        class="form-select" 
                        name="type"
                        aria-label="Default select example" 
                        placeholder="Choose a strain" 
                        value={details.type}
                        onChange={handleChange}
                    >  
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div> 
                    <select 
                        class="form-select" 
                        name="storage_condition"
                        aria-label="Storage condition" 
                        placeholder="Choose a strain" 
                        value={details.storage_condition}
                        onChange={handleChange}
                    >
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <button class="btn btn-primary" type="submit">Publish</button>
            </form>
        </div>
    )
}

