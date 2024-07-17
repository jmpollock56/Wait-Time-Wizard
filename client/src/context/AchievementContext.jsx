import React, { createContext, useState } from 'react';

const AchievementsContext = createContext();

const AchievementsProvider = ({ children }) => {
  const [allAchievements, setAllAchievements] = useState([]);
  const [completedAchievements, setCompletedAchievements] = useState([]);

  const addAchievement = (newAchievement) => {
    const now = new Date()
    newAchievement.date = now
    setCompletedAchievements([...completedAchievements, newAchievement]);
  };

  const value = {
    allAchievements,
    setAllAchievements,
    completedAchievements,
    setCompletedAchievements,
    addAchievement,
  };

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
};

export { AchievementsContext, AchievementsProvider };
