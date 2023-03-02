import { React, useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const StockList = () => {
  // create state variable used to keep track of stocks we'd like to watch (stock list)
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZ"]);

  //use useEffect to fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get(
          "/quote?symbol=MSFT&token=cfvtl5pr01qmgsjq84agcfvtl5pr01qmgsjq84b0"
        );
        console.log(response);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return <div>STOCK LIST</div>;
};

export default StockList;
