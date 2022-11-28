import * as React from "react";
import "../Menu.css"

export default function Main_Menu() {
    return(
        <React.Fragment>
            <h2 className = "menubar" style = {{color: 'black', display: "flex", justifyContent: "center"}}>DAILY MENU OVERVIEW</h2>
            <div style = {{  position: "relative", 
                overflow: "hidden",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",}}>
                <iframe scrolling = "no" src={"https://menu.dining.ucla.edu/Menus"} style = {{
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    height: "1300px",}}></iframe>
            </div>
        </React.Fragment>
    )
}