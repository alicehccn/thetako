import React from "react";

type Props = {
  value: string;
  onClick: () => void;
};
const Square: React.FC<Props> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      &#65291;
    </button>
  );
};

export default Square;
