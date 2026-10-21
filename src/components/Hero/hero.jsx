import './hero.scss'

function Hero() {
    return (
        <section className="hero">
            <span className="hero-intro">
                BIENVENUE DANS MON UNIVERS
            </span>
            <h1 className="hero-title">
                Mael <span>Favennec</span>
            </h1>
            <h2 className="hero-subtitle">
                Développeur Web
            </h2>
            <p className="hero-description">
                Je transforme des idées en expériences web
            </p>
        </section>
    )
}

export default Hero