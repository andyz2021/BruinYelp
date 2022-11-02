import * as React from "react";
//import Button from 'react-native'

export default class Review extends React.Component {
    constructor(){
        super();
        this.state = {
            text : "",
            image : null,
            stars: 0,
            posted: false,
        }
    }
    render(){
        if (this.state.posted === false){
            return (
                <div>
                    <button class = "sqaure">
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

