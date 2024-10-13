import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPlannedTrips, setUserPlannedTrips] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [allAchievements, setAllAchievements] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true)
  const [watchedRides, setWatchedRides] = useState([])
  const [favoriteParks, setFavoriteParks] = useState([])

  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserId");

    if (storedUserId) {
      axios
        .get(`http://localhost:5000/api/users/${storedUserId}`)
        .then((res) => {
          const userData = res.data;
          setCurrentUser(userData);
          setUserPlannedTrips(userData.trips)
          setWatchedRides(userData.watchedRides)
          setFavoriteParks(userData.favoriteParks)
          fetchUserAchievements(storedUserId)
        })
        .catch((err) => console.error(err));
    }
  }, []);

  function initUser(user) {
    setCurrentUser(user);
    setUserPlannedTrips(user.trips);
    localStorage.setItem("currentUserId", user.id);
  }

  function addTrip(newTrip) {
    if (newTrip) {
      axios
        .post("http://localhost:5000/api/trips/add", {
          trip: newTrip,
        })
        .then((res) => {
          if (res.ok && currentUser) {
            console.log("trip added");
            setUserPlannedTrips([...userPlannedTrips, newTrip]);
            fetchPlannedTrips(currentUser.id)
          }

          
        })
        .catch((err) => {
          console.error(err);
        });

        setUserPlannedTrips((prev) => {
          const allTrips = [...prev, newTrip]
          const sortedAllTrips = sortPlannedTrips(allTrips)
          return sortedAllTrips
        })
    }
  }

  // function checkIfTripIsInPast(trips){
  //   const now = new Date()
  //   return trips.filter(trip => trip.start_date )
  // }

  function sortPlannedTrips(trips) {  
    return trips.sort(
      (a, b) => new Date(a.start_date || a.dates.start) - new Date(b.start_date || b.dates.start)
    );
  }

  function fetchUserAchievements(userId){
    if(userId){
      setLoadingAchievements(true)

      axios
        .get(`http://localhost:5000/api/user/achievements/${userId}`)
        .then((res) => {
          const userAchievementData = res.data
          setUserAchievements(userAchievementData)
          setLoadingAchievements(false)
        })
        .catch((err) => { 
          console.log(err) 
          setLoadingAchievements(false)
        })

    }
  }

  function addAchievement(newAchievement) {
    console.log('add')
  }

  console.log(currentUser)
  const value = {
    currentUser,
    setCurrentUser,
    userAchievements,
    allAchievements,
    userPlannedTrips,
    loadingAchievements,
    addAchievement,
    sortPlannedTrips,
    setUserPlannedTrips,
    initUser,
    addTrip,
    watchedRides,
    setWatchedRides, 
    favoriteParks, 
    setFavoriteParks
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
