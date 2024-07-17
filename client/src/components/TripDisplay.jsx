import React, { useEffect, useState } from "react";

import "../style/TripDisplay.css";

export default function TripDisplay({ trip, editTrip, deleteTrip }) {
  const [currentTrip, setCurrentTrip] = useState(trip);
  const [daysAway, setDaysAway] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  useEffect(() => {
    const getDaysAway = () => {
      const now = new Date();
      const startDate = new Date(currentTrip.dates.start);
      now.setHours(0, 0, 0, 0);
      const milliDiff = startDate - now;
      const differenceInDays = Math.ceil(milliDiff / (1000 * 60 * 60 * 24));
      setDaysAway(differenceInDays);
    };
    getDaysAway();
  }, [currentTrip]);

  const handleEditTrip = () => {
    editTrip(currentTrip);
  }

  const handleDelete = () => {
    deleteTrip(currentTrip)
  }

  return (
    <div className="card bg-primary-subtle border-primary shadow" style={{width: '12rem', minWidth: '10rem', cursor: 'pointer'}}>
      <div className="card-body">
        <h5 className="card-title">{trip.resort}</h5>
        <p className="card-text">
          {`${daysAway} day(s) away`}
        </p>
        <button 
          className="btn btn-primary me-3"
          data-bs-toggle="modal"
          data-bs-target="#editTripModal" onClick={handleEditTrip}>Edit</button>
        <button className="btn btn-light" onClick={handleDelete}>Cancel</button>
      </div>
      
    </div>
  );
}
