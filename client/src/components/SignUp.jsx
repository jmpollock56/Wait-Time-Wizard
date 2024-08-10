import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";


export default function SignUp({ setShowAccountCreateSuccess, showAccountCreateSuccess, setIsSigningUp }) {
  const { createUser } = useContext(UserContext);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [formErrorState, setFormErrorState] = useState("form-control");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [isAPasswordError, setIsAPasswordError] = useState(false);

  useEffect(() => {
    if (newPassword.length === 0) {
      setFormErrorState("form-control");
      setIsAPasswordError(false);
      setNewPasswordConfirm("");
    }

    if (
      newPasswordConfirm.length >= newPassword.length &&
      newPassword !== newPasswordConfirm
    ) {
      setFormErrorState(
        "form-control border-danger text-danger bg-danger-subtle"
      );
      setPasswordErrorText("Passwords much match");
      setIsAPasswordError(true);
    }

    if (newPasswordConfirm.length < newPassword.length) {
      setFormErrorState("form-control");
      setIsAPasswordError(false);
    }
  }, [newPassword, newPasswordConfirm]);

  useEffect(() => {

    if (showAccountCreateSuccess) {
      const timer = setTimeout(() => {
        setShowAccountCreateSuccess(false);
        
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [showAccountCreateSuccess]);

  async function handleSignUp(e) {
    e.preventDefault();

    if (newPassword.length < 8) {
      setPasswordErrorText("Password must be at least 8 characters long");
      setFormErrorState(
        "form-control border-danger text-danger bg-danger-subtle"
      );
      setIsAPasswordError(true);
      return;
    } else if (newPassword !== newPasswordConfirm) {
      setPasswordErrorText("Passwords much match");
      setFormErrorState(
        "form-control border-danger text-danger bg-danger-subtle"
      );
      setIsAPasswordError(true);
      return;
    }

    const randomUserId = Math.floor(Math.random() * 900000) + 1000000;
    const newUser = {
      id: randomUserId,
      username: newUsername.toLowerCase(),
      email: newEmail.toLowerCase(),
      password: newPassword,
    };

    const createUserResponse = await createUser(newUser);
    setShowAccountCreateSuccess(true)
    setIsSigningUp(false)
  }

  return (
      <form
        className="d-flex flex-column gap-2 border border-primary-subtle bg-primary-emphasis p-3 mt-4 rounded"
        onSubmit={handleSignUp}
      >
        <div className="d-flex flex-column">
          <label htmlFor="newUserEmail" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="newUserEmail"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="newUserName" className="form-label m-0">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="newUserName"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
          />
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="newUserPass" className="form-label m-0">
            Password
          </label>
          <input
            type="password"
            className={formErrorState}
            id="newUserPass"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
           {isAPasswordError && (
            <p className="text-danger p-0 m-0" style={{ fontSize: "11px" }}>
              {passwordErrorText}
            </p>
          )}
        </div>

        <div className="d-flex flex-column">
          <label htmlFor="newUserPassConfirm" className="form-label m-0">
            Re-enter Password
          </label>
          <input
            type="password"
            className={formErrorState}
            id="newUserPassConfirm"
            value={newPasswordConfirm}
            onChange={(e) => {
              setNewPasswordConfirm(e.target.value);
            }}
          />
          {isAPasswordError && (
            <p className="text-danger p-0 m-0" style={{ fontSize: "11px" }}>
              {passwordErrorText}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Create Account
        </button>
        
      </form>

  );
}
