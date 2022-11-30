import * as React from "react"
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication.js";
import {where, query, updateDoc, collection, getDocs, orderBy, setDoc, doc, getCountFromServer} from "@firebase/firestore";
import {firestore, uploadImage} from "../firebase.js";
import {displayImage} from "../firebase.js"
import StarRating from './StarRating.js'
import "../Dashboard.css"

export default function Dashboard(){
    const {logout} =  useAuth();
    let {currentUser} = useAuth();
    const [error, setError] = React.useState("")
    const navigate= useNavigate();
    const [numReviews, setnumReviews] = React.useState(0)
    const [numUpvotes, setnumUpvotes] = React.useState(0)
    const [Reviews, setReviews] = React.useState([]);
    const [Urls, setUrls] = React.useState({
    });

    React.useEffect(() => {
        let database;
        console.log(currentUser)
        if(currentUser) {
            console.log("true")
            database = query(collection(firestore, "Reviews"), where("user", "==", currentUser.displayName));
        }
        const getReviews = async () => {
            const snapshot =  await getCountFromServer(database);
            //console.log('count: ', snapshot.data().count);
            setnumReviews(snapshot.data().count);
            const allReviews = await getDocs(database);
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
            for (const item of allReviews.docs) {
                const img = await displayImage("Reviews", item.data().image);
                setUrls((prev) => ({
                    ...prev,
                    [item.data().image]: img,
                }));
            }
            let n = 0;
            allReviews.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                n = n + doc.data().upvotes;

            });
            setnumUpvotes(n);


        };

            getReviews(database);

    }, [currentUser]);

    const handleLogout = async () => {
        //catches errors, and navigates back to home once we logout
        try{
            await logout();
            navigate ("/");
         } catch(err)    {
             setError(err.message)
         }
    }

    return (
        //returns info on the user's name and a logout button
        <React.Fragment>
            <div className="dashbox">
                <h3><b>Hi {currentUser.displayName}!</b></h3>
                {error  && <Alert variant="danger"> {error} </Alert>}
                {/* <br></br> */}
                <div className="text"><p>You have made {numReviews} review(s) and accumulated {numUpvotes} upvote(s). Don't be shy, keep posting!</p></div>
            </div>
            <br></br>
                <h4>
                    <b><em>See your posted reviews:</em></b>
                </h4>
    
    {Reviews.map((review) => {
        //Add button for upvotes, increment upvote count
        return (
        <div>
            <div className="reviewdisplay">               
                <p><b>Item: </b>{review.item} </p>
                <p><b>User: </b>{review.user} </p>
                <p><StarRating stars={review.stars} change={"false"}/> </p>
                <p>{review.text}</p>
                {Urls[review.image] && <img style={{height: "auto", width: "auto", maxWidth: "250px", maxHeight: "200px"}} src={Urls[review.image]}/>}
            <br></br>
            </div>
        </div>
      )
    })}
        <button className="logout" onClick={handleLogout}>Logout</button>
        <br>
        </br>
        <br>
        </br>
    

</React.Fragment>
    )
}
