import * as React from "react";
import Review from './Review.js';
import {firestore, uploadImage} from "../firebase.js";
import {where, query, updateDoc, collection, getDocs, orderBy, setDoc, doc, startAt, endAt} from "@firebase/firestore";
import StarRating from './StarRating.js'
import {displayImage} from "../firebase.js"
import "../Review.css"


export default function Bruin_Plate() {

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
    const database_upvote = collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period);
    //const database = collection(firestore, "Epicuria");


    React.useEffect(() => {
        let database;
        if(searchBar === "")
        {
          if(sortBy === '0')
              {
                  //Add date+meal period
                  database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("date","asc")); //can't do orderBy with where if different fields
              }
          else if(sortBy === '1')
              {
                  database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("stars","desc")); //can't do orderBy with where if different fields
              }
          else{
                  database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("upvotes","desc"));
              }
        }
        else
        {
            if(searchBy === '0')
            {
                database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("item"), startAt(searchBar), endAt(searchBar + '\uf8ff')); //can't do orderBy with where if different fields
            }
            else if (searchBy === '1')
            {
                database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("user"), startAt(searchBar), endAt(searchBar + '\uf8ff')); //can't do orderBy with where if different fields
            }
            else if (searchBy === '2')
            {
                database = query(collection(firestore, "Bruin_Plate/"+current_day+"/"+meal_period), orderBy("text"), startAt(searchBar), endAt(searchBar + '\uf8ff')); //can't do orderBy with where if different fields
            }

        }

        const getReviews = async () => {
            const allReviews = await getDocs(database);
            //console.log(allReviews.docs);
            //console.log(allReviews.docs);
            allReviews.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
            });
            setReviews(allReviews.docs.map((doc => ({...doc.data()}))));
            for (const item of allReviews.docs) {
                //console.log(item.data().image)
                const img = await displayImage("Bruin_Plate", item.data().image);
                //console.log(img)
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
            console.log(searchBy);
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

    const updateUpvotes = async(key, num) => {

        const result = await updateDoc(doc(database_upvote, key), {upvotes: num+1});//Add User, Dining hall, Date
        setIncrement(increment+1);
    }

    return(
        <React.Fragment>
            {write === false && ( //if you have not clicked "write a review"
                <div>
                    <h2 style = {{color: 'black', display: "flex", justifyContent: "center"}}>Bruin Plate</h2>

                    <button className="button1" onClick={()=>handleClickWrite()}>Write a Review!</button>
                    
                    <br></br>
                    
                    { sortOptions === false && ( //if you have not clicked "sort by"
                        <button className="button1" onClick = {()=>handleClick("sort")}>Sort By...</button>)}
                    { sortOptions === true && ( //if you have clicked "sort by"
                        <form>
                            <select className = "button1" id="selectSort" onChange={handleSort("sort")}>
                                <option value='0'>Most Recent</option>
                                <option value='1'>Highest Rating</option>
                                <option value='2'>Upvotes</option>
                            </select>
                        </form>
                    )}
                    <br></br>
                    
                    { searchOptions === false && ( //if you have not clicked "sort by"
                        <button className="button1" onClick = {()=>handleClick("search")}>Search For...</button>)}
                    { searchOptions === true && ( //if you have clicked "sort by"
                        <form>
                            <select className = "button1" id="selectSearch" onChange={handleSort("search")}>
                                <option value='0'>Search for Menu Item</option>
                                <option value='1'>Search for User</option>
                                <option value='2'>Search for Description</option>
                            </select>
                        </form>)}
                    <br></br>
                    { searchOptions === true && (
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <input  style= {{    textAlign: "left",
                                display: "block",
                                margin: 0,
                                borderRadius: "10px",
                                height: "80px",
                                width: "85%",
                                padding: "0px 20px",
                                border: "none",
                                resize: "none",
                                backgroundColor: "rgb(255, 255, 255)"}} value={searchBar}  onChange={handleChangeText} onKeyUp = {updateChange}  type="text" placeholder={"Search"} />
                        </div>
                    )}




                    {Reviews.map((review) => {
                        //Add button for upvotes, increment upvote count
                        return (
                            <div>
                                <br></br>
                                <button onClick = {()=>updateUpvotes(review.image, review.upvotes)}> Upvote</button>
                                <p> Item: {review.item} </p>
                                <p>Upvotes: {review.upvotes}</p>
                                <p>Star Rating: <StarRating stars={review.stars}/> </p>
                                {Urls[review.image] && <img style={{height: "auto", width: "auto", maxWidth: "250px", maxHeight: "200px"}} src={Urls[review.image]}/>}
                                <p>Description: {review.text}</p>
                                <br></br>
                            </div>
                        )
                    })}
                </div>)}
            {write === true && (
                <div>
                    <Review hall="Bruin_Plate" day={current_day} meal_period={meal_period}/>
                </div>
            )}

        </React.Fragment>
    )
}
