import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ParkTable from '../components/ParkTable'

export default function Resorts({ resorts, id }){
  const [parks, setParks] = useState(() => {
    const wdw = resorts.find(resort => resort.id === id);
    return wdw ? wdw.parks : [];
  });

  if(parks.length === 0){
    return <div>Loading</div>
  } 
  

  return (
    <div className='d-flex flex-wrap justify-content-evenly p-2 gap-3'>
      {parks.map((park, i) => {
        return <ParkTable key={i} park={park}/>
      })}
    </div> 
  )
}