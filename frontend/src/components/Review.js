import "../Review.css"

import StarRating from "./StarRating.js";
import "./StarRating.css";
import Error_PopUp from "./Error_PopUp.js";

import * as React from "react";
//import Button from 'react-native'
import { firestore } from "../firebase.js";
import { addDoc, collection, setDoc, doc } from "@firebase/firestore";
import { uploadImage } from '../firebase.js';
import makeid from './generate_name.js';
import { useAuth } from "../context/Authentication";

//Pass in dining hall as a prop
export default function Review(prop) {
    const [reviewData, setreviewData] = React.useState({
        text: "",
        image: null,
        stars: 0,
        signedIn: false,
        diningHall: null,
        item: "",
        date: new Date(),
        upvotes: 0,
    });
    //for error popup
    const [Error, setError] = React.useState(false);

    const togglePopup = () => {
        setError(!Error);
    }

    let currentUser = useAuth();
    const database = collection(firestore, prop.hall + "/" + prop.day + "/" + prop.meal_period);
    const database_all = collection(firestore, "Reviews");
    React.useEffect(() => {
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

    const handleChange = (propertyName) => (event) => {

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

    const handleStar = (num) => {
        //console.log(num);
        setreviewData((prev) => ({
            ...prev,
            stars: num,

        }));
        // console.log(reviewData);
    }

    //Function that will write to the database. You should call this on the "Submit" Button onClick function

    const writeDb = async () => {
        //console.log(reviewData);
        // setreviewData((prev) => ({
        //     ...prev,
        //     date: new Date(),
        // })); //right now I think this sometimes runs after addDoc

        //console.log(reviewData);
        console.log(currentUser.currentUser.displayName)

        if (reviewData.text !== "" && reviewData.image !== null && reviewData.stars !== 0 && reviewData.item !== "") {
            const name = makeid(10);
            const image = await uploadImage(reviewData.diningHall, name, reviewData.image);
            const image2 = await uploadImage("Reviews", name, reviewData.image);
            const result = await setDoc(doc(database, name), {image: name, stars: reviewData.stars, text: reviewData.text, diningHall: reviewData.diningHall, date : Date(), item: reviewData.item, user: currentUser.currentUser.displayName, upvotes: reviewData.upvotes});//Add User, Dining hall, Date
            const result_2 = await setDoc(doc(database_all, name), {image: name, stars: reviewData.stars, text: reviewData.text, diningHall: reviewData.diningHall, date : Date(), item: reviewData.item, user: currentUser.currentUser.displayName, upvotes: reviewData.upvotes});//Add User, Dining hall, Date

            console.log(image)
            console.log(result)
            refresh(image, image2);
            // refresh(); //refreshes too early
        }
        if (reviewData.text === "" || reviewData.image === null || reviewData.stars === 0 || reviewData.item === "") {
            togglePopup();
        }

    }

    const refresh = (result, result2) => {
        if (result && result2) {
            window.location.reload(false);
        }
    }


    //Somewhere in Return statement, add a Submit button that will allow you to submit review to DB
    //Also add image and star thing
    return (
        <React.Fragment>
            <div>
                <h2 className="reviewbar" style={{ display: "flex", justifyContent: "center" }}>Share your thoughts with fellow Bruins!</h2>
                <div className="labels">
                    <form>
                        Menu Item <input type="text" id="item_input" onChange={handleChange('item')} placeholder="Which menu item are you reviewing?" />
                        <br />
                        Description <input type="text" id="description_input" onChange={handleChange('text')} placeholder="How did your food taste?" />
                        <br />
                        Image <input type="file" id="image_input" accept="image/png, image/jpg" onChange={handleChangeFile} />
                        <br />
                        Star Rating <StarRating stars={reviewData.stars} change={"true"} handleStar={handleStar} />
                        <br />
                    </form>
                    <button className="button0" onClick={writeDb}>Submit</button>
                </div>

                {Error && <Error_PopUp
                    content={<>
                        <p>Please fill out all fields before submitting.</p>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>

        </React.Fragment>
    )

}
