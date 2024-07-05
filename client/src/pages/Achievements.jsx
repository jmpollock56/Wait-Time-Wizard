import React, { useEffect, useState } from "react";
import { Accordion } from '@mantine/core';
import Header from "../components/Header";
import AchievementPanel from "../components/AchievementPanel";
import { achievements } from "../../../server/achievements";
import '../style/Achievements.css';

export default function Achievements(){
    const [allAchievements, setAllAchievements] = useState([]);

    useEffect(() => {
        async function getAchievements(){
            try {
                const response = await fetch('http://localhost:5000/api/collection/achievements');
                const data = await response.json();
                setAllAchievements(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        getAchievements();
    },[])

    return(
        <>
            <Header/>
            <div className="main-collection">
                <h1>Achievements</h1>
                <div className="all-achievements">
                {allAchievements.map((achievement, i) => {
                    return <AchievementPanel achievement={achievement} key={i}/>;
                })}
                </div>
            </div>
            
       
        </>
    );
}