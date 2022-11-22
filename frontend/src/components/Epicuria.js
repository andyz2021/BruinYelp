import * as React from "react";
import Review from './Review.js';
import {firestore} from "../firebase.js";
import {where, query, addDoc, collection, getDocs, orderBy} from "@firebase/firestore";
import StarRating from './StarRating.js'
import {displayImage} from "../firebase.js"
import {getDownloadURL} from "firebase/storage";


export default function Epicuria() {

    const [Reviews, setReviews] = React.useState([]);
    const [sortBy, setsortBy] = React.useState('0');
    const [sortOptions, setsortOptions] = React.useState(false); //determines if you can see the sort options (triggered when you hit "sort by")
    const [write, setwrite] = React.useState(false); //set to true when user clicks "write a review"
    const [Urls, setUrls] = React.useState({
    });
    
    
    React.useEffect(() => {
        let database;
        if(sortBy === '0')
        {
            database = query(collection(firestore, "Epicuria"), orderBy("date","asc")); //can't do orderBy with where if different fields
        }
        else
        {
            database = query(collection(firestore, "Epicuria"), orderBy("stars","desc")); //can't do orderBy with where if different fields
        }
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
                <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Epicuria</h2>
            
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
                    console.log(review.image)
                    return (
                      <div>
                          <br></br>
                          <p> Item: {review.item} </p>
                          <p>Star Rating: <StarRating stars={review.stars}/> </p>
                          {Urls[review.image] && <img src={Urls[review.image]}/>}
                          <p>Description: {review.text}</p>
                          <br></br>
                      </div>
                    )
                })}
             </div>)}
            {write === true && (
                <div>
                    <Review hall="Epicuria"/>
                </div>
            )}

        </React.Fragment>    
    )
}