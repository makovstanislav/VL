
export default function AddItemForm({handleChange, handleSubmit, details}) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='product name'
                    onChange={handleChange}
                    name="name"
                    value={details.name}
                ></input>
                <input
                    type="text"
                    placeholder='price'
                    onChange={handleChange}
                    name="price"
                    value={details.price}
                ></input>
                <input
                    type="text"
                    placeholder='description'
                    onChange={handleChange}
                    name="description"
                    value={details.description}
                ></input>
                <button type="submit">Post the item</button>
            </form>
        </div>
    )
}

