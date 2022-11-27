import * as React from "react";
import {Navigate} from 'react-router-dom'
import { useAuth } from "../context/Authentication.js";



export default function PrivateRoute({children}){
    let {currentUser}= useAuth();

    if (currentUser==null){
        return <Navigate to="/"/>
    }
    else{
    return(children)
    }   
}

