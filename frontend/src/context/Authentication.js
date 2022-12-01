import React, { useContext, createContext, useState, useEffect } from "react"
import { auth, provider } from "../firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { firestore, uploadImage } from "../firebase.js";
import { instance, where, query, collection, updateDoc, getDocs, getDoc, orderBy, setDoc, doc, startAt, endAt } from "@firebase/firestore";


const AuthContext = createContext();

export function useAuth() {
    //returns our context
    return useContext(AuthContext);
}





export function AuthProvider({ children }) {
    //create and set users
    const [currentUser, setCurrentUser] = useState("");
    const database = collection(firestore, "users");

    provider.setCustomParameters({
        //prompts selecting account during each sign in
        prompt: 'select_account'
    });



    const addDb = async () => {
        console.log(currentUser.uid)
        const DOC = await getDoc(doc(collection(firestore, "users"), currentUser.uid))
        console.log(DOC.exists())
        if (!DOC.exists()) {
            const result = await setDoc(doc(collection(firestore, "users"), currentUser.uid), { username: currentUser.displayName, upvoteCount: 0, reviews: 0, upvotedReview: [] }, { merge: true });
        }
    }

    function signInWithGoogle() {
        return signInWithPopup(auth, provider);
    }

    function logout() {
        //logout function, will be called in dashboard
        return signOut(auth);
    }


    useEffect(() => {
        //changes user when function mounted
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log("changed")
            console.log(currentUser)

            if (user !== null) {
                console.log('addDB')
                addDb();
            }
            else {
                console.log('skipped asf')
            }
        })
        return () => {
            unsubscribe()
        }
    }, [currentUser])

    const value = {
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


