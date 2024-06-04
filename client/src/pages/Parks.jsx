import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ParkTable from "../components/ParkTable";
import '../style/Parks.css';

export default function Parks() {
  const [disneyParks, setDisneyParks] = useState([]);
  
  useEffect(() => {
    const fetchDisneyData = async () => {
      try {
        console.log('called');
        const response = await fetch('http://localhost:5000/api/parks');
        const data = await response.json();
        const sortedData = data.sort((a,b) => a.name.localeCompare(b.name));
        setDisneyParks(sortedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDisneyData();
  }, []);

console.log(disneyParks);
  return (
    <>
      <Header />
      <div className="parks-container">
      {disneyParks.map((park, i) =>{
        return <ParkTable key={i} park={park} />
       })}

      </div>
    </>
  );
}