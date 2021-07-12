import { Component } from "react";


class DialogueBox extends Component{

    render(){
        if (this.props.displayState === "on"){
            return(
                <div className="dialogueBox">
                    <p className="displayText">{this.props.displayText}</p>
                    <button className="resetButton" onClick={this.props.onClick}>Play Again</button>
                </div>
            ) 
        }
        else{
            return(
                <div className="dialogueBox">
                    <p className="displayText">{this.props.displayText}</p>
                </div>
            )
        }
    }
}

export default DialogueBox;