import * as React from "react";
import Review from './Review.js';
import "../App.css";


export default function Bruin_Plate() {

    return(
        <div>
            <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Bruin Plate</h2>
            <Review hall="Bruin_Plate"/>
        </div>
        
    )
}

