import React, { useState , useContext} from "react";
import { UserContext } from "../context/UserContext.jsx";
import { BsBinoculars } from "react-icons/bs";
import { BsBinocularsFill } from "react-icons/bs";


export default function ParkTableRow({ ride, status, color, parkId, isWatched}) {
  const [watched, setWatched] = useState(isWatched);
  const { watchedRides, setWatchedRides, currentUser } = useContext(UserContext);
 
  
  function watchRide(){
    try {
      /**
       * Create another API connection to add the new
       * ride to the watch list. Also you need to add 
       * a feature where if the ride is already being watch,
       * and the user would like to remove it then all they 
       * would have to do is hit the binoculars again to 
       * remove it. 
       * 
       * Just send the user's, the ride's, and the park's ID to the backend
       */
    } catch (error) {
      
    }
    setWatched(prev => !prev)
    const newWatchedRide = {
      user_id: currentUser.id,
      ride_id: ride.id,
      park_id: parkId
    }
    setWatchedRides(prev => [...prev, newWatchedRide])
  }

  console.log(watchedRides)
  
  return (
    <tr>
      <th
        className="d-flex align-items-center justify-content-between gap-2 p-2 fs-5"
        scope="row"
        style={{ cursor: "pointer" }}
      >
        <div>{ride.name}</div>
        <button className="btn mx-0" role="button" onClick={watchRide}>
          {!watched ? <BsBinoculars size={20}/> : <BsBinocularsFill size={20}/>}
        </button>
      </th>
      <td
        className="p-2 fs-5 align-items-center"
        style={{
          color: color,
          fontWeight: "bold",
          textAlign: "center",
          width: "200px",
        }}
      >
        {status}
      </td>
    </tr>
  );
}
