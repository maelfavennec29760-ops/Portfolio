import { UserRound, Folder, Code2, Mail } from 'lucide-react'

const navigation = [
    {
        title: "À PROPOS",
        subtitle: "Mon parcours",
        icon: UserRound,
        path: '/portfolio/about'
    },
    {
        title: "PROJETS",
        subtitle: "Mes réalisations",
        icon: Folder,
        path: '/portfolio/projects'
    },
    {
        title: "COMPÉTENCES",
        subtitle: "Mes outils",
        icon: Code2,
        path: '/portfolio/skills'
    },
    {
        title: "CONTACT",
        subtitle: "Travaillons ensemble",
        icon: Mail,
        path: '/portfolio/contact'
    }
]

export default navigation