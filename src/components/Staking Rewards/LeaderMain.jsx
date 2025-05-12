import React from "react";
import CoreBody from "./Leaderbody";
import CoreHead from "./CoreHead";

function LeaderMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"black", marginLeft: "0"}}>
      <div className="container-fluid">
        <CoreHead />
        <CoreBody />
      </div>
    </div>
  );
}

export default LeaderMain;
