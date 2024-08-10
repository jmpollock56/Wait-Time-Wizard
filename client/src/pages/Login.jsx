import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SignUp from "../components/SignUp";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showAccountCreateSuccess, setShowAccountCreateSuccess] =
    useState(false);
  const navigateTo = useNavigate();
  const { initUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.user;
        initUser(user);
        navigateTo("/home");
      } else {
        console.error("Login failed", response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <div>
          Welcome to <b>Wait Time Wizard</b>
        </div>
        <form
          className="d-flex flex-column border border-primary bg-primary-subtle p-3 rounded"
          onSubmit={handleLogin}
        >
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="userEmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="userPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => {
            setIsSigningUp((prev) => !prev);
          }}
        >
          {!isSigningUp ? "Sign up" : "Close"}
        </button>

        {isSigningUp && (
          <SignUp
            setShowAccountCreateSuccess={setShowAccountCreateSuccess}
            showAccountCreateSuccess={showAccountCreateSuccess}
            setIsSigningUp={setIsSigningUp}
          />
        )}
      </div>

      {showAccountCreateSuccess && <Toast />}
    </>
  );
}
