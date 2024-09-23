import React from "react";
import { GoTrophy } from "react-icons/go";

export default function RecentAchievementBadge({ achievement }){
  return (
    <div 
      className="d-flex flex-column align-items-center cursor-pointer"
      style={{
        height: '100px',
        width: '100px',
        cursor: 'pointer'
      }}
    >
      <img style={{width: '80%'}} src="/wreath.png" alt="badge" />
      
      
      <div className="text-center text-bold" style={{fontSize: '60%'}}>{achievement.name}</div>
    </div>
    
  )
}