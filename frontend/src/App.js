import Navigation from "./components/Navigation.js"
import * as React from "react";
import { AuthProvider } from "./context/Authentication.js"
function App () {

    return (
        <div>
            <h1 className = "title" style={{color: 'black', display: "flex", margin: "30px", justifyContent: "center", fontFamily: "Arial", fontWeight: "bold"}}>BruinYelp</h1>
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </div>
    );
}

export default App;
