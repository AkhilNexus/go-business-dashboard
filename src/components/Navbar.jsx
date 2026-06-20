import '../styles/Navbar.css'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Go Business
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <button type="button" onClick={logout}>
          Log out
        </button>
      </div>
    </nav>
  )
}

export default Navbar