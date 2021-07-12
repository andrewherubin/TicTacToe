import Square from "./Square";

const Board = ({ squares, onClick }) => {

    return(
        <div className="grid">
            {squares.map(square => <Square key={square.id} square={square} onClick={onClick} />)}
        </div>
    );
}

export default Board;