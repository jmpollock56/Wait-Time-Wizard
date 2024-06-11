import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TripDisplay from "../components/TripDisplay.jsx";
import EditPlan from "../components/EditPlan.jsx";
import { Button, Modal, ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Plan from "./Plan.jsx";
import "../style/Home.css";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const [deletingTrip, setDeletingTrip] = useState(null);
  const [editTripData, setEditTripData] = useState(null);

  function editTrip(trip) {
    setEditTripData(trip);
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

 

  return (
    <>
      <Header />
      <div className="home-container">

    
        <Modal opened={opened} onClose={close} title="Create Your Next Trip!">
          <Plan
            setPlannedTrips={setPlannedTrips}
            plannedTrips={plannedTrips}
            close={close}
          />
        </Modal>

        
        <Modal opened={openedEdit} onClose={closeEdit} title="Edit Your Trip">
          <EditPlan 
            trip={editTripData}
          />
        </Modal>

        <div className="left-container">
          <div className="recent-favorites">
            <div className="current-trips-header">
              <div className="home-title">Your Trips</div>
              <Tooltip label="Add a new trip!">
                <ActionIcon size="20" variant="outline" onClick={open}>
                  <IconPlus className="add-icon" stroke={1} />
                </ActionIcon>
              </Tooltip>
            </div>
            <hr />

            <div className="planned-trips">
              {plannedTrips.map((trip) => (
                <TripDisplay
                  key={trip.id}
                  trip={trip}
                  deleteTrip={handleDelete}
                  editTrip={editTrip}
                  openEdit={openEdit}
                  isDeleting={deletingTrip === trip.id}
                />
              ))}
            </div>
          </div>

          <div className="recent-favorites">
            <div className="recent-collections-header">
              <div className="home-title">Recent Collections</div>
            </div>
            <hr />
          </div>

          <div className="recent-favorites">
            <div className="recent-collections-header">
              <div className="home-title">Recent Favorites</div>
            </div>
            <hr />
          </div>

          <div className="recent-favorites">
            <div className="recent-collections-header">
              <div className="home-title">Recent Achievements</div>
            </div>
            <hr />
          </div>
        </div>

        <div className="right-container">
          <div className="social-title">Your Social Feed</div>
          <div className="user-feed"></div>
        </div>
      </div>
    </>
  );
}
