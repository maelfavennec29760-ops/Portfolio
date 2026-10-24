import { NavLink } from "react-router-dom";
import navigation from '../../data/navigation.js'
import './terminalNavigation.scss'

function TerminalNavigation() {
    return (
        <nav className="terminal-navigation" aria-label="Navigation du portfolio">
            {navigation.map((item) => {
                const Icon = item.icon
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "terminal-navigation-link active"
                                : "terminal-navigation-link" 
                        }
                    >
                        <Icon size={17}/>
                        <span>{item.title}</span>
                    </NavLink>
                )
            })}
        </nav>
    )
}

export default TerminalNavigation