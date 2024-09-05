import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ParkTable from "../components/ParkTable";
import ResortSection from "../components/ResortSection";
import '../style/Parks.css';

export default function Parks() {
  const [disneyResorts, setDisneyResorts] = useState([]);

  if (!disneyResorts) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-4">
        <div
          className="spinner-border text-primary"
          style={{ width: "200px", height: "200px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4>Loading Good Times</h4>
      </div>
    );
  }

  useEffect(() => {
    const fetchDisneyData = async () => {
      try {

        const response = await fetch('http://localhost:5000/api/parks');
        const data = await response.json();

        setDisneyResorts(data);

      } catch (error) {
        console.error(error);
      }
    }
    fetchDisneyData();
  }, []);

  return (
    <>
      <Header />
      <div className="notice p-3">
        <p>*Wait times may not be accurate due to downtimes and other API issues. If you notice a large number of rides showing 'DOWN,' it either is due to the park being closed or the API having issues retrieving data*</p>
      </div>
      {(disneyResorts) ?
        <div className="resort-container w-100">
          {disneyResorts.map((resort, i) => {
            return <ResortSection key={i} resort={resort} />
          })}

        </div> : "Loading..."
      }

    </>
  );
}