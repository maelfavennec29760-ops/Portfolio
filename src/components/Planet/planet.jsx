import planetTexture from '../../assets/planets/planet-texture.webp'
import './planet.scss'

function Planet({ name, icon: Icon, onClick }) {
  return (
    <button
      className="planet"
      type="button"
      onClick={onClick}
      aria-label={`Accéder à ${name}`}
    >
      <span className="planet-surface">
        <img
          className="planet-texture"
          src={planetTexture}
          alt=""
          draggable="false"
        />
        <span className="planet-content">
            <Icon className="planet-icon" />
            <span className="planet-label">
                {name}
            </span>
            <span className="planet-underline" />
        </span>
      </span>
    </button>
  )
}

export default Planet