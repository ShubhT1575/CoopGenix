import React, { useEffect, useState } from "react";
import { UserData } from "../web3";
import { BiSolidUserAccount } from "react-icons/bi";
import { GiLevelEndFlag } from "react-icons/gi";
import { RiRefund2Line } from "react-icons/ri";
import { RiFundsBoxLine } from "react-icons/ri";
import { RiExchangeFundsFill } from "react-icons/ri";
import { useAccount } from "wagmi";
import { cutAfterDecimal } from "../web3";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deal from "../../assets/img/deal (1).png";
import "../../style/Dashboard.css";

function DashboardRow1() {
  const { tokenData } = useSelector((state) => state.coreCrowd);
  const TokenAddress = tokenData?.address;
  const tokenDecimals = tokenData?.decimals;
  const { wallet, dashboardData } = useSelector((state) => state.coreCrowd);
  const { walletAddress } = wallet;
  const { userId, referralId, refUserId, refReferralId, highestPool } =
    dashboardData;
  const address = walletAddress;
  const [dashboard, setDashboard] = useState();

  async function fetchData(address) {
    try {
      let data = await UserData(address);
      setDashboard(data);
    } catch (error) {
      setDashboard(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (address) fetchData(address);
  }, [address]);

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

  return (
    <>
      <div className="row">
        {/* 
      <div class="user-strip">
    <div>User ID: #123456</div>
  <div>Sponsor ID: #123456</div>
  <div>ID Date: #123456</div>
    <div>Total Earnings: $5000</div>
    <div>Earning Goal: $10000</div>
    <div>Spot Wallet: $1200</div>
  <button class="withdraw-btn">Claim</button>
    <div>Reward Wallet: $800</div>
    <button class="withdraw-btn">Withdraw</button>
</div> */}

        <div className="col-sm-12 col-lg-12">
          <div>
            <div className="card custom-card school-card glow-box">
              <div className="card-body d-flex gap-2 justify-content-between flex-wrap">
                <div className="">
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">User ID</span>
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                        {/* <span
                        className="text-info badge bg-success-transparent"
                        style={{ cursor: "pointer", position: "absolute" , bottom: "15px" , right: "15px" }}
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
                        <span className="d-block mb-1">Spot Wallet</span>
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                        <span
                        className="text-info badge bg-success-transparent"
                        style={{ cursor: "pointer", position: "absolute" , bottom: "15px" , right: "15px" }}
                        // onClick={getDailyReward}
                      >
                        Claim
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="card custom-card school-card glow-box width-box">
                    <div className="card-body d-flex gap-2 justify-content-between">
                      <div>
                        <span className="d-block mb-1">Reward Wallet</span>
                        <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
                      </div>
                      <div>
                        <span className="text-primary1">
                          {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                        </span>
                        <span
                        className="text-info badge bg-success-transparent"
                        style={{ cursor: "pointer", position: "absolute" , bottom: "15px" , right: "8px" }}
                        // onClick={getDailyReward}
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
                      <h6 className="mb-0 fw-semibold">{"#123456"}</h6>
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
                      <h6 className="mb-0 fw-semibold">{"$5000"}</h6>
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
                      <h6 className="mb-0 fw-semibold">{"$10000"}</h6>
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
                      <h6 className="mb-0 fw-semibold">{"$1200"}</h6>
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
          </div>

          <div className="card custom-card crm-card glow-box">
            <div className="card-body">
              {/* <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary border-opacity-10 bg-primary-transparent rounded-pill">
                    <span className="avatar avatar-md avatar-rounded bg-primary svg-white">
                      <img
                        src={deal}
                        alt=""
                        style={{ height: "22px", width: "22px" }}
                      />
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="loader-main"></div>
                </div>
              </div>
              <div className="d-flex  flex-column mt-1 ">
                <p className="flex-fill fs-14 mb-0">Sponsor ID</p>
                <h5 className="mb-0 d-flex align-items-center">
                  {refReferralId || "No Sponsor"}
                </h5>
              </div> */}
              {/* <div
                className="card custom-card overflow-hidden"
                // style={{ height: "483px" }}
              > */}
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
                        <th scope="col">Earnings</th>
                        <th scope="col">1% Reward</th>
                        {/* <th scope="col">Time Stamp</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={{ color: "rgb(0, 119, 181)" }}>
                            {item.code}
                          </td>
                          <td>{item.amount1}</td>
                          <td>{item.amount2}</td>
                        </tr>
                      ))}
                      <tr>
                        <td style={{ fontWeight: "700" }}>{"Total"}</td>
                        <td
                          style={{
                            color: "rgb(255, 255, 255)",
                            fontWeight: "700",
                          }}
                        >
                          {"Per Cycle"}
                        </td>
                        <td style={{ fontWeight: "700" }}>{"$68088080"}</td>
                        <td style={{ fontWeight: "700" }}>{"$680880"}</td>
                      </tr>
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
          <h3 style={{textAlign: "center" , marginTop: "18px"}}>Block Reward</h3>
            <div
              className="card-body"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {/* <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary border-opacity-10 bg-primary-transparent rounded-pill">
                    <span className="avatar avatar-md avatar-rounded bg-primary svg-white">
                      <BiSolidUserAccount />
                    </span>
                  </div>
                </div>
                <div className="d-flex"></div>
              </div> */}
              {/* <div className="d-flex  flex-column mt-1 ">
                <p className="flex-fill fs-14 mb-0">User ID</p>
                <h5 className="mb-0 d-flex align-items-center">
                  {referralId || "No User"}
                </h5>
              </div> */}
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card ">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 1</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $5</div>
                        <div class="Potential-Reward">Reward 12.8</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 2</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $15</div>
                        <div class="Potential-Reward">Reward 38.4</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 3</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $45</div>
                        <div class="Potential-Reward">Reward 115</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 4</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $135</div>
                        <div class="Potential-Reward">Reward 345</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 5</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $405</div>
                        <div class="Potential-Reward">Reward 1036</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 6</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $1215</div>
                        <div class="Potential-Reward">Reward 3110</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 7</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $3645</div>
                        <div class="Potential-Reward">Reward 9331</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 8</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $10935</div>
                        <div class="Potential-Reward">Reward 27993</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 9</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $32805</div>
                        <div class="Potential-Reward">Reward 83980</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 10</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $98415</div>
                        <div class="Potential-Reward">Reward 251942</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 11</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $265245</div>
                        <div class="Potential-Reward">Reward 755827</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-4 ">
                <div className="card custom-card crm-card">
                  <div className="card-body">
                    {/*  */}
                    <div class="reward-box glow-box">
                      <h5>Block 12</h5>
                      <div class="block-box">
                        {/* <!-- 8 Small Boxes Inside Each Reward Box --> */}
                        <div class="small-box">1</div>
                        <div class="small-box">2</div>
                        <div class="small-box">3</div>
                        <div class="small-box">4</div>
                        <div class="small-box">5</div>
                        <div class="small-box">6</div>
                        <div class="small-box">7</div>
                        <div class="small-box">8</div>

                        {/* <div class="activate-button">
                          <button type="button" className="btn text-light" style={{background:`radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`}}>Activate</button>
                        </div> */}
                      </div>
                      <div className="box-btn-content">
                        <div class="package-package">Value $885735</div>
                        <div class="Potential-Reward">Reward 2267481</div>
                      </div>
                      <div className="box-btn-content content-2">
                        <div class="activate-button">
                          <button
                            type="button"
                            className="btn text-light"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.8), rgba(0, 0, 0, 0) 50%), 
                 radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.8), rgba(0, 0, 0, 0) 50%),
                 linear-gradient(135deg, #0d0d2b, #1b1b3a)`,
                            }}
                          >
                            Activate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-sm-12 col-md-4 col-lg-4 ">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div className="">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary1 border-opacity-10 bg-primary1-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-primary1 svg-white">
                      <GiLevelEndFlag />
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Level</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h5 className="mb-0 d-flex align-items-center">
                  {" "}
                  {(dashboard && Number(dashboard[2])) || 0}
                </h5>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-3 ">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div className="">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary2 border-opacity-10 bg-primary2-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-primary2 svg-white">
                      <RiExchangeFundsFill />
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Core Fund</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h5 className="mb-0 d-flex align-items-center">
                  ${" "}
                  {dashboard &&
                    cutAfterDecimal(
                      Number(dashboard[4]) / Number("1e" + tokenDecimals),
                      2
                    )}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 ">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div className="">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary3 border-opacity-10 bg-primary3-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-primary3 svg-white">
                      <RiFundsBoxLine />
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Fortune Fund</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h5 className="mb-0 d-flex align-items-center">
                  ${" "}
                  {dashboard &&
                    cutAfterDecimal(
                      Number(dashboard[5]) / Number("1e" + tokenDecimals),
                      2
                    )}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 ">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div className="">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-secondary border-opacity-10 bg-secondary-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-secondary svg-white">
                      <RiRefund2Line />
                    </span>
                  </div>
                  <Link to="/Ranking">
                    {highestPool?.poolNo && (
                      <span
                        className="text-primary4 badge bg-warning-transparent rounded-pill d-flex align-items-center fs-11 me-0 ms-2 mb-0 "
                        style={{ height: "25px", cursor: "pointer" }}
                      >
                        G{highestPool?.poolNo * 10}
                      </span>
                    )}
                  </Link>
                </div>
                <p className="flex-fill fs-14 mb-0">Global Fund</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h5 className="mb-0 d-flex align-items-center">
                  ${" "}
                  {dashboard &&
                    cutAfterDecimal(
                      Number(dashboard[6]) / Number("1e" + tokenDecimals),
                      2
                    )}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 ">
          <div className="card custom-card crm-card">
            <div className="card-body">
              <div className="">
                <div className="d-flex justify-content-between mb-2">
                  <div className="p-2 border border-primary1 border-opacity-10 bg-primary1-transparent rounded-circle">
                    <span className="avatar avatar-rounded avatar-md bg-primary1 svg-white">
                      <svg
                        // className="side-menu__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                        <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                        <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                        <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                        <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                        <path d="M5 15v1m0 -8v1" />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="flex-fill fs-14 mb-0">Return Fund</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h5 className="mb-0 d-flex align-items-center">
                  {" "}
                  ${" "}
                  {dashboard &&
                    Number(dashboard[7]) / Number("1e" + tokenDecimals)}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default DashboardRow1;
