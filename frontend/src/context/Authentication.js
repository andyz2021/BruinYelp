import React, {useContext, createContext, useState, useEffect} from "react"
import { auth, provider } from "../firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth(){
    //returns our context
    return useContext(AuthContext);
}


    


export function AuthProvider({children}) {
    //create and set users
    const [currentUser, setCurrentUser] = useState("");

    provider.setCustomParameters({
        //prompts selecting account during each sign in
        prompt: 'select_account'
     });

    function signInWithGoogle ()  {
        return signInWithPopup(auth, provider);
    }

    function logout(){
        //logout function, will be called in dashboard
        return signOut(auth);
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
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


