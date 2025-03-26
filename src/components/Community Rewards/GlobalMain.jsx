import React from "react";
import GlobalHead from "./GlobalHead";
import GlobalRow from "./GlobalRow"

function CoreMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"linear-gradient(to left, #004e92, #000428)"}}>
      <div className="container-fluid">
        <GlobalHead/>
        <GlobalRow/>
      </div>
    </div>
  );
}

export default CoreMain;
