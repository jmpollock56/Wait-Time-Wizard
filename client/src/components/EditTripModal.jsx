import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function EditTripModal({ chosenTrip }) {
  const [chosenEditTrip, setChosenEditTrip] = useState((chosenTrip) ? chosenTrip : {});
  const [chosenParkDays, setChosenParkDays] = useState([]);
  const [newSelectedResort, setNewSelectedResort] = useState("");
  const [chosenStart, setChosenStart] = useState("");
  const [chosenEnd, setChosenEnd] = useState("");
  const [minStart, setMinStart] = useState(null);
  const [allResorts, setAllResorts] = useState([]);
  const [currentParks, setCurrentParks] = useState([]);
  const [chosenDifferenceInDays, setChosenDifferenceInDays] = useState(0);
  const { editExistingTrip } = useContext(UserContext)

  
  useEffect(() => {
    setChosenEditTrip(chosenTrip)
    setNewSelectedResort(chosenTrip.resort)
    setChosenStart(chosenTrip.start_date)
    setChosenEnd(chosenTrip.end_date)
    setChosenParkDays(chosenTrip.parkDays)
  }, [chosenTrip])
  
  useEffect(() => {
    const fetchDisneyData = async () => {
      try {
        const responseParks = await fetch("http://localhost:5000/api/parks/plan");
        if (responseParks.ok) {
          const data = await responseParks.json();
          setAllResorts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchDisneyData() 
    
  }, [])

  useEffect(() => {
    const getParks = () => {
      const selectedResortObject = allResorts.find(
        (resort) => newSelectedResort === resort.name
      );

      if (selectedResortObject) {
        const availableParks = selectedResortObject.parks;
        availableParks.push({ id: 0, name: "Off Day" });
        setCurrentParks(availableParks);
      } else {
        setCurrentParks(null);
      }

      const now = new Date();
      setMinStart(
        `${now.getFullYear()}-${
          now.getMonth() < 9 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
        }-${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}`
      );
    };
    getParks();
  }, [newSelectedResort, allResorts]);

  useEffect(() => {
    if (chosenStart && chosenEnd) {
      const start = new Date(chosenStart);
      const end = new Date(chosenEnd);

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      setChosenDifferenceInDays(diffDays);
    }
  }, [chosenStart, chosenEnd]);

  function handleNewParkDaySelect(e, i) {
    const newChosenPark = JSON.parse(
      e.target.options[e.target.selectedIndex].getAttribute("data-value")
    );
    const newChosenParkDays = [...chosenParkDays];
    newChosenParkDays[i] = newChosenPark;
    setChosenParkDays(newChosenParkDays);
  }

  function handleUpdatedTrip() {
    
    if (
      newSelectedResort &&
      chosenStart &&
      chosenEnd &&
      chosenParkDays.length === chosenDifferenceInDays
    ) {

      const newTrip = {
        id: chosenEditTrip.id,
        resort: newSelectedResort,
        dates: { start: chosenStart, end: chosenEnd },
        tripDays: chosenParkDays,
      }

      editExistingTrip(newTrip)
    }
  }

    return (
      <div
        className="modal modal-centered fade"
        id="editTripModal"
        tabIndex="-1"
        aria-labelledby="editTripModal"
        aria-hidden="true"
      >
        <div className="modal-dialog z-1">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Trip
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex w-100 flex-column">
                <div className="d-flex flex-column w-100">
                  <div className="">Choose a Resort</div>
                  <select
                    className="form-select"
                    value={newSelectedResort}
                    onChange={(e) => {
                      setNewSelectedResort(e.target.value);
                    }}
                    name="resort"
                    id="resort"
                  >
                    <option></option>
                    {allResorts.map((resort) => {
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
                      min={minStart}
                      required
                      value={chosenStart}
                      onChange={(e) => {
                        setChosenStart(e.target.value);
                      }}
                    />
                    <span>to</span>
                    <input
                      type="date"
                      name="endDate"
                      className="form-control"
                      min={chosenStart}
                      required
                      value={chosenEnd}
                      onChange={(e) => {
                        setChosenEnd(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <hr />
                {chosenDifferenceInDays > 0 ? (
                  <div className="d-flex flex-column">
                    {Array(chosenDifferenceInDays)
                      .fill(null)
                      .map((_, i) => (
                        <div className="d-flex flex-column" key={i}>
                          <span>{`Day ${i + 1}: `}</span>
                          <select
                            className="form-control"
                            value={chosenParkDays[i]?.name || ""}
                            onChange={(e) => {
                              handleNewParkDaySelect(e, i);
                            }}
                          >
                            <option></option>
                            {currentParks &&
                              currentParks.map((cPark, j) => {
                                return (
                                  <option
                                    data-value={JSON.stringify(cPark)}
                                    key={j}
                                  >
                                    {cPark.name}
                                  </option>
                                );
                              })}
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
                onClick={() => setChosenEditTrip(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleUpdatedTrip}
              >
                Save Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
