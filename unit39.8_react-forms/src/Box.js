import React from "react";
import "./Box.css"

const Box = ({id, width, height, bgColor, removeBox}) => {
    if (!width) width = 150;
    if (!height) height = 150;
    if (!bgColor) bgColor = "cyan";

    return (
      <div className="Box">
        <div
          id={id}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: bgColor,
          }}
        >
          {id}
        </div>
        <button onClick={() => removeBox(id)}>Remove</button>
      </div>
    );
}

export default Box;