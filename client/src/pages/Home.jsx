import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import TripDisplay from "../components/TripDisplay.jsx";
import AddTripModal from "../components/AddTripModal.jsx";
import EditTripModal from "../components/EditTripModal.jsx";
import RecentAchievementBadge from '../components/RecentAchievementBadge.jsx';
import { UserContext } from "../context/UserContext.jsx";
import "../style/Home.css";

export default function Home() {
  
  const [deletingTrip, setDeletingTrip] = useState({});
  const [editedTrip, setEditedTrip] = useState({});
  const { addTrip, currentUser, userPlannedTrips } = useContext(UserContext);
  const [recentAchievements, setRecentAchievements] = useState([]);
  

 

  useEffect(() => {
    if (currentUser) {
      function updateRecentAchievements() {
        const completedAchievements = currentUser.completeAchievements || [];
        const recent = completedAchievements.slice(-5);
        recent.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentAchievements(recent);
      }
      updateRecentAchievements();
    }
  }, [currentUser])

  function editTrip(selectedTrip) {
    setEditedTrip(selectedTrip);
  }

  function handleDelete(trip) {
    axios.delete(`http://localhost:5000/api/trip/delete/${trip.id}`)
          .then(res => console.log(res))
  }

  function sortPlannedTrips(updatedPlannedTrips) {
    const newPlannedTrips = updatedPlannedTrips.sort((a, b) => {
      const dateA = new Date(a.dates.start);
      const dateB = new Date(b.dates.start);
      return dateA - dateB;
    });

    return newPlannedTrips;
  }

  function handleNewPlannedTrips(newTrip) {
    addTrip(newTrip);
    const updatedPlannedTrips = sortPlannedTrips([...userPlannedTrips, newTrip]);
    setUserPlannedTrips(updatedPlannedTrips);
  }

  function editExistingTrip(newTrip) {
    const index = userPlannedTrips.findIndex((plannedTrip) => plannedTrip.id === newTrip.id);
    
    if (index !== -1) {
      const editedPlannedTrips = [...userPlannedTrips];
      editedPlannedTrips[index] = newTrip;
      const newEditedPlannedTrips = sortPlannedTrips(editedPlannedTrips);
      
    }
  }

  if (!currentUser) {

    return  <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-4">
              <div className="spinner-border text-primary" style={{width: '200px', height: '200px'}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h4>Loading Good Times</h4>
            </div>
    
  }

  return (
    <>
      <Header />
      <div className="d-lg-flex mt-2 p-2">
        <div className="left-container w-100">
          <div className="w-100">
            <div className="current-trips-header">
              <div className="home-title">Your Trips</div>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                style={{ "--bs-btn-padding-y": ".1rem", "--bs-btn-padding-x": ".4rem" }}
                data-bs-toggle="modal"
                data-bs-target="#addTripModal"
              >
                +
              </button>
            </div>

            <AddTripModal handleNewPlannedTrips={handleNewPlannedTrips} />

            <EditTripModal chosenTrip={editedTrip} editExistingTrip={editExistingTrip} /> 

            {userPlannedTrips.length !== 0 
              ? <div className="w-100 d-flex flex-wrap gap-2 p-2">
                  {userPlannedTrips.map((trip, i) => (
                    <TripDisplay
                      key={i}
                      trip={trip}
                      deleteTrip={handleDelete}
                      editTrip={editTrip}
                      isDeleting={deletingTrip === trip.id}
                    />
                  ))}
                </div> : <div className="p-3"><p>No upcoming trips.</p></div>}
          </div>

          <div className="w-100">
            <div className="recent-collections-header">
              <div className="home-title">Recent Collections</div>
              <div className="p-3">
                <p>No recent Collection items to show.</p>
              </div>
            </div>
          </div>

          <div className="w-100">
            <div className="recent-collections-header">
              <div className="home-title">Recent Favorites</div>
              <div className="p-3">
                <p>No recent Favorites to show.</p>
              </div>
            </div>
          </div>

          <div className="w-100">
            <div className="recent-collections-header">
              <div className="home-title">Recent Achievements</div>
              <div className="d-flex gap-2 flex-wrap">
                {recentAchievements.length !== 0 ? (
                  recentAchievements.map((cA, i) => (
                    <RecentAchievementBadge key={i} achievement={cA} />
                  ))
                ) : (
                  <div className="p-3"><p>No recent Achievements to show.</p></div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="right-container w-100">
          <div className="social-title">Your Social Feed</div>
          <div className="user-feed"></div>
        </div>
      </div>
    </>
  );
}
