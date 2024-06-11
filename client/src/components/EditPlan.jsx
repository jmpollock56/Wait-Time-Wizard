import React, { useState , useEffect} from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Select } from '@mantine/core';
import { Button } from '@mantine/core';
import '@mantine/dates/styles.css';
import '../style/Plan.css';


export default function EditPlan({ trip }){

    const [resorts, setResorts] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(trip);
    const [selectedResort, setSelectedResort] = useState("");
    const [selectedParks, setSelectedParks] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [differenceInDays, setDifferenceInDays] = useState(0);
    const [tripDays, setTripDays] = useState(Array(differenceInDays).fill(''));

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
            const [selectedResortObject] = resorts.filter((resort) => selectedResort === resort.name);
            if (selectedResortObject) {

                const availableParks = selectedResortObject.parks;
                availableParks.push({ id: 0, name: "Off Day" });
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

    function handleSelectChange(value, index){
        const newTripDays = [...tripDays];
        newTripDays[index] = value;
        setTripDays(newTripDays);
        console.log(newTripDays);
    }

    function createTrip(){
        // Trip Id generated
        const randomId = Math.floor(Math.random() * 9000000000) + 1000000000;

        const newVacation = {
            id: randomId,
            resort: selectedResort,
            dates: selectedDates,
            tripDays: tripDays
        }

        setPlannedTrips(prevTrips => [...prevTrips, newVacation]);
        console.log(newVacation);
        close();
    }

    console.log(selectedTrip);

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
                                    return resort.name;
                                })
                            }
                            value={selectedResort}
                            onChange={setSelectedResort}
                            defaultValue={`${selectedTrip.resort}`}
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
                                data={selectedParks.map((park) => park.name)}
                                onChange={(value) => handleSelectChange(value, i)}
                            />
                        ))}
                    </div>

                    <div className="button-container">
                        <Button
                            variant="gradient"
                            gradient={{ from: '#8DB4E4', to: 'blue', deg: 5 }}
                            onClick={createTrip}>
                                Create Trip
                        </Button>
                        <Button variant="outline" color="#8DB4E4">Reset</Button>
                    </div>
                </div>
            </div>
        </>
    );
}