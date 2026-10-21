import { Routes, Route } from 'react-router-dom'

import Portal from './components/Portal/portal'
import OrbitalNavigation from './components/OrbitalNavigation/orbitalNavigation.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portal />} />
      <Route path="/portfolio" element={<OrbitalNavigation />} />
    </Routes>
  )
}

export default App