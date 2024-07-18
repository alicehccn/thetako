import React from "react";

type Props = {
  value: string;
  onClick: () => void;
};
const Square: React.FC<Props> = props => {
  console.log(props.value)
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
