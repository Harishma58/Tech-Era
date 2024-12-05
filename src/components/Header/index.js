import {Link} from "react-router-dom"
import './index.css'

const Header = () => (
  <div className="nav-bar">
    <Link to="/" className="link">
      <img
        className="logo"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </Link>
  </div>
)
export default Header
