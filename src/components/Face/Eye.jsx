import React from "react";

const Eye = ({
                 width = "100px",
                 height = "100px",
                 margin = "15px",
                 translateX = "0",
                 translateY = "-20px",
                 transition = "all 1s",
             }) => {

    return (
        <div
            style={{
                width,
                height,
                margin,
                transform: `translateX(${translateX}) translateY(${translateY})`,
                transition
            }}
            className="eye">
        </div>
    );
};

export default Eye;