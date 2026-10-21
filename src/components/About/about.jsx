import { useNavigate } from "react-router-dom";
import { House, CodeXml, Gamepad2, Rocket } from 'lucide-react'
import './about.scss'

const cards = [
    {
        number: "01",
        title: "Développement",
        icon: CodeXml,
        description: "Je crée des sites web modernes, performants et adaptés aux besoins de chaque projet."
    },
    {
        number: "02",
        title: "Passions",
        icon: Gamepad2,
        description: "Anime, jeux vidéo et nouvelles technologies font partie de mon quotidien et nourissent ma créativité."
    },
    {
        number: "03",
        title: "Objectif",
        icon: Rocket,
        description: "Devenir développeur web freelance et créer des projets qui ont du sens et offrent une vraie exprérience utilisateur"
    }
]

function About() {
    const navigate = useNavigate()
    return (
        <main className="about">
            <div className="about-container">
                <button className="about-back" type="button" onClick={() => navigate('/portfolio')}>
                    <span className="about-back-icon">
                        <House size={22}/>
                    </span>
                    <span>Retour à l'accueil</span>
                </button>
                <section className="about-introduction">
                    <div className="about-content">
                        <div className="about-section-label">
                            <span>01</span>
                            <span className="about-section-line"/>
                            <span>À PROPOS</span>
                        </div>
                        <h1 className="about-title">
                            À propos <span>de moi</span>
                        </h1>
                        <div className="about-title-line"/>
                        <div className="about-description">
                            <p className="about-description-lead">
                                Je suis Mael, développeur web passionné par la création d'exprériences web modernes, performantes et immersives.
                            </p>
                            <p>J'aime transformer des idées en projets concrets, en combinant design, performance et technologie actuelles.</p>
                            <p>Toujours curieux et motivé, je cherche constamment à apprendre de nouvelle chose et à relever de nouveau défis.</p>
                        </div>
                    </div>
                    <div className="about-decoration">
                        <div className="about-decoration-words">
                            <span>CODE</span>
                            <span>CRÉATIVITÉ</span>
                            <span>PASSION</span>
                            <span>ÉVOLUTION</span>
                        </div>
                    </div>
                </section>
                <section className="about-cards" aria-label="Mes centres d'intéret et objectifs">
                    {cards.map((card) => {
                        const Icon = card.icon
                        return (
                            <article className="about-card" key={card.number}>
                                <div className="about-card-header">
                                    <span className="about-card-icon">
                                        <Icon size={26} strokeWidth={1.8}/>
                                    </span>
                                </div>
                                <h2>{card.title}</h2>
                                <p>{card.description}</p>
                                <div className="about-card-line"/>
                            </article>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}

export default About