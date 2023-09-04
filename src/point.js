import React from "react";

export default function Point(props) {
  const style = {
    left: `${props.value?.part?.[0]}%`,
    top: `${props.value?.part?.[1]}%`,
  };
  return <div className="point" style={style} />;
}
