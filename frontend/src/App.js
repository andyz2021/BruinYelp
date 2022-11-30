import Navigation from "./components/Navigation.js"
import * as React from "react";
import { AuthProvider } from "./context/Authentication.js"
import './App.css'

function App () {

    return (
        <div>
            <h1 className = "title" style={{display: "flex", margin: "40px", justifyContent: "center", fontWeight: "900", fontSize: "50px"}}><span>B</span>ruin<span>Y</span>elp</h1>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </div>
    );
}

export default App;
