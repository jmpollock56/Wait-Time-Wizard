import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()


const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userPlannedTrips, setUserPlannedTrips] = useState([])
  

  const initUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUserId', JSON.stringify(user.id));
  }

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId')
  }

  const addAchievement = (newAchievement) => {
    if (currentUser) {
      const now = new Date();
      newAchievement.date = now;
      const updatedCompletedAchievements = [...currentUser.completeAchievements, newAchievement];
      const updatedUser = { ...currentUser, completeAchievements: updatedCompletedAchievements };
      setCurrentUser(updatedUser);
      
    }
  }

  const addTrip = async (newTrip) => {
    console.log(newTrip)
    const trip = {
      trip_id: newTrip.id,
      resort: newTrip.resort,
      start_date: newTrip.dates.start,
      end_date: newTrip.dates.end,
      tripDays: newTrip.tripDays,
      user_id: currentUser.id
    }

    try{
      const response = await axios.post('http://localhost:5000/api/trips/add', trip)
      let newUser = currentUser
      newUser.trips.push(trip)
      setCurrentUser(newUser)
    } catch (err) {
      console.log('error', err)
    }
    
  }

  function sortPlannedTrips(updatedPlannedTrips) {
    const newPlannedTrips = updatedPlannedTrips.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateA - dateB;
    });

    return newPlannedTrips;
  }

  useEffect(() => {
    const id = localStorage.getItem('currentUserId');
    if (id) {
     axios.get(`http://localhost:5000/api/users/${id}`)
          .then((res) => {
            const userData = res.data
            setCurrentUser(userData)
            const sortedTrips = sortPlannedTrips(userData.trips)
            setUserPlannedTrips(sortedTrips)
          })
          .catch(err => console.error(err))
    }
  }, [currentUser])

  const value = {
    addAchievement,
    currentUser,
    setCurrentUser,
    initUser,
    logout,
    addTrip, 
    userPlannedTrips
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext, UserProvider };
