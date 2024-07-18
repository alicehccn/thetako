import React from "react";
import Square from "./Square";

type Props = {
  squares: Array<string>;
  finished: boolean;
  onClick: (i: number) => void;
};

const squares = Array.from(Array(19*19).keys());
const Board: React.FC<Props> = props => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  return (
    <div className="board">
      {squares.map((row, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
