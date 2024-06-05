import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { DatePickerInput } from '@mantine/dates';
import { Select } from '@mantine/core';
import '@mantine/dates/styles.css';
import '../style/Plan.css';

export default function Plan() {
    const [resorts, setResorts] = useState([]);
    const [selectedResort, setSelectedResort] = useState("");
    const [selectedParks, setSelectedParks] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [differenceInDays, setDifferenceInDays] = useState(0);


    useEffect(() => {
        const fetchDisneyData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/parks/plan');
                if (response.ok) {
                    const data = await response.json();
                    setResorts(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchDisneyData();
    }, []);

    useEffect(() => {
        const getParks = () => {
            const [selectedResortObject] = resorts.filter((resort) => selectedResort === resort.resortName);
            if (selectedResortObject) {
                const availableParks = selectedResortObject.parks;
                availableParks.push({ id: 0, parkName: "Rest Day" });
                setSelectedParks(availableParks);
            } else {
                setSelectedParks(null);
            }
        }
        getParks();
    }, [selectedResort]);

    useEffect(() => {
        const checkIfDatesAreBeforeCurrent = () => {
            let now = new Date();

            if (selectedDates[0] < now) {
                alert('Choose a date in the future');
                setSelectedDates([]);
            }

            if (selectedDates[0] && selectedDates[1]) {
                let diffTime = selectedDates[1] - selectedDates[0];
                let diffDays = Math.round(diffTime / (1000 * 3600 * 24));
                setDifferenceInDays(diffDays + 1);
            }
        }
        checkIfDatesAreBeforeCurrent();
    }, [selectedDates]);

    return (
        <>
            <Header />
            <div className="plan-container">
                <div className="top-form">
                    <Select
                        required
                        label="Park"
                        placeholder="Pick a Location"
                        data={
                            resorts.map((resort, i) => {
                                return resort.resortName;
                            })
                        }
                        value={selectedResort}
                        onChange={setSelectedResort}
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
                    {[...Array(differenceInDays)].map((_, i) => (
                        <Select
                            key={i}
                            label={`Day ${i + 1}`}
                            className="park-select"
                            data={selectedParks.map((park, i) => {
                                return { value: park.id.toString(), label: park.parkName };
                            })} />
                    ))}
                </div>
                <hr />
            </div>
        </>
    );
}