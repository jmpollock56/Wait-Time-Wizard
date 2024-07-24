import React, { useState } from "react";
import ParkTable from "./ParkTable";
import '../style/ResortSection.css';

export default function ResortSection({ resort }) {
  const [parks, setParks] = useState(resort.parks);

  return (
    <div className="d-flex flex-column mb-2 w-100 p-3">
        <h1 className="mb-2 text-center">{resort.name}</h1>
      <div className="d-flex flex-wrap justify-content-evenly gap-4">
        {parks.map((park, i) => {
          return <ParkTable key={i} park={park} />
        })}
      </div>

    </div>
  );
}