import React, { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import "../style/SignUp.css";
import { useAccount, useChainId, useConnect } from "wagmi";
import { Link } from "react-router-dom";
import LOGO from "../assets/img/logo.png";
import Logo from "/coopgenix.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAddressbyRefrralId } from "../API/Api.js";
import {
  BuyMatrix,
  checkAllowance,
  GetOwner,
  getTotalPol,
  // getOwner,
  getUSDT,
  JoinPlan,
  MatrixAmount,
  registration,
  tokenApprove,
  UserExist,
} from "./web3";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getBalance } from "@wagmi/core";
import { config } from "../main.jsx";
// import { TokenAddress } from "./Config.js";
import { setWalletDetails } from "../Redux/Slice.js";

function SignUp() {
  const { tokenData } = useSelector((state) => state.coreCrowd);
  const TokenAddress = tokenData?.address;
  const tokenDecimals = tokenData?.decimals;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chainId = useChainId();
  const { address, isConnected } = useAccount();

  const [packageValue, setPackageValue] = useState("5");
  const [inputRef, setInputRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refFromUrl, setRefFromUrl] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const res = new URLSearchParams(window.location.search);
    if (res.has("ref")) {
      const ref = res.get("ref");
      setRefFromUrl(ref);
      setShowDiv(true);
    }
  }, [window.location.search]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const appToken = async (amt, TokenAddress, tokenDecimals) => {
    try {
      const res = tokenApprove(amt, TokenAddress, tokenDecimals);
      await toast.promise(res, {
        loading: "Wait for Approvel.........",
        success: "Success!",
        error: "Approval Failed",
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };

  const Register = async (refAddress, amt) => {
    try {
      setIsLoading(true);
      if (!address) {
        setIsLoading(false);
        return toast.error("Please connect wallet");
      }
      if (!packageValue) {
        setIsLoading(false);
        return toast.error("Enter Package Value");
      }

      const isUserExist = await UserExist(address);
      if (isUserExist) {
        toast.error("You are already registered! Please Login");
        setIsLoading(false);
        return;
      }
      
      const ownerAddress = await GetOwner();
      console.log(ownerAddress,"sssss")

      const response = await getAddressbyRefrralId(refAddress);
      console.log(response,"response")

      const refAddressSet = !response?.data ? ownerAddress : response?.data;

      console.log(refAddressSet, "ref::::");

     if(response)
     {
      const isValidRef = await UserExist(response?.data);

      if (!isValidRef) {
        setIsLoading(false);
        toast.error("Invalid Sponsor Id");
        return;
      }
    }else{
      setIsLoading(false);
      toast.error("Invalid Sponsor Id");
      return;
    }

    let realAmt = 5*1e18;
    console.log(realAmt,"realAmt")

    const bal = await getTotalPol(realAmt)

    let increasedAmt = bal + (bal * BigInt(2)) / BigInt(100);
    
    let appRes;
    appRes = true;
    if (appRes) {
        const buy = JoinPlan(increasedAmt,refAddressSet);
        await toast.promise(buy, {
          loading: "Buying...",
          success: "Success!",
          error: "Error",
        });
        if (buy) {
          setTimeout(() => {
            navigate("/Dashboard");
            setIsLoading(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during the registration process.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      checkAllowance(address)
        .then((res) => {})
        .catch((e) => {
          console.log(e, ":::::::::");
        });
    }
  }, [address]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setPackageValue(value);
  };

  const convertToVin = (usdValue) => {
    if (!usdValue || isNaN(usdValue)) return 0;
    return (usdValue / 0.1).toFixed(2);
  };

  return (
    <>
      <div className="full-width">
        <div className="hero-sign">
          {/* Back Button */}
          <button 
            onClick={() => navigate("/")}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              padding: '8px 16px',
              background: '#000000',
              border: '1px solid',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back
          </button>
          
          {/* Sign In Section */}
          <div className="auth-section">
            <a href="/">
              <img src={Logo} style={{ height: "50px" }} alt="Logo" />
            </a>
            <h2 className="h2">Sign Up</h2>
            <p className="welcome-msg text-light">
              Join Coopgenix today! Experience the future of financial freedom.
            </p>
            <input
              className="input-signin"
              value={address}
              type="text"
              placeholder="Address"
              readOnly
            />
            <input
              className="input-signin"
              value={refFromUrl ? refFromUrl : inputRef}
              onChange={(e) => setInputRef(e.target.value)}
              type="text"
              placeholder="Sponsor Id"
            />
            <input
              className="input-signin"
              value={packageValue}
              onChange={handleInputChange}
              type="text"
              placeholder="Package Value"
            />
            {isConnected ? (
              <button
                className="button-signin"
                onClick={() =>
                  Register(refFromUrl ? refFromUrl : inputRef, packageValue)
                }
              >
                Register
              </button>
            ) : (
              <button className="button-signin btn btn-danger" disabled>
                Wallet Not Connected !!
              </button>
            )}
            <p className="text-light"></p>
            <div className="web3-buttons">
              <ConnectWallet />
              <div className="d-flex justify-content-center">
                <p className=" mt-3 mb-0 d-flex align-items-center justify-content-center gap-2 text-light">
                  Already have an account?{"  "}
                  <div
                    className="text-success badge bg-white-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0 "
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      to="/SignIn"
                      className="text-primary"
                      style={{ fontSize: "15px" }}
                    >
                      Sign In
                    </Link>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;