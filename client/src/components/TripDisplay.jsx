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
      const startDate = new Date(currentTrip.start_date);
      now.setHours(0, 0, 0, 0);
      const milliDiff = startDate - now;
      const differenceInDays = Math.ceil(milliDiff / (1000 * 60 * 60 * 24));
      setDaysAway(differenceInDays);
    };
    getDaysAway();
  },[currentTrip]);



  return (
    <div className="card bg-primary-subtle border-primary shadow" style={{ width: '12rem', minWidth: '10rem', cursor: 'pointer', height: "10rem" }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{trip.resort}</h5>
          <p className="card-text">{(daysAway === 0) ? 'Starting Today!' : `${daysAway} day(s) away`}</p>
        </div>
          
        <div>
          <button
            className="btn btn-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#editTripModal"
            onClick={() => editTrip(currentTrip)}
          >
            Edit
          </button>
          <button className="btn btn-light" onClick={() => deleteTrip(currentTrip)}>Cancel</button>
        </div>
       
      </div>
    </div>
  );
}
