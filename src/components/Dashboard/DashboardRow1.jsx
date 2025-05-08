import React, { useEffect, useState } from "react";
import {
  BuyMatrix,
  getPackInfo,
  getTotalPol,
  MatrixAmount,
  promiseReward,
  UserData,
  UserExist,
  withdrawcoopinc,
} from "../web3";
import { BiSolidUserAccount } from "react-icons/bi";
import { GiLevelEndFlag } from "react-icons/gi";
import { RiRefund2Line } from "react-icons/ri";
import { RiFundsBoxLine } from "react-icons/ri";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useAccount } from "wagmi";
import { cutAfterDecimal } from "../web3";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deal from "../../assets/img/deal (1).png";
import "../../style/Dashboard.css";
import axios from "axios";
import { apiUrl } from "../Config";
import { setUserDetails } from "../../Redux/Dashdata";
import toast from "react-hot-toast";
import CountdownTimer from "../CountdownTimer";

function DashboardRow1() {
  const { tokenData } = useSelector((state) => state.coreCrowd);
  const { wallet, dashboardData } = useSelector((state) => state.coreCrowd);
  const { walletAddress, isConnected } = wallet;
  const [isLoading, setIsLoading] = useState(false);
  const [packageStatus, setPackageStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const [dashboard, setDashboard] = useState();
  const dispatch = useDispatch();
  const [blockDataMap, setBlockDataMap] = useState({});
  const [timeDataMap, setTimeDataMap] = useState({});
  const [globalupdownline, setGlobalupdownline] = useState([]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [udata, setUdata] = useState(0);
  const [promise, setPromise] = useState(0);
  async function fetchData(address) {
    try {
      const response = await axios.get(apiUrl + "/user-info", {
        params: {
          userId: address,
        },
      });

      if (response?.status === 200) {
        setDashboard(response?.data);
        dispatch(setUserDetails(response?.data));
        let datauu = response?.data?.global_upline_downline;
        console.log(
          response?.data?.global_upline_downline,
          ":::::api data grlobal downline"
        );
        setGlobalupdownline(datauu);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(globalupdownline, " updaetd globalupdownline");
  }, [globalupdownline]);

  const buyMatrix = async (packageId) => {
    try {
      console.log("packageId ", packageId);
      setIsLoading(true);
      if (!address) {
        setIsLoading(false);
        return toast.error("Please connect wallet");
      }

      const isUserExist = await UserExist(address);
      if (!isUserExist) {
        toast.error("You are not registered! Please Signup");
        setIsLoading(false);
        return;
      }

      const mat_amount = await MatrixAmount(packageId);

      console.log("matrix_amount ", mat_amount);
      let realAmt = mat_amount;

      console.log(realAmt, "realAmt");

      const bal = await getTotalPol(realAmt);

      let increasedAmt = bal + (bal * BigInt(2)) / BigInt(100);

      let appRes;

      appRes = true;
      if (appRes) {
        const buy = BuyMatrix(increasedAmt, packageId);
        await toast.promise(buy, {
          loading: "Activating Package...",
          success: "Success!",
          error: "Error",
        });
        if (buy) {
          fetchPackageStatus(address);
          // setTimeout(() => {
          //   navigate("/Dashboard");
          //   setIsLoading(false);
          // }, 2000);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during the registration process.");
      setIsLoading(false);
    }
  };

  const withdrawIncome = async () => {
    if (!address) return toast.error("Please connect wallet");

    const amount = parseFloat(withdrawAmount);

    if (!amount || amount <= 0) {
      return toast.error("Please enter a valid amount greater than 0");
    }

    if (amount > udata) {
      return toast.error("Entered amount exceeds your withdrawable balance");
    }

    try {
      setIsLoading(true);

      const amountToSend = BigInt(amount * 1e18); // Convert to wei using BigInt

      const wida = withdrawcoopinc(amountToSend);

      await toast.promise(wida, {
        loading: "Withdrawing Income...",
        success: "Success!",
        error: "Error",
      });

      setShowWithdrawModal(false);
      setWithdrawAmount("");
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during withdrawal.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBlockData = async (packageId) => {
    try {
      const response = await axios.get(apiUrl + "/uwn", {
        params: {
          user: address,
          packageId: packageId,
        },
      });

      if (response?.status === 200) {
        setBlockDataMap((prev) => ({
          ...prev,
          [packageId]: response.data.mergedRecords,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) fetchData(address);
    getUserData(address);
    promiseBalc(address);
  }, [address]);

  const promiseBalc = async (address) => {
    try {
      const respo = await promiseReward(address);
      setPromise(Number(respo));
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during the get package process.");
      return false;
    }
  };

  const packageInfo = async (address, packageId) => {
    try {
      const response = await axios.get(`${apiUrl}/getpackagestatus`, {
        params: {
          user: address,
          packageId: packageId,
        },
      });

      const isactive = response.data?.isactive; // adjust based on actual response structure
      return isactive;
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during the get package process.");
      return false;
    }
  };

  const getUserData = async (address) => {
    try {
      const udata = await UserData(address);
      const udaa = Number(udata?.[2]);
      if (udaa > 0) {
        setUdata(udaa / 1e18);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred during the get package process.");
      return false;
    }
  };
  const fetchPackageStatus = async (address) => {
    const status = {};
    for (let i = 1; i <= 12; i++) {
      status[i] = await packageInfo(address, i);
    }
    setPackageStatus(status);
    setLoading(false);
  };

  useEffect(() => {
    if (address) {
      fetchPackageStatus(address);
    }
  }, [address]);

  const shouldBePurple = (records, poolId, place) => {
    return records?.some(
      (item) => item.poolId === poolId && item.place === place
    );
  };

  const renderActivateButton = (blockId) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!packageStatus[blockId]) {
      return (
        <button
          type="button"
          className="btn text-light"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
              radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
              linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
          }}
          onClick={() => buyMatrix(blockId)}
        >
          Activate
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn text-light"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
              radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
              linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
            visibility: "hidden",
          }}
        ></button>
      );
    }
    // return null;
  };

  const blocks = [
    { id: 1, value: "$5", reward: "12.8" },
    { id: 2, value: "$15", reward: "38.4" },
    { id: 3, value: "$45", reward: "115" },
    { id: 4, value: "$135", reward: "345" },
    { id: 5, value: "$405", reward: "1036" },
    { id: 6, value: "$1215", reward: "3110" },
    { id: 7, value: "$3645", reward: "9331" },
    { id: 8, value: "$10935", reward: "27993" },
    { id: 9, value: "$32805", reward: "83980" },
    { id: 10, value: "$98415", reward: "251942" },
    { id: 11, value: "$265245", reward: "755827" },
    { id: 12, value: "$885735", reward: "2267481" },
  ];

  const tableData = [
    { id: 1, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 2, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 3, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 4, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 5, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 6, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 7, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 8, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 9, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 10, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 11, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 12, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 13, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 14, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 15, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 16, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 17, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 18, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 19, code: "#12345", amount1: "$3404404", amount2: "$34044" },
    { id: 20, code: "#12345", amount1: "$3404404", amount2: "$34044" },
  ];

  useEffect(() => {
    const fetchAllBlockData = async () => {
      try {
        const results = await Promise.all(
          blocks.map(async (block) => {
            const response = await axios.get(apiUrl + "/uwn", {
              params: {
                user: address,
                packageId: block.id,
              },
            });
            return {
              packageId: block.id,
              records: response?.data?.mergedRecords || [],
              time: response?.data?.expiry || 0,
            };
          })
        );

        const newDataMap = {};
        const timeStamp = {};
        results.forEach(({ packageId, records, time }) => {
          console.log(time, "time");
          newDataMap[packageId] = records;
          timeStamp[packageId] = time;
        });

        setBlockDataMap(newDataMap);
        setTimeDataMap(timeStamp);
        console.log(timeStamp, "timeStamp");
        // console.log(blockDataMap, "blockDataMap");
      } catch (error) {
        console.error("Failed to fetch block data:", error);
      }
    };

    if (blocks?.length > 0 && address) {
      fetchAllBlockData();
    }
  }, [address]);

  let uplineEn = false;

  const getRowStyle = (index, item) => {
    if (item.user === address) {
      uplineEn = true;
      return { color: "#00FF00", fontWeight: "bold" };
    } else if (!uplineEn) {
      return { color: "#999999" };
    } else {
      return { color: "#FFA500" };
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-lg-12">
          <div>
            <div className="card custom-card school-card glow-box">
              <div className="card-body d-flex gap-2 justify-content-evenly flex-wrap">
                <div className="">
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">User ID</span>
                        <h6 className="mb-0 fw-semibold">
                          {dashboard?.userDetails?.userId || "Loading..."}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Sponsor ID</span>
                        <h6 className="mb-0 fw-semibold">
                          {dashboard?.userDetails?.referrerId || "Loading..."}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">ID Date</span>
                        <h6 className="mb-0 fw-semibold">
                          {dashboard?.userDetails?.createdAt
                            ? new Date(
                                dashboard.userDetails.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Loading..."}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Total Earnings</span>
                        <h6 className="mb-0 fw-semibold">
                          {" "}
                          {dashboard?.totalincome.toFixed(3) || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Earning Goal</span>
                        <h6 className="mb-0 fw-semibold">
                          {" "}
                          {dashboard?.earning_goal || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Promise Reward</span>
                        <h6 className="mb-0 fw-semibold"> {promise || "0"}</h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Today Earning</span>
                        <h6 className="mb-0 fw-semibold">
                          {" "}
                          {dashboard?.todayBonus || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                        {/* <span
                          className="text-info badge bg-success-transparent"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "15px",
                            right: "15px",
                          }}
                          // onClick={getDailyReward}
                        >
                          Claim
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Reward Wallet</span>
                        <h6 className="mb-0 fw-semibold">{udata || "0"}</h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                        <span
                          className="text-info badge bg-success-transparent"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "15px",
                            right: "8px",
                          }}
                          onClick={() => setShowWithdrawModal(true)}
                        >
                          Withdraw
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6 col-lg-6">
         
        </div> */}

        {/* // row for four box */}
        <div className="col-sm-12 col-lg-12">
        <div>
            <div className="card custom-card school-card glow-box " style={{overflow: "hidden", paddingRight:"25px"}}>
              <div className="card-body col-12 d-flex" style={{overflow: "auto"}}>
                {/* Box 1: User ID */}
                <div className="col-12 col-sm-6 col-lg-3 mx-1">
                  <div className="card custom-card school-card glow-box ">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Self Team Bonus</span>
                        <h6 className="mb-0 fw-semibold">
                          {dashboard?.self_team_income || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 2: Sponsor ID */}
                <div className="col-12 col-sm-6 col-lg-3  mx-1">
                  <div className="card custom-card school-card glow-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Weekly Fund</span>
                        <h6 className="mb-0 fw-semibold">
                          {dashboard?.weeklyfund || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 3: ID Date */}
                <div className="col-12 col-sm-6 col-lg-3  mx-1">
                  <div className="card custom-card school-card glow-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Unity Income</span>
                        <h6 className="mb-0 fw-semibold">
                        {Number(dashboard?.userDetails?.unity_income || 0).toFixed(2)}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 4: Total Earnings */}
                <div className="col-12 col-sm-6 col-lg-3 mx-1">
                  <div className="card custom-card school-card glow-box ">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Direct Count</span>
                        <h6 className="mb-0 fw-semibold">
                          0
                          {dashboard?.week_directs || "0"}
                        </h6>
                      </div>
                      <div>
                        <span className="text-primary1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // row for four box */}

        <div className="col-sm-12 col-md-6 col-lg-6 ">
          <div
            className="row col-md-12 col-lg-12 left-row-cards"
            style={{ paddingRight: "0px", marginLeft: "0", marginRight: "0" }}
          >
            <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Direct Referral</span>
                      <h6 className="mb-0 fw-semibold">
                        {dashboard?.userDetails?.directCount || "0"}
                      </h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Referral Reward</span>
                      <h6 className="mb-0 fw-semibold">
                        {dashboard?.sponsor_income || "0"}
                      </h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Reward Goal</span>
                      <h6 className="mb-0 fw-semibold">
                        {dashboard?.reward_goal > 0
                          ? Number(dashboard.reward_goal).toFixed(2)
                          : "0"}
                      </h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Direct Volume</span>
                      <h6 className="mb-0 fw-semibold">
                        {" "}
                        {dashboard?.direct_volume || "0"}
                      </h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Unity Reward</span>
                      <h6 className="mb-0 fw-semibold"> 0</h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        <img src={sponsor} alt="" style={{ width: "40px" }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="col-sm-6 col-lg-6">
              <div>
                <div className="card custom-card school-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Self Team Bonus</span>
                      <h6 className="mb-0 fw-semibold">
                        {dashboard?.self_team_income || "0"}
                      </h6>
                    </div>
                    <div>
                      <span className="text-primary1">
                        <img src={sponsor} alt="" style={{ width: "40px" }} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div
            className="card custom-card crm-card glow-box"
            style={{ overflowY: "scroll", maxHeight: "1300px" }}
          >
            <div className="card-body">
              <div className="card-header justify-content-between">
                <div className="card-title">Global Reward</div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-nowrap text-center direct-data-table">
                    <thead>
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Reward</th>
                        {/* <th scope="col">Time Stamp</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {globalupdownline?.length &&
                        globalupdownline.map((item, index) => {
                          return (
                            <tr key={item.uId}>
                              <td style={getRowStyle(index, item)}>
                                {item.uId}
                              </td>
                              <td style={getRowStyle(index, item)}>
                                {item.userId}
                              </td>
                              <td style={getRowStyle(index, item)}>
                                {" "}
                                {item.packageValue / 1e18}
                              </td>
                              <td style={getRowStyle(index, item)}>
                                $ {item.amount / 1e18}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 ">
          <div className="card custom-card crm-card glow-box">
            <h3 style={{ textAlign: "center", marginTop: "18px" }}>
              Block Reward
            </h3>
            <div
              className="card-body"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <>
                {blocks.map((block) => {
                  const blockRecords = blockDataMap[block.id]; // this is packageId
                  const timeData = timeDataMap[block.id];
                  console.log(timeData, block.id, "timeData");
                  console.log(blockRecords, "blockRecordsxxxx");
                  return (
                    <div
                      className="col-sm-12 col-md-12 col-lg-4"
                      key={block.id}
                    >
                      <div className="card custom-card crm-card">
                        <div className="card-body">
                          <div className="reward-box glow-box">
                            <h5>Block {block.id}</h5>
                            {timeData >= 0 ? (
                              <span>
                                <CountdownTimer endTime={timeData * 1000} />
                              </span>
                            ) : (
                              ""
                            )}
                            <div className="block-box">
                              {[...Array(8)].map((_, i) => {
                                // Mapping 8 small boxes to combinations of poolId and place
                                // First 2 boxes: poolId 1 place 1 & 2
                                // Next 2: poolId 2 place 1 & 2 and so on...
                                const poolId = Math.floor(i / 2) + 1; // 1 to 4
                                const place = (i % 2) + 1; // 1 or 2
                                const isPurple = shouldBePurple(
                                  blockRecords,
                                  poolId,
                                  place
                                );

                                return (
                                  <div
                                    className="small-box"
                                    key={i}
                                    style={{
                                      backgroundColor: isPurple
                                        ? "purple"
                                        : undefined,
                                      color: isPurple ? "#fff" : undefined,
                                    }}
                                  >
                                    {i + 1}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="box-btn-content">
                              <div className="package-package">
                                Value {block.value}
                              </div>
                              <div className="Potential-Reward">
                                Reward {block.reward}
                              </div>
                            </div>
                            <div className="box-btn-content content-2">
                              <div className="activate-button">
                                {renderActivateButton(block.id)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        </div>
      </div>

      {showWithdrawModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px", // for mobile spacing
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
              padding: "30px",
              borderRadius: "12px",
              color: "#fff",
              boxShadow: "0 5px 20px rgba(228, 212, 212, 0.87)",
            }}
          >
            <h5 className="mb-3">Enter Amount to Withdraw</h5>
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              style={{
                borderRadius: "8px",
                backgroundColor: "#f8f9fa", // light input background
                color: "#000",
              }}
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-light"
                onClick={() => {
                  setShowWithdrawModal(false);
                  setWithdrawAmount("");
                }}
              >
                Cancel
              </button>
              <button className="btn btn-dark" onClick={withdrawIncome}>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardRow1;
