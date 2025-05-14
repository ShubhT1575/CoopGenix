import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../Config";
import { useSelector } from "react-redux";

const REPORT_OPTIONS = [
  "Unity Leaderboard",
];

function LeaderBody() {
  const { wallet } = useSelector((state) => state.coreCrowd);
  const { walletAddress } = wallet;
  const address = walletAddress;

  const [reportType, setReportType] = useState("Unity Leaderboard");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const renderTableRows = () => {
    return data?.map((item, index) => {
      switch (reportType) {
       
        case "Unity Leaderboard":
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.userId}</td>
              <td>{item?.currentUnit}</td>
              <td>{item?.expectedReward}</td>
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
                <a href={`https://polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noopener noreferrer">
                  {item.txHash}
                </a>
              </td>
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
        <div className="card custom-card overflow-hidden crm-card glow-box" style={{
      background: "linear-gradient(135deg, rgb(123, 47, 247), rgb(241, 7, 163))",
      minHeight: "100vh",
      padding: "20px",
      color: "#fff",
    }}>
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
                <thead>
                  <tr>
                    {getTableHeaders().map((header, idx) => (
                      <th key={idx}>{header}</th>
                    ))}
                  </tr>
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
                <span>Page {currentPage} of {totalPages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBody;
