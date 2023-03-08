import Chart from "react-apexcharts";
import { React, useState } from "react";

export const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;

  const [dateType, setDateType] = useState("24h");

  // Function to swtich between date types/format (day, month, year)
  const determineTimeFormate = () => {
    switch (dateType) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormate(),
    },
  ];

  // variable used to determine the color of the graph => "last y vairable" - "first y variable"
  const color =
    determineTimeFormate()[determineTimeFormate().length - 1].y -
      determineTimeFormate()[0].y >
    0
      ? "#26c281"
      : "#ed3419";

  const renderButtonSelect = (button) => {
    const classes = "btn m-1";
    if (button === dateType) {
      return classes + " btn-primary";
    } else {
      return classes + " btn-outline-primary";
    }
  };

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      enabled: true,

      x: {
        show: true,
        format: "MMM dd HH:MM",
        formatter: undefined,
      },
    },
  };

  return (
    <>
      <div className="mt-5 p-4 shadow-sm bg-white">
        <Chart options={options} series={series} type="area" width="100%" />
        <div>
          <button
            className={renderButtonSelect("24h")}
            onClick={() => setDateType("24h")}
          >
            24h
          </button>
          <button
            className={renderButtonSelect("7d")}
            onClick={() => setDateType("7d")}
          >
            7d
          </button>
          <button
            className={renderButtonSelect("1y")}
            onClick={() => setDateType("1y")}
          >
            1y
          </button>
        </div>
      </div>
    </>
  );
};
