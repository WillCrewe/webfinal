import { useState } from "react"

export default function InputFit ({ handleSubmit }) {
    let [value, setValue] = useState("")

    let submitForm = e => {
            console.log(value)
            var b = parseInt(value)
            if(!b) {
                console.log("not a string")
            } else {
                e.preventDefault()
                handleSubmit(b)
                setValue = ""
            }
    }

    return (
        <form onSubmit={submitForm}>
            <input 
                placeholder = "Enter Calories Burned"
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
            </input>
            <button type="submit">
                Save
            </button>
            <style jsx>{`
            
              form {
                display: flex;
                justify-content: center;
              }

              input {
                border-radius: 10px 0px 0px 10px;
                border-color: #10B203;
                overflow-wrap: normal;
              }

              button {
                border-radius: 0px 10px 10px 0px;
                border-color: #10B203;
                overflow-wrap: normal;
              }

            `}</style>
        </form>
    )
}