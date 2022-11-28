import React, {useContext, createContext, useState, useEffect} from "react"
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export function useAuth(){
    //returns our context
    return useContext(AuthContext);
}


    


export function AuthProvider({children}) {
    //create and set users
    const [currentUser, setCurrentUser] = useState("");


    function signInWithGoogle ()  {
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        //changes user when function mounted
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return () =>{unsubscribe()
        }   
    }, [])

    const value= {
        currentUser,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


