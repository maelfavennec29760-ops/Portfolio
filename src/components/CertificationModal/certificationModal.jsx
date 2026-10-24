import { createPortal } from 'react-dom'
import { Award, ExternalLink, X } from 'lucide-react'
import certifications from '../../data/certifications.js'
import './certificationModal.scss'
import { useEffect, useRef } from 'react'

function CertificationModal({ isOpen, onClose }) {
    const closeButtonRef = useRef(null)
    useEffect(() => {
        if(!isOpen) return
        const previousOverflow = document.body.style.overflow
        const previousFocus = document.activeElement
        document.body.style.overflow = "hidden"
        closeButtonRef.current?.focus()
        const handlekeyDow = (event) => {
            if(event.key === "Escape") {
                onClose()
            }
            if(event.key === "Tab") {
                const modal = closeButtonRef.current?.closest(".certification-modal")
                const focusable = modal?.querySelectorAll("button:not([disabled]), a[href]")
                if(!focusable?.length) return
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if(event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                } else if (
                    !event.shiftKey && document.activeElement === last
                ) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }
        document.addEventListener("keydown", handlekeyDow)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener("keydown", handlekeyDow)
            previousFocus?.focus?.()
        }
    }, [isOpen, onClose])
    if(!isOpen) return null
    return createPortal(
        <div className="certification-overlay"
             onMouseDown={(event) => {
                if(event.target === event.currentTarget) {
                    onClose()
                }
             }} 
        >
            <div className="certification-modal"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="certification-modal-title"
            >
                <div className="certification-modal-header">
                    <div className="certification-modal-heading">
                        <span className="certification-modal-prefix">&gt;</span>
                        <h2 id="certification-modal-title">Mes certifications</h2>
                    </div>
                    <button className="certification-modal-close"
                            type="button"
                            ref={closeButtonRef}
                            onClick={onClose}
                            aria-label="Fermer la fenêtre"
                    >
                        <X size={20} />
                    </button>
                </div>
                <p className="certification-modal-description">
                    Certifications et formations complémentaires validées.
                </p>
                <div className="certification-modal-list">
                    {certifications.map((certification) => (
                        <article className="certification-modal-card" key={certification.id}>
                            <div className="certification-modal-icon">
                                <Award size={26} strokeWidth={1.6}/>
                            </div>
                            <div className="certification-modal-details">
                                <span className="certification-modal-issuer">
                                    {certification.issuer}
                                </span>
                                <h3>{certification.title}</h3>
                                <p>{certification.date}</p>
                            </div>
                            <a href={certification.url}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="certification-modal-link"
                            >
                                Vérifier
                                <ExternalLink size={15}/>
                            </a>
                        </article>
                    ))}
                </div>
                <div className="certification-modal-footer">
                    <span>
                        {String(certifications.length).padStart(2, "0")} / {" "}CERTIFICATIONS
                    </span>
                    <span>Compétences reconnues & certifiées</span>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default CertificationModal