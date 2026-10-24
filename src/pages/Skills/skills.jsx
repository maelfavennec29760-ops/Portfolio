import { useState } from 'react'
import {Award, ArrowUpRight} from 'lucide-react'
import skillGroups from '../../data/skills.js'
import CertificationModal from '../../components/CertificationModal/certificationModal.jsx'
import './skills.scss'

function Skills() {
    const [isCertificationOpen, setIsCertificationOpen] = useState(false)
    return (
        <section className="skills">
            <div className="skills-container">
                <div className="skills-heading">
                    <span className="skills-heading-prefix">&gt;</span>
                    <h1>Mes compétences</h1>
                    <div className="skills-heading-line"></div>
                </div>
                <div className="skills-content">
                    <div className="skills-grid">
                        {skillGroups.map((group) => {
                            const Icon = group.icon
                            return(
                                <article className="skills-card" key={group.title}>
                                    <div className="skills-card-header">
                                        <Icon size={28} strokeWidth={1.8}/>
                                        <div>
                                            <h2>{group.title}</h2>
                                            <p>{group.description}</p>
                                        </div>
                                    </div>
                                    <div className="skills-card-tags">
                                        {group.skills.map((skill) => (
                                            <span className="skills-tag" key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    <div className="skills-certifications">
                        <div className="skills-certifications-info">
                            <div className="skills-certifications-icon">
                                <Award size={30} strokeWidth={1.7}/>
                            </div>
                            <div>
                                <h2>Mes certifications</h2>
                                <p>1 certification obtenue</p>
                            </div>
                        </div>
                        <button type="button" className="skills-certifications-button" onClick={() => setIsCertificationOpen(true)}>
                            Voir mes certifications
                            <ArrowUpRight size={17}/>
                        </button>
                    </div>
                </div>
                <div className="skills-footer">
                    <span>03 / COMPÉTENCES</span>
                    <span>Technologies & outils</span>
                </div>
            </div>
            <CertificationModal isOpen={isCertificationOpen} onClose={() => setIsCertificationOpen(false)}/>
        </section>
    )
}

export default Skills