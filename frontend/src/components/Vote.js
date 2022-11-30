import React, { Component } from 'react';
import "./Vote.css"
class Vote extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count: props.upvotes,
            addend: 0,
        }
    }
    
    toggleIncrement = () => {
        this.setState(prevState => ({
            addend: prevState.addend === 1 ? 0 : 1
        }))
    }

    render(){
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.toggleIncrement}>
                        <span className="upArrow">&#8679;</span>
                    </button>
                    <span>{this.state.count + this.state.addend}</span>
                </div>
            </React.Fragment>
        )
    }
}

export default Vote