import { Routes, Route } from 'react-router-dom'

import Portal from './components/Portal/portal'
import OrbitalNavigation from './components/OrbitalNavigation/orbitalNavigation.jsx'
import About from './components/About/about.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portal />} />
      <Route path="/portfolio" element={<OrbitalNavigation />} />
      <Route path='/portfolio/about' element={<About />}/>
    </Routes>
  )
}

export default App