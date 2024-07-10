import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Todolist from "./TodoList";
// import Login from "./Login";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("home user ", user);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("isAuthenticated - ", isAuthenticated);
  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return null;
  // }
  return (
    <div>
      <h2>Home</h2>
      {isAuthenticated ? (
        <>
          <div>
            <p>Welcome, {user?.name}!</p>
            <div>Add your to do from below.</div>
            <br />
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
          <div>
            <Todolist />
          </div>
        </>
      ) : (
        <p>Please log in to access your account.</p>
      )}
    </div>
  );
};

export default Home;
