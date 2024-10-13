import React, { useEffect } from "react";
import L from 'leaflet';

export default function Map({ currentUser, watchedRides }){

  useEffect(() => {
    if (currentUser && document.getElementById('map')) { // Wait for currentUser to load
      const map = L.map('map').setView([28.4184, -81.5842], 19);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      L.marker([28.4180, -81.5842]).addTo(map)

      watchedRides.map((ride) => {
        console.log(ride)
        L.popup().setLatLng([28.4180, -81.5842]).setContent(`${ride.ride_id}`).openOn(map)
      })
      
  
      return () => {
        map.remove();
      };
    }
  }, [currentUser]); // Ensure this effect runs only when currentUser is loaded

  return (
    <div id="map" className="border border-primary" style={{width: '80%', height: '500px'}}></div>
  )
}