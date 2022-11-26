import * as React from "react";
import Review from './Review.js';
import {firestore} from "../firebase.js";
import {where, query, addDoc, collection, getDocs, orderBy} from "@firebase/firestore";
import StarRating from './StarRating.js'
import {displayImage} from "../firebase.js"
import {getDownloadURL} from "firebase/storage";
import TextField from "@mui/material/TextField";


export default function Epicuria() {

    const [Reviews, setReviews] = React.useState([]);
    const [sortBy, setsortBy] = React.useState('0');
    const [sortOptions, setsortOptions] = React.useState(false); //determines if you can see the sort options (triggered when you hit "sort by")
    const [write, setwrite] = React.useState(false); //set to true when user clicks "write a review"
    const [Urls, setUrls] = React.useState({
    });
    const [searchBy, setsearchBy] = React.useState('0');
    const [searchOptions, setsearchOptions] = React.useState(false);
    const [searchBar, setsearchBar] = React.useState("");

    const [increment, setIncrement] = React.useState(0);
    const current_date = new Date();
    const current_day = 30*current_date.getMonth() + current_date.getDate();
    const current_hour = current_date.getHours();
    let meal_period;
    if(current_hour<10)
    {
        meal_period = "Breakfast";
    }
    else if(current_hour<3)
    {
        meal_period = "Lunch";
    }
    else{
        meal_period = "Dinner";
    }
    
    
    React.useEffect(() => {
        let database;
        if(searchBar === "")
        {
            if(sortBy === '0')
            {
                //Add date+meal period
                database = query(collection(firestore, "Epicuria"), orderBy("date","asc")); //can't do orderBy with where if different fields
            }
            else
            {
                database = query(collection(firestore, "Epicuria"), orderBy("stars","desc")); //can't do orderBy with where if different fields
            }
        }
        else
        {
            if(searchBy === '0')
            {
                database = query(collection(firestore, "Epicuria"), where("item", "in", [searchBar, searchBar.toLowerCase(), searchBar.toUpperCase()])); //can't do orderBy with where if different fields
            }
            else if (searchBy === '1')
            {
                database = query(collection(firestore, "Epicuria"), where("user", "in", [searchBar, searchBar.toLowerCase(), searchBar.toUpperCase()])); //can't do orderBy with where if different fields
            }

        }

        const getReviews = async () => {
            const allReviews = await getDocs(database);
            console.log(allReviews.docs);
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
        getReviews(database);
    }, [sortBy, increment]);
    
    const handleSort = (type) =>(event) => {

        const { value } = event.target;
        if(type === "sort")
        {

            setsortBy(value);
            console.log(sortBy);
        }
        else if(type === "search")
        {
            setsearchBy(value);
            console.log(sortBy);
        }

    };

    const handleClick = (type) => {
        if(type === "sort")
        {
            setsortOptions(true);
        }
        else if(type === "search")
        {
            setsearchOptions(true);
        }

    }

    const handleClickWrite = () => {
        setwrite(true);
    }

    const handleChangeText = (event) => {
        const { value } = event.target;

        setsearchBar(value);
    }

    const updateChange = (event) => {
        if(event.key === 'Enter') {
            setIncrement(increment+1);
        }

    }
    return(
        <React.Fragment>
            {write === false && ( //if you have not clicked "write a review"
                <div>
                <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Epicuria</h2>
            
                <button className="button1" onClick={()=>handleClickWrite()}>Write a Review!</button>
                <br></br>
                { sortOptions === false && ( //if you have not clicked "sort by"
                    <button className="button1" onClick = {()=>handleClick("sort")}>Sort By...</button>)}
                { sortOptions === true && ( //if you have clicked "sort by"
                    <form>
                        <select className = "button1" id="selectSort" onChange={handleSort("sort")}>
                            <option value='0'>Most Recent</option>
                            <option value='1'>Highest Rating</option>
                        </select>
                    </form>
                )}
                <br></br>
                { searchOptions === false && ( //if you have not clicked "sort by"
                    <button className="button1" onClick = {()=>handleClick("search")}>Search For...</button>)}
                { searchOptions === true && ( //if you have clicked "sort by"
                    <form>
                        <select className = "button1" id="selectSearch" onChange={handleSort("search")}>
                            <option value='0'>Search for User</option>
                            <option value='1'>Search for Menu Item</option>
                        </select>
                    </form>)}
                    { searchOptions === true && (
                        <TextField value={searchBar} onChange={handleChangeText} onKeyUp = {updateChange} style={{marginTop: '.8rem'}} label={<span>Search</span>}
                        type="text"  />
                    )}




                {Reviews.map((review) => {
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
                    <Review hall="Epicuria" day={current_day} meal_period={meal_period}/>
                </div>
            )}

        </React.Fragment>    
    )
}