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
        //calls the signin function, but will throw an error if an error during login
    }

    return(
        <React.Fragment>
            {error  && <Alert variant="danger"> {error} </Alert>}
            <GoogleButton onClick={signInWithGoogle} style= {{color: "#FFFFFF", }}>Login</GoogleButton>
        </React.Fragment>
    )
}
