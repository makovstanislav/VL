import React, {useState} from "react"
import {ref, set } from "firebase/database"
import {database} from "../firebaseClient"

export default function Note() {
    
    const [note, setNote] = useState("")

    function writeUserData() {
        set(ref(database, "note"), note);
      }

    function handleChange(event) {
        event.preventDefault()
        const value = event.target.value
        setNote(value)
        writeUserData()
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
