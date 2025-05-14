import React from "react";

function CoreHead() {
  return (
    <div
      className="d-flex align-items-center justify-content-between page-header-breadcrumb flex-wrap gap-2 page-head-breadcrumb marginTop"
      style={{ marginTop: "68px", paddingTop: "10px" }}
    >
      <div>
        {/* <nav>
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <a href="#"> Page </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Core Income
            </li>
          </ol>
        </nav> */}
        <h1 className="page-title fw-medium fs-18 mb-0 text-light">
        {/* Charity Call */}
        </h1>
      </div>
    </div>
  );
}

export default CoreHead;
