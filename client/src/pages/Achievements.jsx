import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import AchievementPanel from "../components/AchievementPanel";
import "../style/Achievements.css";

export default function Achievements() {
  const { currentUser } = useContext(UserContext)
  const [allAchievements, setAllAchievements] = useState([])

  

  useEffect(() => {
    async function getAchievements() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/collection/achievements"
        );
        const data = await response.json();
        setAllAchievements(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAchievements();
  }, []);

  function addAchievement(){
    console.log('add')
  }

  // function checkStatus(achievement) {
  //   if(completedAchievements) {
  //     return completedAchievements.some((completed) => completed === achievement.id)
  //   }
    
  // }

  return (
    <>
      <Header />
      <div className="main-collection">
        <div className="d-flex justify-content-between align-items-center mb-4">          
          <h1>Achievements</h1>
          <button className="btn btn-primary">Sort by Park</button>
        </div>

        <div className="all-achievements">
          {allAchievements.map((achievement, i) => {
            return (
              <AchievementPanel
                achievement={achievement}
                addAchievement={addAchievement}
                
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
