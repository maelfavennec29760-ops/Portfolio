import { useEffect, useState } from 'react'
import './terminal.scss'

const bootLines = [
    "> Chargement du système... OK",
    "> Vérification des modules... OK",
    "> Système opérationnel... OK"
]

const authenticationLines = [
    "[✓] Identifiant : visiteur",
    "[✓] Mot de passe : ********",
    "[✓] Accès autorisé"
]

function Terminal() {
    const [step, setStep] = useState(0)
    const [displayedText, setDisplayedText] = useState("")
    const [lineIndex, setLineIndex] = useState(0)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [progress, setProgress] = useState(0)
    const [isConnecting, setIsconnecting] = useState(false)
    const [authText, setAuthText] = useState("")
    //Apparaition du terminal
    useEffect(() => {
        if(step !== 0) return
        const timeout = setTimeout(() => {
            setStep(1)
        }, 800)
        return () => clearTimeout(timeout)
    }, [step])
    //Iniatialisation
    useEffect(() => {
        if(step !== 1) return
        const text = "> Initialisation du portfolio..."
        let index = 0
        let timeout
        const interval = setInterval(() => {
            index++
            setDisplayedText(text.slice(0, index))
            if(index >= text.length) {
                clearInterval(interval)
                timeout = setTimeout(() => setStep(2), 600)
            }
        }, 65)
        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [step])
    //Vérification du système
    useEffect(() => {
        if(step !== 2) return
        if(lineIndex >= bootLines.length) {
            const timeout = setTimeout(() => setStep(3), 700)
            return () => clearTimeout(timeout)
        }
        const timeout = setTimeout(() => {
            setLineIndex((prev) => prev + 1)
        }, 650)
        return () => clearTimeout(timeout)
    }, [step, lineIndex])
    //Connexion automatique
    useEffect(() => {
        if(step !== 3) return
        let usernameIndex = 0
        let passwordIndex = 0
        let passwordInterval
        let timeout
        const usernameInterval = setInterval(() => {
            usernameIndex++
            setUsername("visiteur".slice(0, usernameIndex))
            if(usernameIndex >= 8) {
                clearInterval(usernameInterval)
                passwordInterval = setInterval(() => {
                    passwordIndex++
                    setPassword("*".repeat(passwordIndex))
                    if(passwordIndex >= 8) {
                        clearInterval(passwordInterval)
                        setIsconnecting(true)
                        timeout = setTimeout(() => {
                            setLineIndex(0)
                            setStep(4)
                        }, 850)
                    }
                }, 110)
            }
        }, 110)
        return () => {
            clearInterval(usernameInterval)
            clearInterval(passwordInterval)
            clearTimeout(timeout)
        }
    }, [step])
    //Authentification
    useEffect(() => {
        if(step !== 4) return
        if(lineIndex >= authenticationLines.length) {
            const timeout = setTimeout(() => {
                setStep(5)
            }, 800)
            return () => clearTimeout(timeout)
        }
        const text = authenticationLines[lineIndex]
        let index = 0
        let timeout
        setAuthText("")
        const interval = setInterval(() => {
            index++
            setAuthText(text.slice(onabort, index))
            if(index >= text.length) {
                clearInterval(interval)
                timeout = setTimeout(() => {
                    setLineIndex(prev => prev + 1)
                }, 400)
            }
        }, 45)
        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [step, lineIndex])
    //Chargement du portfolio
    useEffect(() => {
        if(step !== 5) return
        const interval = setInterval(() => {
            setProgress((prev) => {
                if(prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return Math.min(prev + 2, 100)
            })
        }, 40)
        return () => clearInterval(interval)
    }, [step])
    return (
        <div className="terminal">
            <div className="terminal-header">
                <span/>
                <span/>
                <span/>
            </div>
            <div className="terminal-content">
                {step === 1 && (
                    <p>
                        {displayedText}
                        <span className="terminal-cursor">_</span>
                    </p>
                )}
                {step === 2 && (
                    <div className="terminal-lines">
                        {bootLines.slice(0, lineIndex).map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                        <span className="terminal-cursor">_</span>
                    </div>
                )}
                {step === 3 && (
                    <div className="terminal-login">
                        <p>&gt; Bienvenue sur le portfolio de Mael</p>
                        <p>&gt; Veuillez vous identifier pour continuer</p>
                        <div className="terminal-form">
                            <div className="terminal-field">
                                <label>Identifiant :</label>
                                <input type="text" value={username} readOnly/>
                            </div>
                            <div className="terminal-field">
                                <label>Mot de passe :</label>
                                <input type="text" value={password} readOnly/>
                            </div>
                            <button type="button" className={isConnecting ? "terminal-button-active" : ""}>
                                [ Se connecter ]
                            </button>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div className="terminal-authentication">
                        <p>&gt; Authentification en cours...</p>
                        {authenticationLines.slice(0, lineIndex).map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                        {lineIndex < authenticationLines.length && (
                            <p>
                                {authText}
                                <span className="terminal-cursor">_</span>
                            </p>
                        )}
                    </div>
                )}
                {step === 5 && (
                    <div className="terminal-loading">
                        <p className="terminal-success">
                            &gt; Accès autorisé !
                        </p>
                        <p>&gt; Chargement du portfolio...</p>
                        <div className="terminal-progress">
                            <div className="terminal-progress-bar" style={{width: `${progress}%`}}/>
                        </div>
                        <span>{progress}%</span>
                        {progress === 100 && (
                            <p>&gt; Bienvenue !</p>
                        )}
                    </div>
                )} 
            </div>
        </div>
    )
}

export default Terminal