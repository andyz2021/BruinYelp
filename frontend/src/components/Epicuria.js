import * as React from "react";
import Review from './Review.js';
import {firestore} from "../firebase.js";
import {where, query, addDoc, collection, getDocs} from "@firebase/firestore";
import StarRating from './StarRating.js'


export default function Epicuria() {

    const [Reviews, setReviews] = React.useState([]);
    const database = query(collection(firestore, "Reviews"), where("diningHall", "==", "Epicuria"));
    React.useEffect(() => {
        const getReviews = async () => {
            const allReviews = await getDocs(database);
            console.log(allReviews.docs);
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
        };

        getReviews();
    }, []);
    return(
        <div>
            <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Epicuria</h2>
            <Review hall = {"Epicuria"}/>
            {Reviews.map((review) => {
                return (
                    <div>
                        {""}
                        <p>Star Rating: <StarRating stars={review.stars}/> </p>
                        <img src= {review.image}/>
                        <p>Description: {review.text}</p>
                    </div>
                )
            })}
        </div>
        
    )
}