import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TripDisplay from "../components/TripDisplay.jsx";
import AddTripModal from "../components/AddTripModal.jsx";
import "../style/Home.css";



export default function Home() {
  
  const [plannedTrips, setPlannedTrips] = useState([{id: 100, resort: 'Walt Disney World', dates: {start: new Date(), end: new Date()}, tripDays: [0,0,0]}]);
  const [deletingTrip, setDeletingTrip] = useState(null);
  const [editTripData, setEditTripData] = useState(null);

  function editTrip(selectedTrip) {
    setEditTripData(selectedTrip);
    openEdit();
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

  function handleNewPlannedTrips(newTrip){
    const updatedPlannedTrips = [...plannedTrips, newTrip]
    setPlannedTrips(updatedPlannedTrips)
    console.log(updatedPlannedTrips)
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
                style={{'--bs-btn-padding-y': '.1rem', '--bs-btn-padding-x': '.4rem'}}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                +
              </button>
            </div>

            <AddTripModal handleNewPlannedTrips={handleNewPlannedTrips}/>

            
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
              <div className="p-3">
                <p>No recent Achievements to show.</p>
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
