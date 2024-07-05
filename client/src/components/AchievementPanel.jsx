import React from "react";
import { FaTrophy } from "react-icons/fa6";

export default function AchievementPanel({ achievement }){
  return (
    <div className="panel">
      <FaTrophy className="a-icon"/>
      <div className="a-title">{achievement.name}</div>
    </div>
  )
}