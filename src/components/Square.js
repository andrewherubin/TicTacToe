
const Square = ({ square, onClick }) => {
    return(
        <div className={square.className} onClick={() => onClick(square.id)}>
            {square.value}
        </div>
    );
}

export default Square;