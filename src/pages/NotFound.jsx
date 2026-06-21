import {Link} from 'react-router-dom'

import '../styles/NotFound.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">
      404
    </h1>

    <p className="not-found-text">
      Page Not Found
    </p>

    <Link to="/" className="back-link">
      Back to Dashboard
    </Link>
  </div>
)

export default NotFound