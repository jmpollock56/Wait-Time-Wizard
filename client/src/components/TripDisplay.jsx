import React, { useEffect, useState } from "react";
import { Button, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import "../style/TripDisplay.css";

export default function TripDisplay({ trip, editTrip, deleteTrip }) {
  const [currentTrip, setCurrentTrip] = useState(trip);
  const [daysAway, setDaysAway] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  useEffect(() => {
    const getDaysAway = () => {
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      const milliDiff = currentTrip.dates[0] - now;
      const differenceInDays = milliDiff / (1000 * 60 * 60 * 24);
      setDaysAway(differenceInDays);
    };
    getDaysAway();
  }, [currentTrip]);

  const handleSlideOut = () => {
    setIsSlidingOut(true);
    setTimeout(() => {
      deleteTrip(currentTrip);
    }, 500); // Match the CSS transition duration
  };

  const handleEditTrip = () => {
    editTrip(currentTrip);
  }

  return (
      <div className={`all-trip ${isSlidingOut ? "slide-out" : ""}`}>
        <div className="trip-container">
          <h1 className="resort-name">{currentTrip.resort}</h1>
          <div className="days-away">
            <div className="days-away-title">Days Away</div>
            <div className="number-of-days">{daysAway}</div>
          </div>
        </div>

        <div className="trip-edit-options">
          <button className="edit-btn" onClick={handleEditTrip}>
            <MdEdit className="edit-icon" />
          </button>

          <button className="delete-btn" onClick={handleSlideOut}>
            <MdDelete className="edit-icon" />
          </button>
        </div>
      </div>
    
  );
}
