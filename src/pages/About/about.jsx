import { MapPin, Code2, BriefcaseBusiness } from 'lucide-react'
import './about.scss'

function About() {
    return (
        <section className="about">
            <div className="about-container">
                <div className="about-heading">
                    <span className="about-heading-prefix">&gt;</span>
                    <h1>À propos de moi</h1>
                    <div className="about-heading-line"></div>
                </div>
                <div className="about-content">
                    <div className="about-intro">
                        <span className="about-eyebrow">// QUI SUIS-JE ?</span>
                        <h2>Développeur Web <span>passionné par la création.</span></h2>
                        <p>Je suis Mael, développeur web basé dans le Finistère.
                           J'aime transformer des idées en expériences numériques
                           modernes, accessibles et performantes.
                        </p>
                        <p>Mon approche repose sur la simplicité, la curiosité
                           et le souci du détail. J'accorde autant d'importance
                           à l'expérience utilisateur qu'à la qualité du code.
                        </p>
                        <p>Aujourd'hui, je développe mes propres projets et
                           construis mon activité de développeur web indépendant.
                        </p>
                    </div>
                    <aside className="about-profile">
                        <div className="about-profile-top">
                            <span>PROFILE.JSON</span>
                            <span className="about-profile-status">
                                <span className="about-profile-status-dot"></span>
                                Disponible
                            </span>
                        </div>
                        <div className="about-profile-avatar">
                            <Code2 size={42} strokeWidth={1.3}/>
                        </div>
                        <h3>Mael Favennec</h3>
                        <span className="about-profile-role">
                            Développeur Web
                        </span>
                        <div className="about-profile-details">
                            <div className="about-profile-detail">
                                <MapPin size={17}/>
                                <span>Finistère, France</span>
                            </div>
                            <div className="about-profile-detail">
                                <Code2 size={17}/>
                                <span>React · JavaScript · Node.js</span>
                            </div>
                            <div className="about-profile-detail">
                                <BriefcaseBusiness size={17}/>
                                <span>Projets web & freelance</span>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="about-footer">
                    <span>01 / À PROPOS</span>
                    <span>Curiosité. Créativité. Développement.</span>
                </div>
            </div>
        </section>
    )
}

export default About