import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import AchievementPanel from "../components/AchievementPanel";
import "../style/Achievements.css";

export default function Achievements() {
  const { currentUser, allAchievements, userAchievements } = useContext(UserContext);

  function addAchievement() {
    console.log('add');
  }

  function checkStatus(achievement) {
    return userAchievements.some((completed) => completed.achievement_id === achievement.id);
  }

  return (
    <>
      <Header />
      <div className="main-collection">
        <div className="d-flex justify-content-between align-items-center mb-4">          
          <h1>Achievements</h1>
          <button className="btn btn-primary">Sort by Park</button>
        </div>

        <div className="all-achievements">
          {allAchievements.map((achievement, i) => (
            <AchievementPanel
              achievement={achievement}
              addAchievement={addAchievement}
              isChecked={checkStatus(achievement)}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}
