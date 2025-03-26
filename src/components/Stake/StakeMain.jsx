import React from "react";
import StakeHead from "./StakeHead";
import StakeRow from "./StakeRow";

function StakeMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"linear-gradient(to left, #004e92, #000428)"}}>
      <div className="container-fluid">
        <StakeHead />
        <StakeRow />
      </div>
    </div>
  );
}

export default StakeMain;
