import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ParkTable from "../components/ParkTable";
import ResortSection from "../components/ResortSection";
import '../style/Parks.css';

export default function Parks() {
  const [disneyResorts, setDisneyResorts] = useState([]);

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
      <div className="notice">
        <p>*Wait times may not be accurate due to downtimes and other API issues. If you notice a large number of rides showing 'DOWN,' it either is due to the park being closed or the API having issues retrieving data*</p>
      </div>
      {(disneyResorts) ?
        <div className="resort-container">
          {disneyResorts.map((resort, i) => {
            return <ResortSection key={i} resort={resort} />
          })}

        </div> : "Loading..."
      }

    </>
  );
}