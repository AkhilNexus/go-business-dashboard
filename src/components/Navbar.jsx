import '../styles/Navbar.css'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
  Cookies.remove('jwt_token')
  navigate('/login', {replace: true})
}

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Go Business
        </Link>

        <div className="nav-links">
          <button type="button" className="try-btn">
            Try for free
          </button>

          <button
            type="button"
            className="logout-btn"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar