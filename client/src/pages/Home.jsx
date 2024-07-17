import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import TripDisplay from "../components/TripDisplay.jsx";
import AddTripModal from "../components/AddTripModal.jsx";
import EditTripModal from "../components/EditTripModal.jsx";
import RecentAchievementBadge from '../components/RecentAchievementBadge.jsx'
import { AchievementsContext } from "../context/AchievementContext";
import "../style/Home.css";

export default function Home() {
  const [plannedTrips, setPlannedTrips] = useState([
    {
      id: 100,
      resort: "Walt Disney World",
      dates: { start: new Date(), end: new Date() },
      tripDays: [0, 0, 0],
    },
  ]);
  const [deletingTrip, setDeletingTrip] = useState(null);
  const [editedTrip, setEditedTrip] = useState(null);
  const { allAchievements, completedAchievements } =
    useContext(AchievementsContext);
  const [recentAchievements, setRecentAchievements] = useState([]);

  useEffect(() => {
    function updateRecentAchievements(){
      const recent = completedAchievements.slice(-5)
      recent.sort((a,b) => b.date - a.date)
      console.log(recent)
      setRecentAchievements(recent)
    }
    updateRecentAchievements()
  },[])

  function editTrip(selectedTrip) {
    setEditedTrip(selectedTrip);
    console.log(editedTrip)
  }

  function handleDelete(trip) {
    setDeletingTrip(trip.id);
    setTimeout(() => {
      setPlannedTrips((prevTrips) =>
        prevTrips.filter((oldTrip) => oldTrip.id !== trip.id)
      );
      setDeletingTrip(null);
    }, 500);
  }

  function handleNewPlannedTrips(newTrip) {
    const updatedPlannedTrips = [...plannedTrips, newTrip];
    setPlannedTrips(updatedPlannedTrips);
    
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
                style={{
                  "--bs-btn-padding-y": ".1rem",
                  "--bs-btn-padding-x": ".4rem",
                }}
                data-bs-toggle="modal"
                data-bs-target="#addTripModal"
              >
                +
              </button>
            </div>

            

            <AddTripModal handleNewPlannedTrips={handleNewPlannedTrips} />
            <EditTripModal chosenTrip={editedTrip}/>

            <div className="w-100 d-flex flex-wrap gap-2 p-2">
              {plannedTrips.map((trip, i) => (
                <TripDisplay
                  key={i}
                  trip={trip}
                  deleteTrip={handleDelete}
                  editTrip={editTrip}
                  isDeleting={deletingTrip === trip.id}
                />
              ))}
            </div>
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
              <div className="p-2 d-flex gap-2 flex-wrap">
                {(recentAchievements.length > 0) ? recentAchievements.map((cA, i) => {
                  return <RecentAchievementBadge key={i} achievement={cA}/>
                }) : <p>No recent Achievements to show.</p>}
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
