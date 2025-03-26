import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { apiUrl } from "../Config";

const ApexChart = () => {
  const { wallet } = useSelector((state) => state.coreCrowd);
  const { walletAddress } = wallet;
  const address = walletAddress;
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "All income",
        type: "column",
        data: [],
      },
      {
        name: "Core Income",
        type: "area",
        data: [],
      },
      {
        name: "Global Income",
        type: "line",
        data: [],
      },
      {
        name: "Fortune Income",
        type: "area",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5, 4],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1, 0.25],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Deposit in $",
        },
        labels: {
          formatter: (value) => {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + "M"; // Abbreviate millions
            if (value >= 1000) return (value / 1000).toFixed(1) + "K"; // Abbreviate thousands
            return value.toFixed(0); // Show smaller values as-is
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " $";
            }
            return y;
          },
        },
      },
    },
  });

  const getChartData = async () => {
    try {
      const response = await axios.get(apiUrl + "/getchartDataIncome", {
        params: {
          address: address,
        },
      });

      if (response?.status === 200 && response.data) {
        const { AllIncome, coreIncome, globleIncome, fortuneIncome, dates } =
          response.data.data;
        const formattedDates = dates.map((date) => new Date(date).getTime());

        const updatedSeries = [
          {
            name: "All income",
            type: "column",
            data: AllIncome,
          },
          {
            name: "Core Income",
            type: "area",
            data: coreIncome,
          },
          {
            name: "Global Income",
            type: "line",
            data: globleIncome,
          },
          {
            name: "Fortune Income",
            type: "area",
            data: fortuneIncome,
          },
        ];

        setChartData((prevState) => ({
          ...prevState,
          series: updatedSeries,
          options: {
            ...prevState.options,
            labels: formattedDates,
            xaxis: {
              ...prevState.options.xaxis,
              categories: formattedDates,
            },
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
    }
  };

  useEffect(() => {
    if (address) getChartData();
  }, [address]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
