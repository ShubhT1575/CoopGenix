import React from "react";
import FortuneHead from "./FortuneHead";
import FortuneRow from "./FortuneRow";

function FortuneMain() {
  return (
    <div className="main-content app-content" id="m-content" style={{background:"black", margin: "0"}}>
      <div className="container-fluid">
        <FortuneHead />
        <FortuneRow />
      </div>
    </div>
  );
}

export default FortuneMain;
