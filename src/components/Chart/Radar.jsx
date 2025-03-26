import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { cutAfterDecimal } from "../web3";

const ApexChart = ({
  totalCoreIncome,
  totalGlobleIncome,
  totalFortuneIncome,
  totalAllIncome,
}) => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      totalCoreIncome,
      totalGlobleIncome,
      totalFortuneIncome,
      totalAllIncome,
    ],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: function (seriesName, opts) {
              return (
                seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              );
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Core", "Global", "Fortune", "All Income"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={[
            cutAfterDecimal(totalCoreIncome, 1),
            cutAfterDecimal(totalGlobleIncome, 1),
            cutAfterDecimal(totalFortuneIncome, 1),
            cutAfterDecimal(totalAllIncome, 1),
          ]}
          type="radialBar"
          height={390}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
