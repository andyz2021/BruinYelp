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
        this.signedIn=true;
    }
    render(){
        if (this.signedIn === true && this.state.posted === false){
            return (
                <div>
                    <button class = "square">
                        <button>Add image</button>
                        <br/><br/><br/>
                        <button>Add description</button>
                        <br/><br/><br/>
                        <button>Add star rating</button>
                    </button>
                </div>
                
            )
        }

    }


    
}

