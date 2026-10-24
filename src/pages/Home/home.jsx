import { Link } from 'react-router-dom'
import navigation from '../../data/navigation.js'
import './home.scss'

function Home() {
    return (
        <section className="home">
            <div className="home-intro">
                <p className="home-greeting">Bonjour, je suis</p>
                <h1 className="home-name">MAEL FAVENNEC</h1>
                <p className="home-role">DÉVELOPPEUR WEB</p>
                <p className="home-description">
                    Passionné par le développement web, je conçois
                    <br />
                    des expériences modernes, performantes et intuitives.
                </p>
            </div>
            <nav className="home-navigation" aria-label="Navigation principale">
                {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link key={item.path} to={item.path} className="home-card">
                            <Icon className="home-card-icon" size={25}/>
                            <span className="home-card-title">{item.title}</span>
                            <span className="home-card-subtitle">{item.subtitle}</span>
                        </Link>
                    )
                })}
            </nav>
            <p className="home-hint">
                &gt; Sélectionnez une section... 
                <span className="home-cursor">_</span>
            </p>
        </section>
    )
}

export default Home