import { touchRippleClasses } from "@mui/material";
import * as React from "react";
//import Button from 'react-native'

export default class Review extends React.Component {
    constructor(){
        super();
        this.state = {
            text : "",
            image : null,
            stars: 0,
            signedIn: false,
            posted: false,
        }
    }
    handleClick(){
        if(this.state.signedIn===false){
            this.setState({
                signedIn : true //need to implement login
            })
            return;
        }
    }
    render(){
        if (this.state.signedIn === true && this.state.posted === false){
            return (
                <div>
                    <button class = "square">
                        <button class = "square">Add image</button>
                        <br/><br/><br/>
                        <button>Add description</button>
                        <br/><br/><br/>
                        <button>Add star rating</button>
                    </button>
                </div>
                
            )
        }

        if(this.state.signedIn === false && this.state.posted === false){
            return (
                <button className="button1" onClick={()=>this.handleClick()}>Write a Review!</button>
            )
        }

    }


    
}

