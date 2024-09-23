import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Resorts from "../ParkTabContent/Resorts";
import "../style/Parks.css";

export default function Parks() {
  const [disneyResorts, setDisneyResorts] = useState([]);
  
  

  useEffect(() => {
    const fetchDisneyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/parks");
        const data = await response.json();
        setDisneyResorts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDisneyData();
  }, []);

  if (disneyResorts.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-4">
        <div
          className="spinner-border text-primary"
          style={{ width: "200px", height: "200px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4>Loading Good Times</h4>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="p-4">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#wdw-tab-pane"
              type="button"
              role="tab"
              aria-controls="wdw-tab-pane"
              aria-selected="true"
            >
              Walt Disney World Resort
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="dl-tab"
              data-bs-toggle="tab"
              data-bs-target="#dl-tab-pane"
              type="button"
              role="tab"
              aria-controls="dl-tab-pane"
              aria-selected="false"
            >
              Disneyland Resort
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="tokyo-tab"
              data-bs-toggle="tab"
              data-bs-target="#tokyo-tab-pane"
              type="button"
              role="tab"
              aria-controls="tokyo-tab-pane"
              aria-selected="false"
            >
              Tokyo Disney Resort
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="dp-tab"
              data-bs-toggle="tab"
              data-bs-target="#dp-tab-pane"
              type="button"
              role="tab"
              aria-controls="dp-tab-pane"
              aria-selected="false"
            >
              Disneyland Paris
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="hk-tab"
              data-bs-toggle="tab"
              data-bs-target="#hk-tab-pane"
              type="button"
              role="tab"
              aria-controls="hk-tab-pane"
              aria-selected="false"
            >
              Hong Kong Disneyland
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="sh-tab"
              data-bs-toggle="tab"
              data-bs-target="#sh-tab-pane"
              type="button"
              role="tab"
              aria-controls="sh-tab-pane"
              aria-selected="false"
            >
              Shanghai Disney Resort
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="wdw-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={'e957da41-3552-4cf6-b636-5babc5cbc4e5'}/>
          </div>
          <div
            className="tab-pane fade"
            id="dl-tab-pane"
            role="tabpanel"
            aria-labelledby="dl-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={'bfc89fd6-314d-44b4-b89e-df1a89cf991e'}/>
          </div>
          <div
            className="tab-pane fade"
            id="tokyo-tab-pane"
            role="tabpanel"
            aria-labelledby="tokyo-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={"faff60df-c766-4470-8adb-dee78e813f42"}/>
          </div>

          <div
            className="tab-pane fade"
            id="dp-tab-pane"
            role="tabpanel"
            aria-labelledby="dp-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={"e8d0207f-da8a-4048-bec8-117aa946b2c2"}/>
          </div>

          <div
            className="tab-pane fade"
            id="hk-tab-pane"
            role="tabpanel"
            aria-labelledby="hk-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={"abcfffe7-01f2-4f92-ae61-5093346f5a68"}/>
          </div>

          <div
            className="tab-pane fade"
            id="sh-tab-pane"
            role="tabpanel"
            aria-labelledby="sh-tab"
            tabIndex="0"
          >
            <Resorts resorts={disneyResorts} id={"6e1464ca-1e9b-49c3-8937-c5c6f6675057"}/>
          </div>
          
        </div>
      </div>
    </>
  );
}
