import Navigation from "./components/Navigation.js"
import * as React from "react";
import { AuthProvider } from "./context/Authentication.js"
function App () {

    return (
        <>
<<<<<<< HEAD
            <h1 className = "title" style={{color: 'black', display: "flex", margin: "30px", justifyContent: "center", fontFamily: "Arial", fontWeight: "bold"}}>BruinYelp</h1>
=======
            <h1 className = "title" style={{color: 'black', display: "flex", margin: "20px", justifyContent: "center", fontFamily: "Arial", fontWeight: "bold"}}>BruinYelp</h1>
>>>>>>> e4d9ee1861d6d65aebde7605a10ec2647296213f
            <AuthProvider>
                <Navigation/>
            </AuthProvider>
        </>
    );
}

export default App;
