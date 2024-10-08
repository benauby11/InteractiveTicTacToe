import React from "react";
import "./App.css"; // Ensure you import your CSS for styling

function Square({ value, onClick }) {
  const isAvailable = value === " "; // Assuming empty squares are represented by a space or null

  return (
    <button
      className={`square ${isAvailable ? "available" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
