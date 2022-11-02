import * as React from "react";
import Review from './Review.js';
import "../App.css";


export default function Bruin_Plate() {
    const r = <Review/>

    return(
        <div>
            <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Bruin Plate</h2>
            <button className="button1" onClick={r.handleClick()}>Write a Review!</button>
            <Review />
        </div>
        
    )
}

