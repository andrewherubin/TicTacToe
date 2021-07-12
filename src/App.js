import { Component } from "react";
import Board from "./components/Board";
import DialogueBox from "./components/DialogueBox";

class App extends Component{

  state = {
    squares: [
      {id: 0, className: "t l square", value: ""},
      {id: 1, className: "t square", value: ""},
      {id: 2, className: "t r square", value: ""},
      {id: 3, className: "l square", value: ""},
      {id: 4, className: "square", value: ""},
      {id: 5, className: "r square", value: ""},
      {id: 6, className: "b l square", value: ""},
      {id: 7, className: "b square", value: ""},
      {id: 8, className: "b r square", value: ""}
    ],
    playerValue: "X",
    computerValue: "O",
    winConditions: [
      [0,1,2],
      [0,4,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [2,4,6],
      [3,4,5],
      [6,7,8],
    ],
    displayResetButton: "off",
    displayText: "",
  };

  // handle click at square, index is square.id from event location
  handleClick = (index) => {
    if (this.state.squares[index].value === "" && this.state.displayResetButton !== "on"){
      this.setVal(index, this.state.playerValue);
      if (this.checkWin(this.state.playerValue, this.state.squares)){
          this.setState({
            displayText: "Player Wins",
            displayResetButton: "on"
          });
          this.displayWin(this.state.playerValue);
      }
      else if (this.boardFull(this.state.squares)){
        this.setState({
          displayText: "Tie",
          displayResetButton: "on"
        });
      }
      else{
        this.computerMove();
        if (this.checkWin(this.state.computerValue, this.state.squares)){
          this.setState({
            displayText: "Computer Wins",
            displayResetButton: "on"
          });
          this.displayWin(this.state.computerValue);
        }
        else if (this.boardFull(this.state.squares)){
          this.setState({
            displayText: "Tie",
            displayResetButton: "on"
          });
        }
      }
    }
  }

  // changes square at "index" to display "value"
  setVal(index, value){
    let squares = [...this.state.squares];
    let square = squares[index];
    square.value = value;
    this.setState({ squares });
  }

  boardFull(board){
    for(let i = 0; i < board.length; i++){
      if (board[i].value === ""){
        return false;
      }
    }
    return true;
  }

  resetGameState = () =>{
    let val1 = this.state.computerValue;
    let val2 = this.state.playerValue;
    let temp="";
    if (val2 === "X"){
      temp ="X";
    }
    this.setState({
      squares: [
        {id: 0, className: "t l square", value: temp},
        {id: 1, className: "t square", value: ""},
        {id: 2, className: "t r square", value: ""},
        {id: 3, className: "l square", value: ""},
        {id: 4, className: "square", value: ""},
        {id: 5, className: "r square", value: ""},
        {id: 6, className: "b l square", value: ""},
        {id: 7, className: "b square", value: ""},
        {id: 8, className: "b r square", value: ""}
      ],
      displayResetButton: "off",
      displayText: "",
      playerValue: val1,
      computerValue: val2,
    });
  }

  displayWin(value){
    let { winConditions } = this.state;
    const { squares } = this.state;
    let sequence = value+value+value;
    for(let i = 0; i < winConditions.length; i++){
      let combination = winConditions[i];
      let charCombo = squares[combination[0]].value+squares[combination[1]].value+squares[combination[2]].value;
      if (charCombo === sequence){
        squares[combination[0]].className += " w ";
        squares[combination[1]].className += " w ";
        squares[combination[2]].className += " w ";
      }
    }
  }

  checkWin(value, board){
    let { winConditions } = this.state;
    let sequence = value+value+value;
    for(let i = 0; i < winConditions.length; i++){
      let combination = winConditions[i];
      let charCombo = board[combination[0]].value+board[combination[1]].value+board[combination[2]].value;
      if (charCombo === sequence){
        return true;
      }
    }
    return false;
  }

  computerMove(){
    let { squares } = this.state;
    let target = this.maximize(squares);
    this.setVal(target.index, this.state.computerValue);
  }

  minimize(board){
    let moves=[];
    let { computerValue } = this.state;
    let { playerValue } = this.state;
    for (let i = 0; i < board.length; i++){
      if (board[i].value ===""){
        moves.push({index: i, eval: 0});
      }
    }
    for (let i = 0; i < moves.length; i++){ 
      let newBoard = [...board];
      let index = moves[i].index;
      newBoard[index] = {id: board[index].id, className: board[index].className, value: playerValue};
      if (this.checkWin(computerValue, newBoard)){
        moves[i].eval = 10;
      }
      else if (this.checkWin(playerValue, newBoard)){
        moves[i].eval = -10;
      }
      else if (this.boardFull(newBoard)){
        moves[i].eval = 0;
      }
      else{
        moves[i].eval = this.maximize(newBoard).eval;
      }
    }
    let minEval = 1000;
    let target = null;
    for (let i = 0; i < moves.length; i++){
      if (moves[i].eval < minEval){
        target = moves[i];
        minEval = target.eval;
      }
    }
    return target;
  }

  maximize(board){
    let moves=[];
    let { computerValue } = this.state;
    let { playerValue } = this.state;
    for (let i = 0; i < board.length; i++){
      if (board[i].value ===""){
        moves.push({index: i, eval: 0});
      }
    }
    for (let i = 0; i < moves.length; i++){ 
      let newBoard = [...board];
      let index = moves[i].index;
      newBoard[index] = {id: board[index].id, className: board[index].className, value: computerValue};
      if (this.checkWin(computerValue, newBoard)){
        moves[i].eval = 10;
      }
      else if (this.checkWin(playerValue, newBoard)){
        moves[i].eval = -10;
      }
      else if (this.boardFull(newBoard)){
        moves[i].eval = 0;
      }
      else{
        moves[i].eval = this.minimize(newBoard).eval;
      }
    }
    let maxEval = -1000;
    let target = null;
    for (let i = 0; i < moves.length; i++){
      if (moves[i].eval > maxEval){
        target = moves[i];
        maxEval = target.eval;
      }
    }
    return target;
  }

  render(){
    return(
      <div>
        <h1 className="header">Tic-Tac-Toe</h1>
        <DialogueBox displayState={this.state.displayResetButton} displayText={this.state.displayText} onClick={ this.resetGameState }/>
        <Board squares={this.state.squares} onClick={this.handleClick}/>
      </div>
    );
  }
}

export default App;