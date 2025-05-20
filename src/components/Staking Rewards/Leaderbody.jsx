import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../Config";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import { UserData, withdrawcoopinc, withdrawvrs } from "../web3";

const REPORT_OPTIONS = ["Unity Leaderboard"];

function LeaderBody() {
  const { wallet } = useSelector((state) => state.coreCrowd);
  const { walletAddress } = wallet;
  // const address = walletAddress;
  const { address } = useAccount();

  const [reportType, setReportType] = useState("Unity Leaderboard");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [unityFund,setUnityFund] = useState(0);
    const [dashboard, setDashboard] = useState();
    const [udata, setUdata] = useState(0);


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
  

  const handleReportChange = (e) => {
    setReportType(e.target.value);
    setCurrentPage(1);
  };

  const getCoreIncome = async () => {
    try {
      const response = await axios.get(apiUrl + "/getAllreport", {
        params: {
          address: address,
          page: currentPage,
          type: reportType, // send type in request
        },
      });
      if (response?.data?.status === 200) {
        setData(response?.data?.data);
        setUnityFund(response?.data?.totalweeklyfund);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (address) getCoreIncome();
  }, [address, currentPage, reportType]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Header + Row mappings for dynamic rendering
  const getTableHeaders = () => {
    switch (reportType) {
      case "Unity Leaderboard":
        return ["Rank", "User ID", "Current Unit", "Expected Reward"];
      default:
        return ["S.No", "From", "Level", "Amount", "Timestamp", "Hash"];
    }
  };

  // useEffect(() => {
  //   const filtered = data.filter(item => item.address?.toLowerCase() === myAddress.toLowerCase());
  //     setMyData(filtered);
  // },[data])

  const renderTableRows = () => {
    return data?.map((item, index) => {
      switch (reportType) {
        case "Unity Leaderboard":
          return (
            <tr key={index}>
              <td className="text-white">{index + 1}</td>
              <td className="text-white">{item?._id}</td>
              <td className="text-white">{item?.directCount}</td>
              <td className="text-white">{convertUSDToPOL(item?.expectedshare)+" POL"}</td>
            </tr>
          );
        default:
          return (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item?.userDetails?.referralId}</td>
              <td>
                {item.user?.slice(0, 6)}...{item.user?.slice(-6)}
              </td>
              <td>
                <a
                  href={`https://polygonscan.com/tx/${item.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.txHash}
                </a>
              </td>
              <td>{convertUSDToPOL(item?.amount)}</td>
              <td>{new Date(item?.timestamp).toLocaleString()}</td>
              <td>
                <span className="badge bg-success-transparent">success</span>
              </td>
            </tr>
          );
      }
    });
  };

  const withdrawIncomeUnity = async () => {
    if (!address) return toast.error("Please connect wallet");
  
    try {
      setIsLoading(true);
     const toastId = toast.loading("Requesting Unity Withdraw...");
      // API call to save withdrawal record
      const response = await axios.post(apiUrl + "/withdrawWeekly", {
        
            walletAddress: address,
          
        });
  
       
        if(response?.data){
         console.log("response ",response?.data?.vrsSign?.signature)
         const amount = response?.data?.vrsSign?.amount
         const deadline = response?.data?.deadline
         const vrsdetails = response?.data?.vrsSign?.signature;
         toast.dismiss(toastId);
         const vrsrespo = await withdrawvrs(amount,Number(vrsdetails.v),vrsdetails.r,vrsdetails.s,deadline)
         
         console.log("VRS resp ",vrsrespo)
         if(vrsrespo){
          const toastsuccess = toast.success("Unity Withdraw Success");
          toast.dismiss(toastsuccess);
         }
        }
  
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred during withdrawal.");
    } finally {
      setIsLoading(false);
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

  function convertUSDToPOL(usdAmount, ratePerPOL = 0.5) {
    // Example: 1 POL = $0.5
    const polAmount = usdAmount / ratePerPOL;
    return polAmount;
  }

    useEffect(() => {
      if (address)
        fetchData(address);
      getUserData(address);
    }, [address]);

  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div
            className="card custom-card overflow-hidden crm-card glow-box"
            style={{
              background:
                "linear-gradient(135deg, rgb(123, 47, 247), rgb(241, 7, 163))",
              minHeight: "20vh",
              padding: "20px",
              color: "#fff",
            }}
          >
            <div className="row card-body active-tab">
              <div className="col-12 col-xl-6 mb-2">
                <div className="card custom-card overflow-hidden crm-card glow-box">
                  <div className="card-body d-flex gap-2 justify-content-between">
                    <div>
                      <span className="d-block mb-1">Unity Bonus Fund</span>
                      <h6 className="mb-0 fw-semibold">$ {unityFund}</h6>
                      <p className="mb-0 fw-semibold" style={{fontSize: "14px"}}>{convertUSDToPOL(unityFund)+ " POL"}</p>
                    </div>
                    <div>
                      <span className="text-primary1">
                        {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6" style={{alignSelf: "center"}}>
                <div className="row">
                  <div className="col-6 col-xl-3">
                    <div className="card custom-card overflow-hidden crm-card glow-box">
                      <div className="card-body d-flex gap-2 justify-content-between">
                        <div>
                          <span className="d-block">Reward</span>
                        </div>
                        <div>
                          <span className="text-primary1">
                            {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xl-3">
                    <div className="card custom-card overflow-hidden crm-card glow-box">
                      <div className="card-body d-flex gap-2 justify-content-between">
                        <div>
                          <span className="d-block">$ {Number(dashboard?.userDetails?.unity_income || 0).toFixed(2)}</span>
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
                              bottom: "3px",
                              right: "3px",
                            }}
                            onClick={() => withdrawIncomeUnity()}
                          >
                            Withdraw
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-6 mb-3">
                    <div className="card custom-card overflow-hidden crm-card glow-box">
                      <div className="card-body d-flex gap-2 justify-content-between">
                        <div>
                          <span className="d-block ">Position 1st</span>
                        </div>
                        <div>
                          <span className="text-primary1">
                            {/* <img src={sponsor} alt="" style={{ width: "40px" }} /> */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-6 mb-3">
                    <div className="card custom-card overflow-hidden crm-card glow-box">
                      <div className="card-body d-flex gap-2 justify-content-between">
                        <div>
                          <span className="d-block">Unit</span>
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
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12" >
          <div
            className="card custom-card overflow-hidden crm-card glow-box"
            style={{
              background:
                "linear-gradient(135deg, rgb(123, 47, 247), rgb(241, 7, 163))",
              minHeight: "100vh",
              padding: "20px",
              color: "#fff",
            }}
          >
            {/* <div className="card-header justify-content-between">
            <div className="card-title">Rewards Data</div>
            <select
              className="form-select w-auto"
              value={reportType}
              onChange={handleReportChange}
            >
              {REPORT_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div> */}

            <div className="card-body active-tab">
              <div className="table-responsive">
                <table className="table table-bordered text-nowrap mb-0">
                  <thead className="text-white">
                    <tr>
                      {getTableHeaders().map((header, idx) => (
                        <th key={idx} className="text-white">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      renderTableRows()
                    ) : (
                      <tr>
                        <td
                          colSpan={getTableHeaders().length}
                          className="text-white"
                        >
                          No Data Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer pagination-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>Showing {data?.length || 0} Rewards</div>
                <div>
                  <button
                    className="btn btn-primary me-2"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-success"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
                <div>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBody;
