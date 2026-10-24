import { useLocation } from "react-router-dom"
import TerminalHeader from "../TerminalHeader/terminalHeader.jsx"
import TerminalNavigation from "../TerminalNavigation/terminalNavigation.jsx"
import './terminalLayout.scss'

function TerminalLayout({ children }) {
    const location = useLocation()
    const isHome = location.pathname === '/portfolio'
    return (
        <div className="terminal-layout">
            <TerminalHeader/>
            {!isHome && <TerminalNavigation/>}
            <main className="terminal-layout-content">
                {children}
            </main>
        </div>
    )
}

export default TerminalLayout