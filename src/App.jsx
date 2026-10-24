
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import TerminalLayout from './components/TerminalLayout/terminalLayout.jsx'
import Home from './pages/Home/home.jsx'
import About from './pages/About/about.jsx'
import Skills from './pages/Skills/skills.jsx'

function PortfolioLayout() {
  return (
    <div className="app">
      <TerminalLayout>
        <Outlet />
      </TerminalLayout>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/portfolio" replace />} />

      <Route path="/portfolio" element={<PortfolioLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<h1>Mes projets</h1>} />
        <Route path="skills" element={<Skills />} />
        <Route path="contact" element={<h1>Contact</h1>} />
      </Route>
    </Routes>
  )
}

export default App
