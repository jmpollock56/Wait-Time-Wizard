import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import AchievementPanel from "../components/AchievementPanel";
import axios from "axios";
import "../style/Achievements.css";


export default function Achievements() {
  const [allAchievements, setAllAchievements] = useState([])
  const { currentUser, userAchievements, loadingAchievements } = useContext(UserContext);


  useEffect(() => {
    const fetchAllAchievements = () => {
      axios
        .get(`http://localhost:5000/api/collection/achievements`)
        .then((res) => {
          const resData = res.data
          
          setAllAchievements(resData)
        })
        .catch(err => console.error(err)) 
    }
    fetchAllAchievements()
  },[userAchievements, currentUser])

 

  function checkStatus(achievement) {
    if (!userAchievements || userAchievements.length === 0) return false;
    return userAchievements.some((completed) => completed.id === achievement.id);
  }

  return (
    <>
      <Header />
      <div className="main-collection">
        <div className="d-flex justify-content-between align-items-center mb-4">          
          <h1>Achievements</h1>
          <button className="btn btn-primary">Sort by Park</button>
        </div>

        {(!loadingAchievements) ?
          <div className="all-achievements">
          {allAchievements.map((achievement, i) => (
            <AchievementPanel
              achievement={achievement}
              isChecked={checkStatus(achievement)}
              key={i}
            />
          ))}
        </div>
        : "Loading..."}

        
      </div>
    </>
  );
}
