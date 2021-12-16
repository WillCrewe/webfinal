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
                className="rounded px-5 py-3 my-3 w-3/5"
                onChange={(e) => setValue(e.target.value)}
            >
            </input>
            <button type="submit" className="bg-indigo-300 rounded px-12 py-2 mx-3 w-48 text-white">
                Save
            </button>
            <style jsx>{`
              form {
                display: flex;
                justify-content: center;
              }
            `}</style>
        </form>
    )
}