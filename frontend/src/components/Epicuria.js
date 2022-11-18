import * as React from "react";
import Review from './Review.js';
import {firestore} from "../firebase.js";
import {where, query, collection, getDocs} from "@firebase/firestore";
import {displayImage} from "../firebase.js"

import StarRating from './StarRating.js';
import {getDownloadURL} from "firebase/storage";



export default function Epicuria() {

    const [Reviews, setReviews] = React.useState([]);
    const [Urls, setUrls] = React.useState({
    });
    const database = query(collection(firestore, "test"), where("diningHall", "==", "Epicuria"));
    React.useEffect(() => {
        const getReviews = async () => {
            const allReviews = await getDocs(database);
            //console.log(allReviews.docs);
            allReviews.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
            });
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
            for (const item of allReviews.docs) {
                console.log(item.data().image)
                const img = await displayImage("Epicuria", item.data().image);
                console.log(img)
                setUrls((prev) => ({
                    ...prev,
                    [item.data().image]: img,
                }));
            }

        };
        getReviews();
    }, []);

    return(
        <div>
            <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Epicuria</h2>
            <Review hall = {"Epicuria"}/>
            {Reviews.map((review) => {
                console.log(review.image);
                return (
                    <div>
                        {""}
                        <p>Star Rating: <StarRating stars={review.stars}/> </p>
                         <img src={Urls[review.image]}/>
                        <p>Description: {review.text}</p>
                    </div>
                )
            })}
        </div>
        
    )
}