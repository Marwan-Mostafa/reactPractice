import './Button.css'
import { useState } from 'react'


export default function TagButton({ buttonName, children }) {

    const state = useState("Ahmed")
    console.log(state)
    return (
        <button className="tagButton">
            {buttonName}
            {children}
        </button>
    )
}