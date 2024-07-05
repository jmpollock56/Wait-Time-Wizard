import React, { useState, useEffect } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Select } from '@mantine/core';
import { Button } from '@mantine/core';
import '@mantine/dates/styles.css';
import '../style/Plan.css';


export default function EditPlan({ tripData, setPlannedTrips, close }) {

    const [resorts, setResorts] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(tripData);
    const [selectedResort, setSelectedResort] = useState(tripData.resort);
    const [selectedParks, setSelectedParks] = useState([]);
    const [selectedDates, setSelectedDates] = useState(tripData.dates); // array with start and end dates
    const [differenceInDays, setDifferenceInDays] = useState(0); // how many days the trip is
    const [tripDays, setTripDays] = useState(tripData.tripDays); // holds the name of the parks for each day in an array


    useEffect(() => {
        const fetchDisneyData = async () => {

            try {

                const response = await fetch('http://localhost:5000/api/parks/plan');

                if (response.ok) {
                    const data = await response.json();
                    setResorts(data);
                } else {
                    console.log('miss');
                }
            } catch (error) {
                console.error('fetchDisneyData error', error);
            }
        }
        fetchDisneyData();
    }, []);

    useEffect(() => { // Data for loading Select with Park options for each day
        const getParks = () => {

            const [selectedResortObject] = resorts.filter((resort) => selectedResort === resort.name);

            if (selectedResortObject) {
                console.log('selectParks run');
                const availableParks = selectedResortObject.parks;
                availableParks.push({ id: 0, name: "Off Day" });
                setSelectedParks(availableParks);
                setSelectedDates(tripData.dates);
            } else {
                console.log('null parks');
                setSelectedParks(null);
            }
        }
        getParks();
    }, [selectedResort, resorts]);

    useEffect(() => {
        const checkIfDatesAreBeforeCurrent = () => {

            let now = new Date();

            if (selectedDates[0] < now) {
                alert('Choose a date in the future');

            }

            if (selectedDates[0] && selectedDates[1]) {
                let diffTime = selectedDates[1] - selectedDates[0];
                let diffDays = Math.round(diffTime / (1000 * 3600 * 24));
                setDifferenceInDays(diffDays + 1);

            }
        }
        checkIfDatesAreBeforeCurrent();
    }, [selectedDates]);

    function handleSelectChange(value, index) {
        const newTripDays = [...tripDays];
        newTripDays[index] = value;
        setTripDays(newTripDays);
    }

    function editOldTrip() {
        const randomId = Math.floor(Math.random() * 9000000000) + 1000000000;
        

        const editedVacation = {
            id: randomId,
            resort: selectedResort,
            dates: selectedDates,
            tripDays: tripDays
        }
        
        setPlannedTrips(prevTrips => {
            let updatedTrips = [...prevTrips, editedVacation];
            updatedTrips = updatedTrips.filter(trip => trip.id !== selectedTrip.id);
            return updatedTrips;
        });
        close();
    }

    return (
        <>
            <div className="plan-container">
                <div className="plan-form">
                    <div className="top-form">
                        <Select
                            required
                            label="Resort"
                            placeholder="Pick a Location"
                            data={
                                resorts.map((resort, i) => {
                                    return { value: resort.name, label: resort.name };
                                })
                            }
                            value={selectedResort}
                            onChange={setSelectedResort}
                            defaultValue={selectedTrip.resort}
                        />

                        <DatePickerInput
                            required
                            type="range"
                            label="Trip Date"
                            placeholder="Pick Trip Dates"
                            value={selectedDates}
                            onChange={setSelectedDates}
                        />
                    </div>

                    <div className="park-picker">
                        {(selectedParks && differenceInDays) && [...Array(differenceInDays)].map((_, i) => (
                            <Select
                                key={i}
                                label={`Day ${i + 1}`}
                                className="park-select"
                                value={tripDays[i]}
                                data={selectedParks.map((park) => park.name)}
                                onChange={(value) => handleSelectChange(value, i)}
                            />
                        ))}
                    </div>


                    <div className="button-container">
                        <Button
                            variant="gradient"
                            gradient={{ from: '#8DB4E4', to: 'blue', deg: 5 }}
                            onClick={editOldTrip}>
                            Edit Trip
                        </Button>
                        
                    </div>
                </div>
            </div>
        </>
    );
}