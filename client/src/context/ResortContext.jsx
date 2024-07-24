import React, { createContext, useState } from 'react'

const ResortContext = createContext()

const ResortProvider = ({ children }) => {
  const [allResorts, setAllResorts] = useState([])
  const [plannedTrips, setPlannedTrips] = useState([])

  useEffect(() => {
    const fetchDisneyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parks/plan");
        if (response.ok) {
          const data = await response.json();
          setAllResorts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDisneyData();
  }, [])

  const value = {
    allResorts
  }


  return (
    <ResortContext.Provider value={{ allResorts }}>
      {children}
    </ResortContext.Provider>
  )
}

export { ResortContext, ResortProvider }