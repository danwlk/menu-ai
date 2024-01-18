import React from "react";
import "./FloatingTextbox.css";

const FloatingTextbox = (props) => {
  return (
    props.isVisible && <div className="floating-textbox">{props.children}</div>
  );
};

export default FloatingTextbox;
