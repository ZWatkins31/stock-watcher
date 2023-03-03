import { React, useState, useEffect } from "react";
import finnHub from "../apis/finnHub"; // finnHubb component is used to actually make fetch call to the finnHub baseURL

const StockList = () => {
  // create state variable used to keep track of stocks we'd like to watch (stock list)
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  // state variable to set fetched response data
  const [stock, setStock] = useState([]);

  // use useEffect to fetch data on mount
  useEffect(() => {
    let isMounted = true;
    // define function to fetch data
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        // console.log(data);
        if (isMounted) {
          setStock(data);
          // console.log(stock);
        }
      } catch (err) {}
    };
    fetchData();

    return () => (isMounted = false); // this return function runs whenever a component is unmounted
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr className="table-row" kay={stockData.symbol}>
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td>{stockData.data.d}</td>
                <td>{stockData.data.dp}</td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
