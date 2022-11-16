import { touchRippleClasses } from "@mui/material";
import TextField from '@mui/material/TextField';
import "../Review.css"

import StarRating from "./StarRating.js";
import "./StarRating.css";

import * as React from "react";
//import Button from 'react-native'
import {firestore} from "../firebase.js";
import {addDoc, collection, getDocs} from "@firebase/firestore";

//Pass in dining hall as a prop
export default function Review(prop) {
    const[reviewData, setreviewData] = React.useState({
        text : "",
        image : null,
        stars: 0,
        signedIn: false,
        posted: false,
        diningHall: null,
        date: null,
    });
    const database = collection(firestore, "Reviews");

    React.useEffect( () => {
        // const getReviews = async () => {
        // //Should be reading from DB
        // }
        setreviewData((prev) => ({
            ...prev,
            diningHall: prop.hall,
        }));
    }, [prop.hall])

    const handleClick = () => {
            setreviewData((prev) => ({
                ...prev,
                signedIn: true,
            }));
    }

    const handleChange = (propertyName) =>(event) => {

        const { value } = event.target;

        setreviewData((prev) => ({
            ...prev,
            [propertyName]: value,

        }));
        //console.log(reviewData.diningHall)
    };

    const handleStar  = (num) => {
        console.log(num);
        setreviewData((prev) => ({
            ...prev,
            stars: num,

        }));
        console.log(reviewData);
    }

    //Function that will write to the database. You should call this on the "Submit" Button onClick function
    // const writeDb = () => {
    //     console.log(reviewData)
    // }
    const writeDb = () => {
        //console.log(reviewData);
        setreviewData((prev) => ({
            ...prev,
            date: new Date(),
        }));
        console.log(reviewData);
        if(reviewData.text!=="" && reviewData.image!==null && reviewData.stars!==0)
        {
            addDoc(database, {image: reviewData.image, stars: reviewData.stars, text: reviewData.text, diningHall: reviewData.diningHall, date: reviewData.date});//Add User, Dining hall, Date
            window.location.reload(false);
       }
       
    }

    //Somewhere in Return statement, add a Submit button that will allow you to submit review to DB
    //Also add image and star thing
    return(
        <React.Fragment>
        { reviewData.signedIn && !reviewData.posted && (<div>
                    {/* <button>
                        <button onClick={()=>handleClick(1)}>Add Image</button>
                        <br/><br/><br/>
                        <TextField value={reviewData.text}  onChange={handleChange('text')}
                                   label={<span>Description</span>} InputLabelProps={{shrink: true,}} />
                        <br/><br/><br/>
                        <button>Add star rating</button>
                    </button>
                    <br/>
                    <button onClick={()=>writeDb()}>Submit</button> */}
                
                    <div className="labels">
                    <form>
                        Description <input type="text" id="description_input" onChange={handleChange('text')} placeholder="We'd love to know your thoughts!"/>
                        <br/>
                        Image <input type="file" id="image_input" accept="image/png, image/jpg" onChange={handleChange('image')}/>
                        <br/>
                        {/* Star Rating <select id="selectStar" onChange={handleChange('stars')}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select> */}
                        Star Rating <StarRating handleStar={handleStar}/>
                        <br/>
                    </form>
                    <button className="button0" onClick={()=>writeDb()}>Submit</button>
                    </div>
                </div>)}


    {reviewData.signedIn === false && reviewData.posted === false &&
        <button className="button1" onClick={()=>handleClick()}>Write a Review!</button>}
        </React.Fragment>
    )

}

