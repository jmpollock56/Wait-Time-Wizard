import React, { useEffect, useState } from "react";

export default function ParkTable({ park }) {
  const [rides, setRides] = useState(park.liveRides);
  const [name, setName] = useState(park.name);
  const [textColor, setTextColor] = useState("green");


  useEffect(() => {
    const getParkRides = async () => {
      let allRides = [];

      const lands = park.lands;

      for (let i = 0; i < lands.length; i++) {
        for (let j = 0; j < lands[i].rides.length; j++) {
          allRides.push(lands[i].rides[j]);
        }
      }

    }
    getParkRides();
  }, []);



  function getRideStatus(ride) {
    try {
      if (!("queue" in ride)) {
        return;
      } else {
        try {
          if (ride.id === "5a43d1a7-ad53-4d25-abfe-25625f0da304" || ride.id === "e3549451-b284-453d-9c31-e3b1207abd79") {

            return {
              status: `${ride.queue.BOARDING_GROUP.currentGroupStart} - ${ride.queue.BOARDING_GROUP.currentGroupEnd}`,
              color: 'blue'
            };
          } else if (ride.status === "CLOSED" || ride.status === "DOWN" || ride.status === "REFURBISHMENT") {
            console.log(ride.status);
            return {
              status: ride.status,
              color: (ride.status === "REFURBISHMENT") ? "orange" : "red"
            };
          } else {

            return {
              status: `${ride.queue.STANDBY.waitTime} mins` || ride.status,
              color: "green"
            };
          }
        } catch (error) {
          console.log(ride, error);
        }



      }
    } catch (error) {
      console.error(ride, error);
    }


  }

  return (
    <table>
      <thead>
        <tr>
          <th>{name}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rides.map((ride, i) => {
          const { status, color } = getRideStatus(ride);
          return (
            <tr key={i}>
              <td className="ride-name">{ride.name}</td>
              <td style={{ color: color }} className="ride-status">{status}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}