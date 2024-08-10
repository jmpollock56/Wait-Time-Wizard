import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPlannedTrips, setUserPlannedTrips] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);

  const fetchAchievements = useCallback(async (userId) => {
    try {
      const [allAchievementsRes, userAchievementsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/collection/achievements'),
        axios.get(`http://localhost:5000/api/user/achievements/${userId}`)
      ]);
      setAllAchievements(allAchievementsRes.data);
      setUserAchievements(userAchievementsRes.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  }, []);

  const fetchPlannedTrips = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const sortedTrips = sortPlannedTrips(response.data.trips);
      setUserPlannedTrips(sortedTrips);
    } catch (error) {
      console.error('Error fetching planned trips:', error);
    }
  }, []);

  function sortPlannedTrips(trips) {
    return trips.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem('currentUserId');
    if (storedUserId) {
      axios.get(`http://localhost:5000/api/users/${storedUserId}`)
        .then((res) => {
          const userData = res.data;
          setCurrentUser(userData);
          fetchAchievements(userData.id);
          fetchPlannedTrips(userData.id);
        })
        .catch((err) => console.error(err));
    }
  }, [fetchAchievements, fetchPlannedTrips]);

  const value = {
    currentUser,
    setCurrentUser,
    userAchievements,
    allAchievements,
    fetchAchievements,
    userPlannedTrips,
    setUserPlannedTrips,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
