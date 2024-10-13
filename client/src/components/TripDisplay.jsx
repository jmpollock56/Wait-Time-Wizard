import React, { useEffect, useState } from "react";
import "../style/TripDisplay.css";

export default function TripDisplay({ trip, editTrip, deleteTrip }) {
  const [currentTrip, setCurrentTrip] = useState(trip);
  const [daysAway, setDaysAway] = useState(0);

  useEffect(() => {
    setCurrentTrip(trip)
  },[trip])

  useEffect(() => {
    const getDaysAway = () => {
      
      const now = new Date();
      const startDate = new Date(currentTrip.start_date || currentTrip.dates.start);
      now.setHours(0, 0, 0, 0);
      const milliDiff = startDate - now;
      const differenceInDays = Math.ceil(milliDiff / (1000 * 60 * 60 * 24));
      setDaysAway(differenceInDays);
    };
    getDaysAway();
  },[currentTrip]);

  return (
    <div 
      className="card main-border shadow" 
      style={{ width: '12rem', 
        minWidth: '10rem', 
        cursor: 'pointer', 
        height: "10rem"
      }}>
      <div className="card-body d-flex flex-column justify-content-between main-panel">
        <div>
          <div className="card-title fw-bolder main-text">{trip.resort}</div>
          <p className="card-text fw-bolder main-text">{(daysAway === 0) ? 'Starting Today!' : `${daysAway} day(s) away`}</p>
        </div>
          
        <div>
          <button
            className="btn main-btn text-white me-3"
            data-bs-toggle="modal"
            data-bs-target="#editTripModal"
            onClick={() => editTrip(currentTrip)}
          >
            Edit
          </button>
          <button className="btn option-btn" onClick={() => deleteTrip(currentTrip)}>Cancel</button>
        </div>
       
      </div>
    </div>
  );
}
