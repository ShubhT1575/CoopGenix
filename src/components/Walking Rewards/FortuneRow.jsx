import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../Config";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const REPORT_OPTIONS = [
  "Global Upline",
  "Global Downline",
  "Block Reward",
  "Direct Referral",
  "Self Team Bonus",
  "Unity Bonus",
  "Promise Reward",
  "Package Report",
  "Withdraw Report",
  "Level Report", // ✅ Added new report
];

function CoreBody() {
  const { wallet } = useSelector((state) => state.coreCrowd);
  const { walletAddress } = wallet;
  const { address } = useAccount();

  const [reportType, setReportType] = useState("Direct Referral");
  const [level, setLevel] = useState(1); // ✅ New state for level dropdown
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleReportChange = (e) => {
    setReportType(e.target.value);
    setCurrentPage(1);
  };

  const handleLevelChange = (e) => {
    setLevel(Number(e.target.value));
    setCurrentPage(1);
  };

  const getCoreIncome = async () => {
    try {
      const response = await axios.get(apiUrl + "/getAllreport", {
        params: {
          address: address,
          page: currentPage,
          type: reportType,
          ...(reportType === "Level Report" && { level }), // ✅ Pass level if Level Report
        },
      });
      if (response?.data?.status === 200) {
        setData(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        setData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (address) getCoreIncome();
  }, [address, currentPage, reportType, level]); // ✅ Added `level` dependency

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const getTableHeaders = () => {
    switch (reportType) {
      case "Promise Reward":
        return ["S.No", "Amount", "Timestamp", "Hash"];
      case "Package Report":
        return ["S.No", "Package Amount", "Timestamp", "Hash"];
      case "Global Upline":
      case "Global Downline":
        return ["S.No", "Amount", "Level", "Timestamp", "Hash"];
      case "Self Team Bonus":
        return ["S.No", "From", "Level", "Amount", "Timestamp", "Hash"];
      case "Unity Bonus":
        return ["Amount", "Unit", "Reward", "Share"];
      case "Unity Leaderboard":
        return ["Rank", "User ID", "Current Unit", "Expected Reward"];
      case "Block Reward":
        return ["S.No", "From", "Package", "Level", "Amount", "Timestamp", "Hash"];
      case "Withdraw Report":
        return ["S.No", "Amount","UsdtAmt", "PolAmt", "Timestamp"];
      case "Level Report":
        return ["S.No", "User ID", "Level", "Amount", "Timestamp", "Hash"]; // ✅ Sample header
      default:
        return ["S.No", "From", "Level", "Amount", "Timestamp", "Hash"];
    }
  };

  const renderTableRows = () => {
    return data?.map((item, index) => {
      switch (reportType) {
        case "Promise Reward":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>${(item?.amount / 1e18).toFixed(4)}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item?.txHash}</a></td>
            </tr>
          );
        case "Package Report":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>${(item?.usdAmt / 1e18).toFixed(2)}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item?.txHash}</a></td>
            </tr>
          );
        case "Global Upline":
        case "Global Downline":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>${(item?.amount / 1e18).toFixed(2)}</td>
              <td>{item?.level}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item?.txHash}</a></td>
            </tr>
          );
        case "Self Team Bonus":
        case "Direct Referral":
        case "Level Report":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>{item?.userId}</td>
              <td>{item?.level}</td>
              <td>${(item?.amount / 1e18).toFixed(2)}</td>
              <td>{new Date((item?.timestamp || item?.createdAt) * 1000).toLocaleString()}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item?.txHash}</a></td>
            </tr>
          );
        case "Block Reward":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>{item?.sender}</td>
              <td>{item?.packageId}</td>
              <td>{item?.poolId}</td>
              <td>${(item?.amount / 1e18).toFixed(2)}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item?.txHash}</a></td>
            </tr>
          );
        case "Withdraw Report":
          return (
            <tr style={{ color: "white" }} key={index}>
              <td>{index + 1}</td>
              <td>${(item?.amount / 1e18).toFixed(2)}</td>
              <td>${(item?.netUsdAmt / 1e18).toFixed(2)}</td>
              <td>${(item?.netPolAmt / 1e18).toFixed(2)}</td>
              <td>{new Date(item?.createdAt).toLocaleString()}</td>
            </tr>
          );
        default:
          return (
            <tr style={{ color: "white" }} key={item._id}>
              <td>{index + 1}</td>
              <td>{item?.userDetails?.referralId}</td>
              <td>{item.user?.slice(0, 6)}...{item.user?.slice(-6)}</td>
              <td><a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">{item.txHash}</a></td>
              <td>${item?.amount}</td>
              <td>{new Date(item?.timestamp).toLocaleString()}</td>
              <td><span className="badge bg-success-transparent">success</span></td>
            </tr>
          );
      }
    });
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card custom-card overflow-hidden crm-card glow-box">
          <div className="card-header justify-content-between">
            <div className="card-title">Rewards Data</div>
            <div className="d-flex gap-2 align-items-center">
              <select className="form-select w-auto" value={reportType} onChange={handleReportChange}>
                {REPORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {reportType === "Level Report" && (
                <select className="form-select w-auto" value={level} onChange={handleLevelChange}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => ( 
                    <option key={lvl} value={lvl}>Level {lvl}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="card-body active-tab">
            <div className="table-responsive">
              <table className="table table-bordered text-nowrap mb-0">
                <thead className="text-white">
                  <tr>{getTableHeaders().map((header, idx) => <th key={idx}>{header}</th>)}</tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? renderTableRows() : (
                    <tr>
                      <td colSpan={getTableHeaders().length} className="text-center">No Data Found.</td>
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
                <button className="btn btn-primary me-2" disabled={currentPage === 1} onClick={handlePreviousPage}>Prev</button>
                <button className="btn btn-success" disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
              </div>
              <div>Page {currentPage} of {totalPages}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoreBody;
