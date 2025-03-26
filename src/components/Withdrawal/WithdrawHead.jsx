import React from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../Config";
import toast from "react-hot-toast";

function WithdrawHead() {
  const { wallet } = useSelector((state) => state.coreCrowd);
  const { walletAddress, isConnected } = wallet;
  const address = walletAddress;
  const copyAddress = () => {
    const Caddress = document.getElementById("input-text").value;
    navigator.clipboard
      .writeText(Caddress)
      .then(() => {
        toast.success("Sponsor ID copied to clipboard!");
      })  
      .catch((err) => {
        toast.error("Something Went Wrong!");
      });
  };
   
  return (
    <div className="d-flex align-items-center justify-content-between page-header-breadcrumb flex-wrap gap-2">
      <div>
        <nav>
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <a href="#"> Page </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Withdrawal
            </li>
          </ol>
        </nav>
        <h1 className="page-title fw-medium fs-18 mb-0 text-light">Withdrawal</h1>
      </div>
      {address && (
        <div className="d-flex">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text btn btn-secondary-gradient btn-wave"
                id="basic-addon3"
                style={{ borderRadius: "0" }}
              >
                Sponsor ID
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              id="input-text"
              aria-describedby="basic-addon3"
              value={`${baseUrl}?ref=${address}`}
              readOnly
              style={{
                borderRadius: "0",
                height: "36px",
                fontSize: "15px",
                width: "fit-content",
                overflow: "auto",
              }}
            />
          </div>

          <button
            className="btn btn-icon btn-secondary-gradient btn-wave mx-2"
            onClick={copyAddress}
          >
            <i className="ri-file-copy-fill"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default WithdrawHead