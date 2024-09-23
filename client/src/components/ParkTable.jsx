import React, { useEffect, useState, useContext } from "react";
import ParkTableRow from "./ParkTableRow";
import { UserContext } from "../context/UserContext.jsx";
import { MdStarBorder } from "react-icons/md";
import { MdStar } from "react-icons/md";

export default function ParkTable({ park }) {
  const [rides, setRides] = useState([]);
  const [name, setName] = useState(park.name);
  const [textColor, setTextColor] = useState("green");
  const [isFavorite, setIsFavorite] = useState(false)
  const { watchedRides } = useContext(UserContext);

  /**
   * Used for ordering the ride wait times from shortest to longest
   */
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
          if (ride.id === "e3549451-b284-453d-9c31-e3b1207abd79") {
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

  function checkIfWatched(ride){
    if(watchedRides.some(wRide => wRide.ride_id === ride.id)){
      return true 
    } else {
      return false
    }
  }

  function addFavorite(){
    setIsFavorite(prev => !prev)
  }

  return (
    <div className="table-responsive w-100" style={{maxWidth: '1200px'}}>
      <table className="table table-striped table-hover table-borderless h-100 border shadow">
        <thead className="z-1" style={{ textAlign: "center" }}>
          <tr>
            <th
              className="d-flex justify-content-center align-items-center gap-2 bg-primary bg-gradient"
              scope="col"
            >
              <button 
              role="button" 
              className="btn mx-0 p-0" 
              onClick={addFavorite} 
              style={{outline: 'none'}}
              >
                {(isFavorite) ? <MdStar size={32} color="yellow"/> : <MdStarBorder size={32}/>}
              </button>
              
              <div className="fs-3">{name}</div>
            </th>
            <th className="fs-3 bg-primary bg-gradient">Status</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, i) => {
            try {
              const { status, color } = getRideStatus(ride);
              return <ParkTableRow status={status} color={color} ride={ride} parkId={park.id} isWatched={checkIfWatched(ride)} key={i}/>
            } catch(err){
              console.error(err)
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
