import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const StockDetailPage = () => {
  const { symbol } = useParams();

  const [chartData, setChartData] = useState();

  const formateData = (data) => {
    return data.t.map((element, index) => {
      const roundedNum = data.c[index].toFixed(2);
      return {
        x: element * 1000, // this is the timestamp
        y: roundedNum,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date(); //current date
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;

      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }

      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "D",
            },
          }),
        ]);
        console.log(responses);

        setChartData({
          day: formateData(responses[0].data),
          week: formateData(responses[1].data),
          year: formateData(responses[2].data),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {/*if chart data exists, then render StockChart component */}
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};

export default StockDetailPage;

/*
// How data should be organized:

const chartData = {
  day: "data for one day"
  week: "data for one week"
  year: "data for one year"
}

// Data should be an array of objects
const data = [
  {x: "data", y: "data"},
  {x: "data", y: "data"},
  {x: "data", y: "data"},
  ...
]

*/
