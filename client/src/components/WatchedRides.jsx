import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

export default function WatchedRides() {
  const { watchedRides } = useContext(UserContext);
  const [displayedRides, setDisplayedRides] = useState([]);

  useEffect(() => {
    async function fetchRides() {
      const ridePromises = watchedRides.map(async (ride) => {
        const { ride_id, park_id } = ride;
        try {
          const res = await axios.get(
            `http://localhost:5000/api/ride/${park_id}/${ride_id}`
          );
          return res.data;
        } catch (err) {
          console.error(err);
          return "Error fetching ride";
        }
      });

      const fetchedRides = await Promise.all(ridePromises);
      setDisplayedRides(fetchedRides);
    }

    fetchRides();
  }, [watchedRides]);

  return (
    <div className="border border-primary rounded p-2">
      <div className="fs-4 fw-bold text-center mb-2">Watched Rides</div>
      {displayedRides.length > 0 ? (
        displayedRides.map((ride, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="fs-5 text-bold">{ride.name}</div>
            <div className="text-bold fs-5 border p-2 rounded-5 bg-info text-light">
              {ride.queue.STANDBY.waitTime || "CLOSED"}
            </div>
          </div>
        ))
      ) : (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
