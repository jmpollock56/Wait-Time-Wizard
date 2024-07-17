import React, { useEffect, useState } from "react";
import SubAchievement from "./SubAchievement";

export default function AchievementPanel({ achievement, addAchievement, isChecked}) {
  const baseAchievementClass = "d-flex flex-column border border-primary p-3 rounded bg-primary-subtle"
  const completedAchievementClass = "d-flex flex-column border border-primary p-3 rounded bg-primary-subtle bg-success-subtle border-success"
  const [isCompleted, setIsCompleted] = useState(isChecked)
  const [currentSubAchievements, setCurrentSubAchievements] = useState([])
  const [achievementClass, setAchievementClass] = useState((isChecked) ? completedAchievementClass : baseAchievementClass)
  const [currentAchievement, setCurrentAchievement] = useState(achievement)
 
  
  function checkSubAchievement(park, e){
      addSubAchievement(park)
      e.target.disabled = true;
  }

  function addSubAchievement(park){
    setCurrentSubAchievements((prev) => {
      const index = prev.findIndex(sub => sub.id === currentAchievement.id)
      

      if(index !== -1){
        const updatedSubAchievements = [...prev]
        const updatedSub = { ...updatedSubAchievements[index] }

        updatedSub.completed = [... updatedSub.completed, park.id]

        updatedSubAchievements[index] = updatedSub

        // check if the achivement is completed based off of user checking all sub achievements
        if(updatedSub.completed.length === achievement.parks.length){
          addAchievement(achievement)
        }

        return updatedSubAchievements
      } else {
        const newSubAchievement = {
          id: currentAchievement.id,
          completed: [park.id]
        }

        return [...prev, newSubAchievement]
      }
    })
  }
  

  function checkIfAchievmentChecked(e){
      const newAchievement = JSON.parse(e.target.getAttribute('data-achievement'))
      addAchievement(newAchievement)
      setAchievementClass(completedAchievementClass)
      
  
      const newSubAchievement = {
        id: currentAchievement.id,
        completed: currentAchievement.parks.map(park => park.id)
      
      }
      
      setCurrentSubAchievements([...currentSubAchievements, newSubAchievement])
     
      e.target.disabled = true
      e.target.checked = true
      setIsCompleted(true)
      
  }

  
  useEffect(() =>{
    const index = currentSubAchievements.findIndex(sub => sub.id === currentAchievement.id)
   
    if(currentSubAchievements.length > 0 && currentSubAchievements[index].completed.length === currentAchievement.parks.length){

      setIsCompleted(true)
      setAchievementClass(completedAchievementClass)
    }
  },[currentSubAchievements])



  function checkSubStatus(park){
    
    if(isCompleted){
      return true
    }
    const subComplete = currentSubAchievements.find((sub) => achievement.id === sub.id);

    if(subComplete && subComplete.completed){
      const completed = subComplete.completed

      if(completed.includes(park.id)){
        return true
      }
    }
    return false
  }

  
  return (
    <div className={achievementClass} style={{width: '300px', minHeight: '300px'}}>
      <div className="d-flex p-2 mb-2">
        <input
          type="checkbox"
          name="achievementDone"
          className="form-check-input me-3"
          data-achievement={JSON.stringify(achievement)}
          value={achievement.id}
          checked={isCompleted}
          disabled={isCompleted}
          onClick={(e) => {checkIfAchievmentChecked(e)}}
          readOnly
        />
        <div className="fw-bold">{achievement.name}</div>
      </div>
      <div className="d-flex p-2">
        <div className="me-3 ">XP:</div>
        <div className="fw-bold">{achievement.xp}</div>
      </div>
      <div className="d-flex mb-2 p-2">{achievement.description}</div>
      <div className="p-2">
        {achievement.parks.map((park, i) => {
          return  <SubAchievement 
                    park={park} 
                    key={i} 
                    checkSubAchievement={checkSubAchievement}
                    isSubChecked={checkSubStatus(park)}
                    isCompleted={isCompleted}
                  />
        })}
      </div>
    </div>
  );
}
