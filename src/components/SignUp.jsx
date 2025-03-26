import React, { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import "../style/SignUp.css";
import { useAccount, useChainId, useConnect } from "wagmi";
import { Link } from "react-router-dom";
import LOGO from "../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getAddressbyRefrralId } from "../API/Api.js";
import {
  buyPackage,
  checkAllowance,
  getOwner,
  getUSDT,
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

  const [packageValue, setPackageValue] = useState("");
  const [inputRef, setInputRef] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refFromUrl, setRefFromUrl] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  // const [isCheckedYes, setIsCheckedYes] = useState(false);
  // const [isCheckedNo, setIsCheckedNo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const res = new URLSearchParams(window.location.search);
    if (res.has("ref")) {
      const ref = res.get("ref");
      setRefFromUrl(ref);
      setShowDiv(true);
    }
  }, [window.location.search]);

  // const handleYesChange = (event) => {
  //   const checked = event.target.checked;
  //   setIsCheckedYes(checked);
  //   if (checked) {
  //     setIsCheckedNo(false);
  //     setShowDiv(true);
  //   }
  // };

  // const handleNoChange = (event) => {
  //   const checked = event.target.checked;
  //   setIsCheckedNo(checked);
  //   if (checked) {
  //     setIsCheckedYes(false);
  //     setShowDiv(false);
  //   }
  // };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // const handleButtonClick = (value) => {
  //   setPackageValue(value);
  // };

  // function getButtonClass(value) {
  //   switch (value) {
  //     case "10":
  //       return "primary3-light";
  //     case "50":
  //       return "secondary-light";
  //     case "100":
  //       return "warning-light";
  //     case "200":
  //       return "orange-light";
  //     case "500":
  //       return "primary2-light";
  //     default:
  //       return "default";
  //   }
  // }

  const appToken = async (amt, TokenAddress, tokenDecimals) => {
    try {
      // console.log(amt, TokenAddress, tokenDecimals, "??????????????????");
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
    console.log(refAddress, amt);
    try {
      setIsLoading(true);
      // if (!address) {
      //   setIsLoading(false);
      //   return toast.error("Please connect wallet");
      // }

      // if (!isChecked) {
      //   setIsLoading(false);
      //   return toast.error(
      //     "You must accept the Terms and Conditions to Register."
      //   );
      // }
      if (!refAddress) {
        setIsLoading(false);
        return toast.error("Enter Referal Address Value");
      }
      if (!packageValue) {
        setIsLoading(false);
        return toast.error("Enter Package Value");
      }
      if (amt < 25) {
        setIsLoading(false);
        toast.error("Please Enter an Package Amount Greater Than $ 25");
        return;
      }

      const isUserExist = await UserExist(address);
      if (isUserExist) {
        toast.error("You are already registered! Please Login");
        setIsLoading(false);
        return;
      }
      let getRefAddress;
      if (refAddress) {
        getRefAddress = await UserExist(refAddress);
        if (!getRefAddress) {
          setIsLoading(false);
          toast.error("Invalid Referral Address");
          return;
        }
      }

      const Tokaddress = await getUSDT();
      const Taddress = Tokaddress.address;
      const tokenDecimals = Tokaddress.decimals;
      console.log(Taddress, Tokaddress, "::::123");

      const balance = await getBalance(config, {
        address: address,
        token: Taddress,
      });

      // console.log(balance, "//////////////////");

      const walletBalance = parseFloat(balance.formatted);

      // console.log(walletBalance, amt, Taddress, "..............bal");

      // if (walletBalance < amt) {
      //   console.log(walletBalance, amt);
      //   setIsLoading(false);
      //   toast.error("Insufficient Balance");
      //   return;
      // }

      console.log("a a");
      const allowance = await checkAllowance(address, Taddress);
      console.log("a a4ll", allowance);
      let appRes;
      // console.log(tokenDecimals, amt, "::::tokenS");
      if (amt > allowance / Number("1e" + tokenDecimals)) {
        appRes = await appToken(convertToVin(amt), Taddress, tokenDecimals);
      } else {
        appRes = true;
      }
      console.log("here");
      if (appRes) {
        const buy = registration(address, refAddress, convertToVin(amt));
        console.log(buy, "buyy");
        await toast.promise(buy, {
          loading: "Buying...",
          success: "Success!",
          error: "Error",
        });
        if (buy) {
          setTimeout(() => {
            navigate("/Dashboard");
            setIsLoading(false);
          }, 4000);
        }
      }
    } catch (error) {
      console.log(error);
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
          {/* <!-- Sign In Section --> */}
          <div className="auth-section">
            <h1 className="brand-name">CoopUnion</h1>
            <h2 className="h2">Sign Up</h2>
            <p className="welcome-msg text-light">
            Join CoopUnion today! Experience the future of financial freedom.
            </p>
            <input
              className="input-signin"
              value={address}
              type="email"
              placeholder="Email"
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
            {/* <input className="input-signin" type="password" placeholder="Password"/> */}
            {isConnected ? (
              <button
                className="button-signin"
                onClick={()=>Register(
                  refFromUrl ? refFromUrl : inputRef,
                  packageValue
                )}
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
                          <Link to="/SignIn" className="text-primary" style={{fontSize: "15px"}}>
                            Sign In
                          </Link>
                        </div>
                      </p>
                    </div>
              {/* <button className="button-signin" onclick="connectMetaMask()"><i className="fab fa-ethereum"></i> MetaMask</button>
            <button className="button-signin" onclick="connectWalletConnect()"><i className="fas fa-link"></i> WalletConnect</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
