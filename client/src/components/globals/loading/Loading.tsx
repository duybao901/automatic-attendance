import React from 'react';
import "./Loading.scss"

interface LoadingProps {
  type?: "small" | "medium";
}
const Loading: React.FC<LoadingProps> = ({ type }) => {

  let style = {};

  switch (type) {
    case "small": {
      style = {
        width: "30px",
        height: "30px"
      }
      break;
    }
    default: {
      style = {
        width: "40px",
        height: "40px"
      }
    }
  }

  return <div className="sk-circle" style={style}>
    <div className="sk-circle1 sk-child"></div>
    <div className="sk-circle2 sk-child"></div>
    <div className="sk-circle3 sk-child"></div>
    <div className="sk-circle4 sk-child"></div>
    <div className="sk-circle5 sk-child"></div>
    <div className="sk-circle6 sk-child"></div>
    <div className="sk-circle7 sk-child"></div>
    <div className="sk-circle8 sk-child"></div>
    <div className="sk-circle9 sk-child"></div>
    <div className="sk-circle10 sk-child"></div>
    <div className="sk-circle11 sk-child"></div>
    <div className="sk-circle12 sk-child"></div>
  </div>
};

export default Loading;
