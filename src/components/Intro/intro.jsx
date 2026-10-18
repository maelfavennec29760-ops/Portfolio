import { useState } from 'react'
import './intro.scss'

function Intro() {
    const [isStarted, setIsStarted] = useState(false)
    const handleEnter = () => {
        setIsStarted(true)
        console.log("Running intro")
    }
    return (
        <main className="intro">

        </main>
    )
}

export default Intro