import { useState } from "react"

export default function MyInput() {

    const [myInputValue, setMyValue] = useState("")

    function handleInputChange(event) {
        setMyValue(event.target.value)
    }
    return (
        <div>
            <label>Your Name: </label>
            <input value={myInputValue} onChange={hande} />
        </div>
    )
}