import React from "react";
import SpinnerImage from "./spinner.gif";
export default function Spinner() {
  return (
    <div>
      <img
        src={SpinnerImage}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}
