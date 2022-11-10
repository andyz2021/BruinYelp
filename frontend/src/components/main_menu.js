import * as React from "react";

export default function Main_Menu() {
    return(
        <React.Fragment>
            <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Menus</h2>
            <div style = {{  position: "relative",
                overflow: "hidden",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",}}>
                <iframe scrolling = "no" src={"https://menu.dining.ucla.edu/Menus"} style = {{
                    width: "1300px",
                    display: "flex",
                    alignItems: "center",
                    height: "1300px",}}></iframe>
            </div>
        </React.Fragment>
    )
}