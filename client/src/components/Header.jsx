import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary sticky-top navbar-back">
      <div className="container-fluid">
        <Link to="/home" className="d-flex align-items-center navbar-brand">
          <img src="/hat.png" alt="logo" width={40} height={40}/>
          <div><b>Wait Time Wizard</b></div>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link navbar-text">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/parks" className="nav-link navbar-text">
                Parks
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/achievements" className="nav-link navbar-text">
                Achievements
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3" style={{cursor: "pointer"}}>
            <div id="name">Username</div>
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
        </div>
      </div>
    </nav>
  );
}
