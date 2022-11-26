import { setUserProperties } from "firebase/analytics";
import * as React from "react"
import GoogleButton from 'react-google-button'
import { useAuth } from "../context/Authentication.js";
import { Alert } from "react-bootstrap";

export default function Login(){
    const {signInWithGoogle} = useAuth()
    const [error, setError] = React.useState("")
    let {currentUser} =useAuth();

    const handleGoogleSignIn= async (e) => {
        e.preventDefault();

        try{
           await signInWithGoogle();     
        } catch(err)    {
            setError(err.message)
        }

    }

    console.log(currentUser);



    return(
        <React.Fragment>
            {currentUser.displayName && <h1>Hi {currentUser.displayName}!</h1>}
            {error  && <Alert variant="danger"> {error} </Alert>}
            <GoogleButton onClick={signInWithGoogle} style= {{color: "#FFFFFF", }}>Login</GoogleButton>
        </React.Fragment>
    )
}
