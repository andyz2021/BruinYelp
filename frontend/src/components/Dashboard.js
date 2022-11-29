import * as React from "react"
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication.js";
import {collection} from "@firebase/firestore";
import {firestore} from "../firebase";

export default function Dashboard(){
    const {logout} = useAuth();
    let {currentUser} =useAuth();
    const [error, setError] = React.useState("")
    const navigate= useNavigate();
    const database_all = collection(firestore, "Reviews");
    const handleLogout = async () => {
        //catches errors, and navigates back to home once we logout
        try{
            await logout();
            navigate ("/");
         } catch(err)    {
             setError(err.message)
         }
    }

    console.log(currentUser)

    return (
        //returns info on the user's name and a logout button
        <React.Fragment>
            <div>
                <h1>Hi {currentUser.displayName}!</h1>
                {error  && <Alert variant="danger"> {error} </Alert>}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </React.Fragment>
    )
}
