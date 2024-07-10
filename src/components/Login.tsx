import React, { useState, useEffect } from "react";
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
  const auth = useSelector((state: RootState) => state.auth);
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated
  // );

  // const handleLogin = () => {
  //   console.log("hello");
  //   dispatch(login({ email, password }));
  // };
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/auth/login", {
  //       email,
  //       password,
  //     });
  //     console.log("response - ", response);
  //     const user = response.data.user;
  //     dispatch(login(user));
  //     // dispatch(login({ email, password }));
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  // if (isAuthenticated) {
  //   navigate("/");
  // }
  useEffect(() => {
    if (auth.status === "succeeded") {
      navigate("/");
    }
  }, [auth.status, navigate]);
  return (
    <div className="wraplogin">
      <div>
        <h2>Login</h2>
      </div>
      {auth.status === "loading" && <p>Loading...</p>}

      {auth.status === "failed" && <p>Error: {auth.error}</p>}

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
          {/* <button onClick={handleLogin}>Login</button> */}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
