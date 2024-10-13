import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function Header() {
  const { currentUser, setCurrentUser} = useContext(UserContext);
  const navigateTo = useNavigate()

  function userLogOut(){
    localStorage.clear()
    navigateTo('/')
  }

  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-back px-3 mb-3" style={{backgroundColor: '#A4C8F0'}}>
      <div className="container-fluid">
        <Link to="/home" className="d-flex align-items-center navbar-brand">
          <img src="/hat.png" alt="logo" width={40} height={40} />
          <div className="text-white">
            <b>Wait Time Wizard</b>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link navbar-text text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/parks" className="nav-link navbar-text text-white">
                Parks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/achievements" className="nav-link navbar-text text-white">
                Achievements
              </Link>
            </li>

          </ul>

          <ul className="nav-item navbar-nav btn-group me-4">
            <div className="nav-item d-flex align-items-center gap-1 dropdown-toggle" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <div className="text-white">{(currentUser) ? currentUser.username : 'loading'}</div>
              <img
              style={{
                width: "40px",
                height: "40px",
                border: "black 2px solid",
                borderRadius: "10px",
              }}
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4bdae03-33d9-4f9a-b06c-9d9a0297b142/dfmaqi6-202fa5fb-39fb-4a17-ba51-fa6609d3397a.jpg/v1/fill/w_1280,h_1281,q_75,strp/mickey_mouse_xi_by_islanderfan91_dfmaqi6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MSIsInBhdGgiOiJcL2ZcL2M0YmRhZTAzLTMzZDktNGY5YS1iMDZjLTlkOWEwMjk3YjE0MlwvZGZtYXFpNi0yMDJmYTVmYi0zOWZiLTRhMTctYmE1MS1mYTY2MDlkMzM5N2EuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.80u1GaHiiLb93o2gxWwiGEQhBNXG5eg8PwesXueUb-o"
              alt="icon"
            />
            </div>

            <ul className="dropdown-menu dropdown-menu-end border-none me-1 mt-3" style={{cursor: "pointer", backgroundColor: '#e5f1ff'}}>
              <li className="nav-item dropdown-item"><a href="#" className="text-decoration-none main-text">View Profile</a></li>
              <li className="nav-item dropdown-item"><a href="#" className="text-decoration-none main-text">Settings</a></li>
              <li onClick={userLogOut} className="dropdown-item"><a href="#" className="text-decoration-none main-text">Log out</a></li>
            </ul>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}
