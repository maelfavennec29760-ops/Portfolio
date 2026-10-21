import { useState } from 'react'
import Terminal from '../Terminal/terminal.jsx'
import './portal.scss'

function Portal() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <section className="portal">
      {!isStarted ? (
        <button
          className="portal__start"
          onClick={() => setIsStarted(true)}
        >
          INITIALISER
        </button>
      ) : (
        <div className="portal__terminal">
          <Terminal />
        </div>
      )}
    </section>
  )
}

export default Portal