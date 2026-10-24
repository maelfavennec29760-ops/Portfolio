import { Link, useMatch } from 'react-router-dom'
import { House } from 'lucide-react'
import './terminalHeader.scss'

function TerminalHeader() {
    const date = new Date().toLocaleDateString('fr-FR')
    const isHome = Boolean(
        useMatch({path: '/portfolio', end: true})
    )
    return(
        <header className="terminal-header">
            <div className="terminal-header-dot">
                <span className="dot red"></span>
                <span className="dot orange"></span>
                <span className="dot green"></span>
                {!isHome && (
                    <Link
                        to="/portfolio"
                        className="terminal-header-home"
                        aria-label="Retour à l'accueil"
                        title="Retour à l'accueil"
                    >
                        <House size={16}/>
                    </Link>
                )}
            </div>
            <span className="terminal-header-title">
                mael@portfolio:~/
            </span>
            <time className="terminal-header-date">
                {date}
            </time>
        </header>
    )
}

export default TerminalHeader