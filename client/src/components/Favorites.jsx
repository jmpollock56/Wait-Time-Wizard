import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { MdStar } from "react-icons/md";

export default function Favorites(){
  const { favoriteParks } = useContext(UserContext);

  return (
    <div className="d-flex flex-column w-50">
      {favoriteParks.map((park, i) => {
        return <div className="d-flex align-items-center"><MdStar color="blue" size={25}/><div className="main-text text-bold fs-4" key={i}>{park.name}</div></div>
      })}
    </div>
  )
}