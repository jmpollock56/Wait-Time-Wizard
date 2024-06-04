import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header>
            <nav>   

                <div className="main-nav">
                    <a href="#" className="home-tab">
                        <Link to="/home" className="link">Home</Link>
                    </a>
                    <a href="#" className="parks-tab">
                        <Link to="/parks" className="link">Parks</Link>
                    </a>
                    <a href="#" className="plan-tab">
                        <Link to="/plan-your-trip" className="link">Plan Your Trip</Link>
                    </a>
                    <a href="#" className="collection-tab">
                        <Link to="/collection" className="link">Collection</Link>
                    </a>
                </div>

                <div className="profile-nav">
                    <div className="username">Username</div>
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4bdae03-33d9-4f9a-b06c-9d9a0297b142/dfmaqi6-202fa5fb-39fb-4a17-ba51-fa6609d3397a.jpg/v1/fill/w_1280,h_1281,q_75,strp/mickey_mouse_xi_by_islanderfan91_dfmaqi6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MSIsInBhdGgiOiJcL2ZcL2M0YmRhZTAzLTMzZDktNGY5YS1iMDZjLTlkOWEwMjk3YjE0MlwvZGZtYXFpNi0yMDJmYTVmYi0zOWZiLTRhMTctYmE1MS1mYTY2MDlkMzM5N2EuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.80u1GaHiiLb93o2gxWwiGEQhBNXG5eg8PwesXueUb-o" alt="pfp" />  
                </div>
                
            </nav>
        </header>
    );
}