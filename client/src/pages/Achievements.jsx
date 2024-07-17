import React, { useContext, useEffect, useState } from "react";
import { AchievementsContext } from "../context/AchievementContext";
import Header from "../components/Header";
import AchievementPanel from "../components/AchievementPanel";
import "../style/Achievements.css";

export default function Achievements() {
  const {
    allAchievements,
    setAllAchievements,
    completedAchievements,
    setCompletedAchievements,
    addAchievement
  } = useContext(AchievementsContext)
  

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

  function checkStatus(achievement) {
    return completedAchievements.some((completed) => completed.id === achievement.id)
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
          {allAchievements.map((achievement, i) => {
            return (
              <AchievementPanel
                achievement={achievement}
                addAchievement={addAchievement}
                isChecked={checkStatus(achievement)}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
