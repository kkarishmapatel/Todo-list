import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import axios from "axios";
import { signup } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // const handleSignup = () => {
  //   dispatch(signup({ name, email, password }));
  //   navigate("/login");
  // };

  // const handleSignup = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/auth/signup", {
  //       name,
  //       email,
  //       password,
  //     });
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error signing up:", error);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <div>
      <h2>Signup</h2>
      {auth.status === "loading" && <p>Loading...</p>}
      {auth.status === "failed" && <p>Error: {auth.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
        <button type="submit">Signup</button>
      </form>
      {/* <button onClick={handleSignup}>Signup</button> */}
    </div>
  );
};

export default Signup;
