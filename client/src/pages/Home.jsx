import React, { useState } from "react";
import Header from "../components/Header";
import TripDisplay from "../components/TripDisplay.jsx";
import { Button, Modal, ActionIcon, Tooltip } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from '@tabler/icons-react';
import Plan from "./Plan.jsx";
import '../style/Home.css';

export default function Home() {

    const [opened, { open, close }] = useDisclosure(false);
    const [plannedTrips, setPlannedTrips] = useState([]);

    return (
        <>
            <Header />
            <div className="home-container">
                <Modal opened={opened} onClose={close} title="Create Your Next Trip!">
                    <Plan setPlannedTrips={setPlannedTrips} plannedTrips={plannedTrips} close={close} />
                </Modal>

                <div className="left-container">
                    <div className="user-current-trips">
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
                            {plannedTrips.map((trip, i) => <TripDisplay key={i} trip={trip}/>)}
                        </div>
                    </div>

                    <div className="recent-collections">
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