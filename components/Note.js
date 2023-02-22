import React, {useState} from "react"

export default function Note() {
    
    const [note, setNote] = useState("")


    function handleChange(event) {
        event.preventDefault()
        const value = event.target.value
        setNote(value)
    }

    return (
        <div>
            <input 
                value={note}
                placeholder="Note..."
                onChange={handleChange}
            />
        </div>
    )
}
