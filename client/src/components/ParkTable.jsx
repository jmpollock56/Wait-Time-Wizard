import React, { useEffect, useState } from "react";


export default function ParkTable({ park }) {
  const [rides, setRides] = useState([]);
  const [name, setName] = useState(park.name);
  const [textColor, setTextColor] = useState("green");

  useEffect(() => {
    const liveRides = park.liveRides;

    try {
      const abcRides = liveRides.sort((a, b) => {
        const waitTimeA = a.queue?.STANDBY?.waitTime;
        const waitTimeB = b.queue?.STANDBY?.waitTime;

        if (waitTimeA !== undefined && waitTimeB !== undefined) {
          console.log("1");
          return a.queue.STANDBY.waitTime - b.queue.STANDBY.waitTime;
        }

        if (waitTimeA === undefined && waitTimeB !== undefined) {
          return 1;
        }

        if (waitTimeA !== undefined && waitTimeB === undefined) {
          return -1;
        }

        return 0;
      });
      setRides(abcRides);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function getRideStatus(ride) {
    try {
      // Right now this returns REFURB rides
      if (!("queue" in ride) || ride.status === "REFURBISHMENT") {
        return {
          status: ride.status,
          color: "orange",
        };
      } else {
        try {
          // Guardians and TRON
          if (
            ride.id === "5a43d1a7-ad53-4d25-abfe-25625f0da304" ||
            ride.id === "e3549451-b284-453d-9c31-e3b1207abd79"
          ) {
            return {
              status: ride.queue.BOARDING_GROUP.currentGroupStart
                ? `${ride.queue.BOARDING_GROUP.currentGroupStart} - ${ride.queue.BOARDING_GROUP.currentGroupEnd}`
                : "DOWN",
              color: ride.queue.BOARDING_GROUP.currentGroupStart
                ? "blue"
                : "red",
            };
            // For rides that are closed and down
          } else if (ride.status === "CLOSED" || ride.status === "DOWN") {
            return {
              status: ride.status,
              color: "red",
            };
            // Everything else
          } else {
            return {
              status: ride.queue.STANDBY.waitTime
                ? `${ride.queue.STANDBY.waitTime} mins`
                : "OPEN",
              color: "green",
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
    <div className="table-container shadow">
      <table className="table table-striped h-100">
        <thead className="sticky-top z-1" style={{textAlign: 'center'}}>
          <tr>
            <th className="bg-primary-subtle d-flex justify-content-center align-items-center gap-2" scope="col">
              <input type="checkbox" name="favPark" style={{height: "20px", width: "20px"}}/>
              <div>{name}</div>
            </th>
            <th className="bg-primary-subtle" >Status</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, i) => {
            try {
              const { status, color } = getRideStatus(ride);
              return (
                <tr>
                  <th scope="row">{ride.name}</th>
                  <td
                    style={{
                      color: color,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {status}
                  </td>
                </tr>
              );
            } catch (error) {
              console.log(error);
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
