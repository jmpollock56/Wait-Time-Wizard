import React, { useEffect, useState } from "react";

export default function ParkTable({ park }) {
  const [rides, setRides] = useState([]);
  const [parkId, setParkId] = useState(park.id);

  useEffect(() => {
    const getParkRides = async () => {
      const allRides = park.liveData;

      const operatingRides = allRides.filter((ride) => ride.queue?.STANDBY?.waitTime !== undefined && ride.entityType === "ATTRACTION")
      .sort((a,b) => b.queue.STANDBY.waitTime - a.queue.STANDBY.waitTime);
      setRides(operatingRides);
    }
    getParkRides();
  }, []);

  function getWaitColor(ride){
    if(ride.queue.STANDBY.waitTime < 30){
      return {color: "green"};
    } else if (ride.queue.STANDBY.waitTime >= 30 && ride.queue.STANDBY.waitTime <= 60){
      return {color: "#ffcc00"};
    } else {
      return {color: "red"};
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{park.name}</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rides.map((ride, i) => {
          return (
            <tr key={i}>
              <td className="ride-name">{ride.name}</td>
              <td className="ride-status" style={getWaitColor(ride)}>{(ride.status === "CLOSED") ? ride.status : ride.queue.STANDBY.waitTime}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}