import React, { useEffect, useState } from "react";

export default function SubAchievement({ park, checkSubAchievement, isSubChecked, isCompleted }){

  return (
    <div className="d-flex">
      <input 
        type="checkbox" 
        name="parkDone" 
        className="form-check-input me-3" 
        value={park.id} 
        checked={isSubChecked || isCompleted}
        disabled={isSubChecked || isCompleted}
        onClick={(e) => {checkSubAchievement(park, e)}}
        readOnly
      />
      <div>{park.name}</div>
    </div>
  )
}