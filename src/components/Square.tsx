import React from "react";

type Props = {
  value: string;
  onClick: () => void;
};
const Square: React.FC<Props> = props => {
  const symbol = String.fromCharCode(parseInt('0xFF0B',16))
  return (
    <button className="square" onClick={props.onClick}>
      {props.value || symbol}
    </button>
  );
};

export default Square;
