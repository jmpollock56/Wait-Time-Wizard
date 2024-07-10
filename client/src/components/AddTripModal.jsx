import React, { useState, useEffect } from "react";

export default function AddTripModal({ handleNewPlannedTrips }) {
  const [createdTrip, setCreatedTrip] = useState({});
  const [resorts, setResorts] = useState([]);
  const [selectedResort, setSelectedResort] = useState(0);
  const [selectedParks, setSelectedParks] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [minStartDate, setMinStartDate] = useState("");
  const [differenceInDays, setDifferenceInDays] = useState(0);
  const [parkDays, setParkDays] = useState([]);

  function createTrip() {
    // Trip Id generated
    const randomId = Math.floor(Math.random() * 9000000000) + 1000000000;

    if(selectedResort && startDate && endDate && parkDays.length === differenceInDays){
      const newTrip = {
        id: randomId,
        resort: selectedResort,
        dates: { start: startDate, end: endDate },
        tripDays: parkDays,
      }
      console.log(newTrip)
      setCreatedTrip(newTrip)
      handleNewPlannedTrips(newTrip)
      handleAddTripModalClose()
    }

    
  }

  useEffect(() => {
    const fetchDisneyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parks/plan");
        if (response.ok) {
          const data = await response.json();
          setResorts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDisneyData();
  }, []);

  useEffect(() => {
    const getParks = () => {
      const selectedResortObject = resorts.find(
        (resort) => selectedResort === resort.name
      );
      if (selectedResortObject) {
        const availableParks = selectedResortObject.parks;
        availableParks.push({ id: 0, name: "Off Day" });
        setSelectedParks(availableParks);
      } else {
        setSelectedParks(null);
      }

      const now = new Date();
      setMinStartDate(
        `${now.getFullYear()}-${now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`
      );
    };
    getParks();
  }, [selectedResort, resorts]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      setDifferenceInDays(diffDays);
      setParkDays(Array(diffDays).fill(null));
    }
  }, [startDate, endDate]);

  function handleAddTripModalClose() {
    setSelectedResort(0);
    setStartDate("");
    setEndDate("");
    setMinStartDate("");
    setMinEndDate("");
    setDifferenceInDays(0)
  }

  function handleStartDate(start) {
    setMinEndDate(start);
    const newStart = new Date(start);

    newStart.setDate(newStart.getDate() + 1);
    const now = new Date();
    now.setDate(now.getDate() - 1);

    if (newStart < now) {
      alert("Pick a start date that is after the current date");
    } else {
      setStartDate(start);
    }
  }

  function handleEndDate(end) {
    if (!startDate) {
      alert("Please choose a start date first");
    } else {
      setEndDate(end);
    }
  }

  function handleParkDaySelect(value, i){
    const newParkDays = [...parkDays]
    newParkDays[i] = value
    setParkDays(newParkDays)
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog z-1">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create a Trip
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleAddTripModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex w-100 flex-column">
              <div className="d-flex flex-column w-100">
                <div className="">Choose a Resort</div>
                <select
                  className="form-select"
                  value={selectedResort}
                  onChange={(e) => {
                    setSelectedResort(e.target.value);
                  }}
                  name="resort"
                  id="resort"
                >
                  <option defaultValue>Choose</option>
                  {resorts.map((resort) => {
                    return (
                      <option value={resort.name} key={resort.id}>
                        {resort.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <div className="">Choose Dates</div>
                <div className="d-flex flex-row align-item-center justify-content-center align-items-center gap-4">
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    min={minStartDate}
                    required
                    value={startDate}
                    onChange={(e) => {
                      handleStartDate(e.target.value);
                    }}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    min={minEndDate}
                    required
                    value={endDate}
                    onChange={(e) => {
                      handleEndDate(e.target.value);
                    }}
                  />
                </div>
              </div>
              <hr />
              {differenceInDays > 0 ? (
                <div className="d-flex flex-column">
                  {Array(differenceInDays).fill(null).map((_, i) => (
                    <div className="d-flex flex-column" key={i}>
                      <span>{`Day ${i + 1}: `}</span>
                      <select className="form-control" onChange={(e) => {handleParkDaySelect(e.target.value, i)}}>
                        <option></option>
                        {selectedParks &&
                          selectedParks.map((park, j) => (
                            <option 
                              value={park.name} 
                              key={j}>
                              {park.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleAddTripModalClose}
            >
              Close
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={createTrip}
              data-bs-dismiss="modal">
              Save Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
