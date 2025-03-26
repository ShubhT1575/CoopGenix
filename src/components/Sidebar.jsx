import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserExist } from "./web3";
import { GiProfit } from "react-icons/gi";
import { RiGlobalFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import LOGO from "../assets/img/logo.png";
import { useSelector } from "react-redux";
import { getOwner } from "./web3";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useAccount } from "wagmi";
import economy from "../../src/assets/img/economy.png";
import "../style/Sidebar.css";

function Sidebar() {
  const wallet = useSelector((state)=>state.coreCrowd.wallet)
  const address = wallet?.walletAddress;

  const navigate = useNavigate();
  const [Owner, setOwner] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [refFromUrl, setRefFromUrl] = useState(false);
  // const [showDiv , setShowDiv] = useState()

  useEffect(() => {
    const res = new URLSearchParams(window.location.search);
    if (res.has("ref")) {
      const ref = res.get("ref");
      setRefFromUrl(ref);
      // setShowDiv(true);
    }
  }, [window.location.search]);

  useEffect(() => {
    if (address) {
      UserExist(address)
        .then((res) => {
          if (!res) navigate("/signup");
        })
        .catch((e) => {
          console.log(e);
          navigate("/signup");
        });
    }
  }, [address]);

  const useOwner = async () => {
    const owner = await getOwner();
    setOwner(owner);
  };

  useEffect(() => {
    useOwner();
  }, []);

  function closeSidebar() {
    const side = document.getElementById("sidebar");
    const Body = document.getElementsByTagName("body");
    console.log(Body);
    if (window.innerWidth <= 992) {
      if (side.classList.contains("t")) {
        side.classList.replace("t", "y");
      } else if (side.classList.contains("y")) {
        side.classList.replace("y", "t");
      }
    }
  }

  return (
    <div className={`app-sidebar sticky t close glow-box glow-box-blue `} id="sidebar"
    style={{ background: "black" }}
     >
      {/* `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)` */}
      <div className="main-sidebar-header">
        <a href="/dashboard" className="header-logo fs-4 fw-bold mt-3">
          {/* <img src={LOGO} alt="Logo" style={{ width: "175px", height: "37px" }} /> */}
          <h4>⚡ DecentraNext</h4>
        </a>
      </div>
      <div
        className="main-sidebar"
        id="sidebar-scroll"
        style={{ display: "block" }}
      >
        <nav className="main-menu-container nav nav-pills flex-column sub-open position-relative h-100 mt-3">
          <div className="d-flex justify-content-center mb-3">
            {/* <img
              src={LOGO}
              alt="Logo"
              style={{ height: "37px", width: "175px", display: "none" }}
              className="dash-logo"
            /> */}
            <h4>⚡ DecentraNext</h4>
          </div>
          <ul className="main-menu ">
            <li className="slide has-sub">
              <Link
                to="/Dashboard"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 side-menu__icon sidebar-item"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  ></path>
                </svg>
                <span className="side-menu__label sidebar-item">Dashboard</span>
              </Link>
            </li>

            {/* <li className="slide has-sub">
              <Link
                to="/StakingReward"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <GiProfit className="side-menu__icon sidebar-item" />
                <span className="side-menu__label sidebar-item">Staking Rewards</span>
              </Link>
            </li>
            <li className="slide has-sub">
              <Link
                to="/WalkingRewards"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <GiReceiveMoney className="side-menu__icon sidebar-item" />
                <span className="side-menu__label sidebar-item">Walking Rewards</span>
              </Link>
            </li>
            <li className="slide has-sub">
              <Link
                to="/CommunityRewards"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <RiGlobalFill className="side-menu__icon sidebar-item" />
                <span className="side-menu__label sidebar-item">Community Rewards</span>
              </Link>
            </li> */}
            {/* <li className="slide has-sub">
              <Link
                to="/AutoGlobal"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <svg
                  className="side-menu__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-businessplan"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                  <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                  <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                  <path d="M5 15v1m0 -8v1" />
                </svg>
                <span
                  className="side-menu__label sidebar-item"
                  style={{ paddingLeft: "10px" }}
                >
                  Return Fund
                </span>
              </Link>
            </li>
            <li className="slide has-sub">
              <Link
                to="/Ranking"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <i className="ri-sort-asc side-menu__icon"></i>
                <span className="side-menu__label sidebar-item">Global Ranking</span>
              </Link>
            </li> */}
            {/* <li className="slide has-sub">
              <Link
                to="/TeamData"
                className="side-menu__item"
                onClick={closeSidebar}
              >
                <i className="ri-table-fill side-menu__icon sidebar-item"></i>
                <span className="side-menu__label sidebar-item">Team Data</span>
              </Link>
            </li> */}
            {/* {Waddress === Raddress && (
              <li className="slide has-sub">
                <Link
                  to="/Support"
                  className="side-menu__item"
                  onClick={closeSidebar}
                >
                  <MdOutlineSupportAgent className="side-menu__icon" />
                  <span className="side-menu__label sidebar-item">Support</span>
                </Link>
              </li>
            )}
            {Owner == Raddress && (
              <li className="slide has-sub">
                <Link
                  to="/LapseWallet"
                  className="side-menu__item"
                  onClick={closeSidebar}
                >
                  <i className="ri-wallet-3-fill side-menu__icon"></i>
                  <span className="side-menu__label sidebar-item">Lapse Wallet </span>
                </Link>
              </li>
            )} */}
          </ul>
          <Link
            to="/signup"
            className=" position-absolute"
            style={{ bottom: "20px", left: "30%" }}
          >
            <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>
              Logout
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
