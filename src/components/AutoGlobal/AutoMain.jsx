import React from "react";
import AutoHead from "./AutoHead";
import AutoRow from "./AutoRow";

function FortuneMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"linear-gradient(to left, #004e92, #000428)"}}>
      <div className="container-fluid">
        <AutoHead />
        <AutoRow />
      </div>
    </div>
  );
}

export default FortuneMain;
