import React from "react";
import Square from "./Square";

type Props = {
  squares: Array<string>;
  finished: boolean;
  onClick: (i: number) => void;
};

const squares = Array.from(Array(9).keys());
const Board: React.FC<Props> = props => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  const renderRow = (i: number) => {
    return (
      <div className="board-row">
        {squares.map((row, j) => renderSquare(i*j))}
      </div>
    )
  }
  
  return (
    <div>
      {squares.map((row, i) => renderRow(i))}
    </div>
  );
};

export default Board;
