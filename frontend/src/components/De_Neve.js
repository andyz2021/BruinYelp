import * as React from "react";
import Review from './Review.js';
import {firestore} from "../firebase.js";
import {where, query, addDoc, collection, getDocs, orderBy} from "@firebase/firestore";
import StarRating from './StarRating.js'


export default function De_Neve() {

    const [Reviews, setReviews] = React.useState([]);
    const [sortBy, setsortBy] = React.useState('0');
    const [sortOptions, setsortOptions] = React.useState(false); //determines if you can see the sort options (triggered when you hit "sort by")
    const [write, setwrite] = React.useState(false); //set to true when user clicks "write a review"
    React.useEffect(() => {
        let database;
        if(sortBy === '0')
        {
            database = query(collection(firestore, "De_Neve"), orderBy("date","asc")); //can't do orderBy with where if different fields
        }
        else
        {
            database = query(collection(firestore, "De_Neve"), orderBy("stars","desc")); //can't do orderBy with where if different fields
        }
        const getReviews = async () => {
            const allReviews = await getDocs(database);
            console.log(allReviews.docs);
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
        };

        getReviews();
    }, [sortBy]);
    
    const handleSort = () =>(event) => {

        const { value } = event.target;
        setsortBy(value);
        console.log(sortBy);
    };

    const handleClickSort = () => {
        setsortOptions(true);
    }

    const handleClickWrite = () => {
        setwrite(true);
    }
    return(
        <React.Fragment>
            {write === false && ( //if you have not clicked "write a review"
                <div>
                <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>De Neve</h2>
            
                <button className="button1" onClick={()=>handleClickWrite()}>Write a Review!</button>
                <br></br>

                { sortOptions === false && ( //if you have not clicked "sort by"
                    <button className="button1" onClick = {()=>handleClickSort()}>Sort By...</button>)}
                { sortOptions === true && ( //if you have clicked "sort by"
                    <form>
                        <select className = "button1" id="selectSort" onChange={handleSort()}>
                            <option value='0'>Most Recent</option>
                            <option value='1'>Highest Rating</option>
                        </select>
                    </form>
                )}
                {Reviews.map((review) => {
                    console.log(review.stars);
                    return (
                    <div>
                        <br></br>
                        <p> Item: {review.item} </p>
                        <p>Star Rating: <StarRating stars={review.stars}/> </p>
                        <img src= {review.image}/>
                        <p>Description: {review.text}</p>
                        <br></br>
                    </div>
                    )
                })}
            </div>)}
            {write === true && (
                <div>
                    <Review hall="De_Neve"/>
                </div>
            )}

        </React.Fragment>

        
    )
}