import React from "react";
import Withdraw from "../Chart/Withdraw";

function WidthdrawRow() {
  return (
    <div className="row">
      <div className="col-lg-6">
        {/* Card 1 */}
        <div className="col-md-6 col-lg-4 col-xl-12 w-100">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary border-opacity-10 bg-primary-transparent rounded-pill">
                    <span className="avatar avatar-md avatar-rounded bg-primary svg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Total Amount</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h4 className="mb-0 d-flex align-items-center">1,1125</h4>
                <span className="text-success badge bg-success-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0">
                  <i className="ri-arrow-left-up-line fs-11"></i>+2.5%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6 col-lg-4 col-xl-12 w-100">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary1 border-opacity-10 bg-primary1-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-primary1 svg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">
                  Withdraw Amount
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h4 className="mb-0 d-flex align-items-center">5994</h4>
                <span className="text-danger badge bg-danger-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0">
                  <i className="ri-arrow-left-down-line fs-11"></i>-2.5%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-6 col-lg-4 col-xl-12 w-100">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary border-opacity-10 bg-primary-transparent rounded-pill">
                    <span className="avatar avatar-md avatar-rounded bg-primary svg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#000000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Total Amount</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h4 className="mb-0 d-flex align-items-center">1,1125</h4>
                <span className="text-success badge bg-success-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0">
                  <i className="ri-arrow-left-up-line fs-11"></i>+2.5%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xxl-6 col-lg-6">
        <div className="card custom-card" style={{ height: "503px" }}>
          <div className="card-header justify-content-between">
            <div className="card-title">Monthly Targets</div>
            <a href="#" className="btn btn-sm btn-light">
              View All
            </a>
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div
              id="monthly-target"
              style={{ minHeight: "244.7px" }}
              className="d-flex justify-content-center"
            >
              <div
                id="apexchartsavnovb6yi"
                className="apexcharts-canvas apexchartsavnovb6yi apexcharts-theme-light"
                style={{ width: "336px", height: "244.7px" }}
              >
                <Withdraw />
              </div>
            </div>
            <div className="d-flex gap-3 align-items-center justify-content-between text-center p-3 bg-dark">
              <div>
                <span className="mb-1 d-block">
                  <i className="ri-circle-fill fs-8 align-middle lh-1 text-primary"></i>{" "}
                  New Projects
                </span>
                <h6 className="mb-1 " style={{color:'white'}}>4,896</h6>
                <span className="text-success fw-medium">
                  <i className="ri-arrow-up-s-fill"></i> 3.5%
                </span>
              </div>
              <div>
                <span className="mb-1 d-block">
                  <i className="ri-circle-fill fs-8 align-middle lh-1 text-primary1"></i>{" "}
                  Completed
                </span>
                <h6 className="mb-1">2,475</h6>
                <span className="text-danger fw-medium">
                  <i className="ri-arrow-down-s-fill"></i> 1.5%
                </span>
              </div>
              <div>
                <span className="mb-1 d-block">
                  <i className="ri-circle-fill fs-8 align-middle lh-1 text-primary2"></i>{" "}
                  Pending
                </span>
                <h6 className="mb-1">456</h6>
                <span className="text-success fw-medium">
                  <i className="ri-arrow-up-s-fill"></i> 0.1%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidthdrawRow;
