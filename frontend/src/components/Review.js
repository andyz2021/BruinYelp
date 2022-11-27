import { touchRippleClasses } from "@mui/material";
import TextField from '@mui/material/TextField';
import "../Review.css"

import StarRating from "./StarRating.js";
import "./StarRating.css";


import * as React from "react";
//import Button from 'react-native'
import {firestore} from "../firebase.js";
import {addDoc, collection, setDoc, doc} from "@firebase/firestore";
import {uploadImage} from '../firebase.js';
import makeid from './generate_name.js';
import {useAuth} from "../context/Authentication";

//Pass in dining hall as a prop
export default function Review(prop) {
    const[reviewData, setreviewData] = React.useState({
        text : "",
        image : null,
        stars: 0,
        signedIn: false,
        diningHall: null,
        item : "",
        date: new Date(),
        upvotes: 0,
    });
    let currentUser = useAuth();
    const database = collection(firestore, prop.hall+"/"+prop.day+"/"+prop.meal_period);
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
    };

    const handleChange = (propertyName) =>(event) => {

        const { value } = event.target;

        setreviewData((prev) => ({
            ...prev,
            [propertyName]: value,

        }));
        //console.log(reviewData.diningHall)
    };

    const handleChangeFile = (event) => {

        //const { value } = event.target.files[0];
        console.log(event.target.files[0])

        setreviewData((prev) => ({
            ...prev,
            image: event.target.files[0],
        }));
        //console.log(reviewData.diningHall)
    };

    const handleStar  = (num) => {
        //console.log(num);
        setreviewData((prev) => ({
            ...prev,
            stars: num,

        }));
       // console.log(reviewData);
    }

    //Function that will write to the database. You should call this on the "Submit" Button onClick function

     const writeDb = async() => {
        //console.log(reviewData);
        // setreviewData((prev) => ({
        //     ...prev,
        //     date: new Date(),
        // })); //right now I think this sometimes runs after addDoc

        //console.log(reviewData);
        console.log(currentUser.currentUser.displayName)
        if(reviewData.text!=="" && reviewData.image!==null && reviewData.stars!==0 && reviewData.item !=="")
        {
            const name = makeid(10);
            uploadImage(reviewData.diningHall, name, reviewData.image);
            const result = await setDoc(doc(database, name), {image: name, stars: reviewData.stars, text: reviewData.text, diningHall: reviewData.diningHall, date : Date(), item: reviewData.item, user: currentUser.currentUser.displayName, upvotes: reviewData.upvotes});//Add User, Dining hall, Date
            refresh(result);
            // refresh(); //refreshes too early
       }
       
    }

    const refresh = (result) => {
        if(result){
            window.location.reload(false);
        }
    }

    //Somewhere in Return statement, add a Submit button that will allow you to submit review to DB
    //Also add image and star thing
    return(
        <React.Fragment>
        <div>
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
                    <div className="cap">
                        <h2>Share your thoughts with fellow Bruins!</h2>
                    </div>
                    <div className="labels">
                    <form>
                        Menu Item <input type="text" id="item_input" onChange={handleChange('item')} placeholder="Which menu item are you reviewing?"/>
                        <br/>
                        Description <input type="text" id="description_input" onChange={handleChange('text')} placeholder="We'd love to know your thoughts!"/>
                        <br/>
                        Image <input type="file" id="image_input" accept="image/png, image/jpg" onChange={handleChangeFile}/>
                        <br/>
                        {/* Star Rating <select id="selectStar" onChange={handleChange('stars')}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select> */}
                        Star Rating <StarRating stars={reviewData.stars} handleStar={handleStar}/>
                        <br/>
                    </form>
                    <button className="button0" onClick={writeDb}>Submit</button>
                    </div>
                </div>

    </React.Fragment>
    )

}

