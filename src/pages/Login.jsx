import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate, Navigate} from 'react-router-dom'

import '../styles/Login.css'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  // If user is already logged in,
  // don't allow access to login page
  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" replace />
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    try {
      const response = await axios.post(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin',
        {
          email,
          password,
        },
      )

      const jwtToken = response.data.data.token

      Cookies.set('jwt_token', jwtToken, {
        expires: 7,
      })

      navigate('/', {replace: true})
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          'Invalid email or password',
      )
    }
  }

  return (
    <div className="login-bg">
      <form
        className="login-card"
        onSubmit={onSubmitForm}
      >
        <h1 className="logo-text">Go Business</h1>

        <p className="login-subtitle">
          Sign in to open your referral dashboard.
        </p>

        <label
          htmlFor="email"
          className="login-label"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="login-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label
          htmlFor="password"
          className="login-label"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="login-btn"
        >
          Sign in
        </button>

        {errorMsg && (
          <p className="error-msg">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  )
}

export default Login