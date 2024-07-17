import React from "react";
import { GoTrophy } from "react-icons/go";

export default function RecentAchievementBadge({ achievement }){
  return (
    <div 
      className="d-flex flex-column fw-bold border border-warning p-3 rounded bg-warning-subtle align-items-center" 
      style={{width: '80px', height: '80px', fontSize: '.8rem', cursor: 'pointer'}}
    >
      <GoTrophy 
        
        style={{width: '100%', height: '100%'}}
      />

      
    </div>
  )
}