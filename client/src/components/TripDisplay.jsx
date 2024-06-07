import React, { useState } from "react";
import '../style/TripDisplay.css';

export default function TripDisplay({ trip }){
  const [currentTrip, setCurrentTrip] = useState(trip);

  return(
    <div className="trip-container">
      <h1 className="resort-name">{currentTrip.resort}</h1>
      <div className="days-away">
        <div className="days-away">Days away</div>
      </div>
    </div>
  );

}