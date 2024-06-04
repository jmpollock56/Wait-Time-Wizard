import React from "react";
import Header from "../components/Header";
import '../style/Plan.css';

export default function Plan(){
    return (
        <>
            <Header />
            <div className="plan-container">
                <form action="">
                    <div className="top-form">
                        <label htmlFor="location">Location: </label>
                        <select name="location" id="location">
                            <option>Magic Kingdom</option>
                        </select>
                    </div>
                </form>
            </div>
        </>
    );
}