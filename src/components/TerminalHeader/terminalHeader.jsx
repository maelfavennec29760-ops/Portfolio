import './terminalHeader.scss'

function TerminalHeader() {
    const date = new Date().toLocaleDateString('fr-FR')
    return(
        <header className="terminal-header">
            <div className="terminal-header-dot">
                <span className="dot red"></span>
                <span className="dot orange"></span>
                <span className="dot green"></span>
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