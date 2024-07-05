import React, { useState } from "react";
import ParkTable from "./ParkTable";
import '../style/ResortSection.css';

export default function ResortSection({ resort }) {
  const [parks, setParks] = useState(resort.parks);

  return (
    <div className="resort-section">
      <h1>{resort.name}</h1>
      <div className="parks-container">
        {parks.map((park, i) => {
          return <ParkTable key={i} park={park} />
        })}
      </div>

    </div>
  );
}