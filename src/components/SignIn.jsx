import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import { UserExist } from "./web3";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LOGO from "../assets/img/logo.png";
import { useAccount, useChainId } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { setWalletDetails } from "../Redux/Slice";
import Logo from "/coopgenix.svg";

function SignIn() {
  // const address = "0xf0c90d0e550afa5c4d557a7bebfb89b1ea4d97f8";
  const wallet = useSelector((state) => state.coreCrowd.wallet);
  console.log(wallet);
  const { address } = useAccount();
  const [walletAddress, setWalletAddress] = useState();
  const { isConnected, status, isDisconnected } = useAccount();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chainId = useChainId();
  useAccount();

  const res = new URLSearchParams(window.location.search);
  const ref = res?.get("ref");
  useEffect(() => {
    setWalletAddress(ref ? ref : address);
  }, [ref]);

  const LogIn = async () => {
    try {
      const user = await UserExist(address);
      if (user) {
        navigate("/Dashboard");

        dispatch(
          setWalletDetails({
            walletAddress: address,
            chainId,
            isConnected,
            isDisconnected,
            status,
          })
        );
      } else {
        toast.error("User Not Exist! Please Register first");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during the login process.");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login attempt with:", { email, password });
  };

  return (
    <>
      <div className="full-width">
        <div className="hero-sign">
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
          {/* <!-- Sign In Section --> */}
          <div className="auth-section">
            <a href="/">
              <img src={Logo} style={{ height: "50px" }} alt="Logo" />
              {/* <h2>CoopGenix</h2> */}
            </a>
            <h2 className="h2">Sign In</h2>
            <p className="welcome-msg text-light">
              Welcome back! Unlock your rewards and continue your journey with
              Coopgenix.
            </p>
            <input
              className="input-signin"
              value={address}
              type="text"
              placeholder="Address"
              readOnly
            />
            {/* <input className="input-signin" type="password" placeholder="Password"/> */}
            {isConnected ? (
              <button className="button-signin" onClick={LogIn}>
                Login
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
                  Don't Have an account?{"  "}
                  <div
                    className="text-success badge bg-white-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0 "
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      to="/SignUp"
                      className="text-primary"
                      style={{ fontSize: "15px" }}
                    >
                      Sign Up
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

export default SignIn;
