import { touchRippleClasses } from "@mui/material";
import TextField from '@mui/material/TextField';

import * as React from "react";
//import Button from 'react-native'
import {firestore} from "../firebase.js";
import {addDoc, collection, getDocs} from "@firebase/firestore";
// export default class Review extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             text : "",
//             image : null,
//             stars: 0,
//             signedIn: false,
//             posted: false,
//         }
//     }
//     handleClick(){
//         if(this.state.signedIn===false){
//             this.setState({
//                 signedIn : true //need to implement login
//             })
//             return;
//         }
//     }
//
//     render(){
//         if (this.state.signedIn === true && this.state.posted === false){
//             return (
//                 <div>
//                     <button class = "square">
//                         <button class = "square">Add image</button>
//                         <br/><br/><br/>
//                         <input type="text" ref={React.useRef()} />
//                         <button>Add description</button>
//                         <br/><br/><br/>
//                         <button>Add star rating</button>
//                     </button>
//                 </div>
//
//             )
//         }
//
//         if(this.state.signedIn === false && this.state.posted === false){
//             return (
//                 <button className="button1" onClick={()=>this.handleClick()}>Write a Review!</button>
//             )
//         }
//
//     }
//
//
//
// }

//Pass in dining hall as a prop
export default function Review() {
    const[reviewData, setreviewData] = React.useState({
        text : "",
        image : null,
        stars: 0,
        signedIn: false,
        posted: false,
    });
    const database = collection(firestore, "Reviews");

    React.useEffect( () => {
        const getReviews = async () => {
        //Should be reading from DB
        }
    }, [])

    const handleClick = () => {
        setreviewData(() => ({
            signedIn: true,
        }))};

    const handleChangeText = (propertyName) =>(event) => {
        const { value } = event.target;

        setreviewData((prev) => ({
            ...prev,
            [propertyName]: value,

        }));

    };

    //Function that will write to the database. You should call this on the "Submit" Button onClick function
    const writeDb = () => async (event) => {
        if(event.key === "Enter")
        {
            await addDoc(database, {image: reviewData.image, stars: reviewData.stars, text: reviewData.text});//Add User, Dining hall, Date
        }
    }

    //Somewhere in Return statement, add a Submit button that will allow you to submit review to DB
    //Also add image and star thing
    return(
        <React.Fragment>
        { reviewData.signedIn && !reviewData.posted && (<div>
                    <button class = "square">
                        <button class = "square">Add image</button>
                        <br/><br/><br/>
                        <button>Add description</button>
                        <TextField value={reviewData.text}  onChange={handleChangeText('text')} onKeyUp = {writeDb()}
                                   label={<span>Description</span>} InputLabelProps={{shrink: true,}} />
                        <br/><br/><br/>
                        <button>Add star rating</button>
                    </button>
                </div>)}


    {reviewData.signedIn === false && reviewData.posted === false &&
        <button className="button1" onClick={()=>handleClick()}>Write a Review!</button>}
        </React.Fragment>
    )

}

