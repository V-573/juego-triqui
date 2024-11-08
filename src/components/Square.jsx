// Square.js
import React from "react";

const Square = ({ value, onClick }) => (
    <button 
        onClick={onClick} 
        style={{ width: "100px", height: "100px", fontSize: "24px" }}
        disabled={value !== null}
    >
        {value}
    </button>
);

export default Square;
