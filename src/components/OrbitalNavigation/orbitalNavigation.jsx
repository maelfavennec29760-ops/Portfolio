import { useNavigate } from 'react-router-dom'
import { UserRound, CodeXml, Folder, GraduationCap, Mail } from 'lucide-react'
import Planet from '../Planet/planet.jsx'
import Hero from '../Hero/hero.jsx'
import './orbitalNavigation.scss'

const sections = [
    {
        name: "À propos",
        icon: UserRound,
        path: '/portfolio/about',
        position: "about"
    },
        {
        name: "Compétences",
        icon: CodeXml,
        path: '/portfolio/skills',
        position: "skills"
    },
        {
        name: "Projets",
        icon: Folder,
        path: '/portfolio/projects',
        position: "projects"
    },
        {
        name: "Parcours",
        icon: GraduationCap,
        path: '/portfolio/journey',
        position: "journey"
    },
        {
        name: "Contact",
        icon: Mail,
        path: '/portfolio/contact',
        position: "contact"
    }
]

function OrbitalNavigation() {
    const navigate = useNavigate()
    return (
        <main className="orbital-navigation">
            <div className="orbital-navigation-stars" aria-hidden="true"/>
            <div className="orbital-navigation-system">
                <div className="orbital-navigation-orbit"/>
                <div className="orbital-navigation-hero">
                    <Hero/>
                </div>
                    {sections.map((section) => (
                        <div key={section.position} className={`orbital-navigation-item orbital-navigation-item--${section.position}`}>
                            <Planet name={section.name} icon={section.icon} onClick={() => navigate(section.path)}/>
                        </div>
                    ))}
            </div>
        </main>
    )
}

export default OrbitalNavigation