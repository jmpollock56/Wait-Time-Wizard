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

  return (
    <table>
      <thead>
        <tr>
          <th>{park.name}</th>
        </tr>
      </thead>
      <tbody>
        {rides.map((ride, i) => {
          return (
            <tr key={i}>
              <td className="ride-name">{ride.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}