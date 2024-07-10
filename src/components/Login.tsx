import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { login } from "../features/auth/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("hello login");

      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("response - ", response);
      const user = response.data.user;
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="wraplogin">
      <div>
        <h2>Login</h2>
      </div>

      <div className="login">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
