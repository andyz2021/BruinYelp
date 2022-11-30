import * as React from "react"
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authentication.js";
import {where, query, updateDoc, collection, getDocs, orderBy, setDoc, doc} from "@firebase/firestore";
import {firestore, uploadImage} from "../firebase.js";
import {displayImage} from "../firebase.js"
import StarRating from './StarRating.js'

export default function Dashboard(){
    const {logout} = useAuth();
    let {currentUser} =useAuth();
    const [error, setError] = React.useState("")
    const navigate= useNavigate();
    const [numReviews, setnumReviews] = React.useState(0)
    const [numUpvotes, setnumUpvotes] = React.useState(0)
    const [Reviews, setReviews] = React.useState([]);
    const [Urls, setUrls] = React.useState({
    });

    React.useEffect(() => {
        console.log(currentUser)
        const database = query(collection(firestore, "Reviews"), where("user", "==", currentUser.displayName));

        const getReviews = async () => {
            const allReviews = await getDocs(database);
            //console.log(allReviews.docs);
            //console.log(allReviews.docs);
            
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
            for (const item of allReviews.docs) {
                //console.log(item.data().image)
                const img = await displayImage("Reviews", item.data().image);
                setnumReviews(numReviews+1);
                setnumUpvotes(numUpvotes+item.data().upvotes);
                //console.log(img)
                setUrls((prev) => ({
                    ...prev,
                    [item.data().image]: img,
                }));
            }

        };
        getReviews(database);
    });

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
                
                <p>
                    You have made _ reviews and have a total of _ upvotes.
                </p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        
    
    {Reviews.map((review) => {
        //Add button for upvotes, increment upvote count
        return (
          <div>
              <p> Item: {review.item} </p>
              <p>Upvotes: {review.upvotes}</p>
              <p>Star Rating: <StarRating stars={review.stars}/> </p>
              {Urls[review.image] && <img style={{width: "50%", height: "50%"}} src={Urls[review.image]}/>}
              <p>Description: {review.text}</p>
              <br></br>
          </div>
        )
    })}

</React.Fragment>
    )
}
