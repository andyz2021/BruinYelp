import * as React from "react"
import GoogleButton from 'react-google-button'
import { useAuth } from "../context/Authentication.js";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function Login(){
    const navigate= useNavigate();
    const {signInWithGoogle} = useAuth()
    const [error, setError] = React.useState("")
    let {currentUser} =useAuth();

    const handleGoogleSignIn= async (e) => {
        e.preventDefault();
        try{
           await signInWithGoogle(); 
            navigate("/");
            //automatic navigate to home
        } catch(err)    {
            setError(err.message)
        }
        //calls the signin function, but will throw an error if an error during login
    }
    console.log(currentUser)

    return(
        <React.Fragment>
            {error  && <Alert variant="danger"> {error} </Alert>}
            <GoogleButton onClick={handleGoogleSignIn} style= {{color: "#FFFFFF", }}>Login</GoogleButton>
        </React.Fragment>
    )
}
