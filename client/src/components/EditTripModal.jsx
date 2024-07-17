import React, { useEffect, useState } from "react";

export default function EditTripModal({ chosenTrip }) {
  const [chosenEditTrip, setChosenEditTrip] = useState(chosenTrip)
 

  console.log(chosenEditTrip)

  return (
    <div
      className="modal modal-centered fade"
      id="editTripModal"
      tabIndex="-1"
      aria-labelledby="editTripModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog z-1">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Trip
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex w-100 flex-column">
              <div className="d-flex flex-column w-100">
                <div className="">Choose a Resort</div>
                
              </div>
              <hr />
              <div className="d-flex flex-column">
                <div className="">Choose Dates</div>
                <div className="d-flex flex-row align-item-center justify-content-center align-items-center gap-4">
                  
                </div>
              </div>
              <hr />
              
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
