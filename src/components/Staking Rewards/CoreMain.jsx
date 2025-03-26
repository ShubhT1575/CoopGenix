import React from "react";
import CoreBody from "./CoreBody";
import CoreHead from "./CoreHead";

function CoreMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"linear-gradient(to left, #004e92, #000428)"}}>
      <div className="container-fluid">
        <CoreHead />
        <CoreBody />
      </div>
    </div>
  );
}

export default CoreMain;
