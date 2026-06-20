import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

import { LOGIN_API } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const token = Cookies.get("jwt_token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_API, {
        email,
        password,
      });

      const jwtToken = response.data.data.token;

      Cookies.set("jwt_token", jwtToken);

      navigate("/");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div>
      <h1>Go Business</h1>

      <p>Sign in to open your referral dashboard.</p>

      <form onSubmit={submitForm}>
        <label htmlFor="email">Email</label>

        <br />

        <input
          id="email"
          type="text"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <label htmlFor="password">Password</label>

        <br />

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Sign in</button>

        {errorMsg && (
          <p style={{ color: "red" }}>
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;