import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from "../apis/finnHub"; // finnHubb component is used to actually make fetch call to the finnHub baseURL
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../context/watchListContext";

const StockList = () => {
  // state variable to set fetched response data
  const [stock, setStock] = useState([]);

  const { watchList, deleteStock } = useContext(WatchListContext);

  const navigate = useNavigate();

  // function to determine text color depending on value (neg=red, pos=green)
  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  // function to determine icon color depending on value (neg=red, pos=green)
  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

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
          console.log(stock);
        }
      } catch (err) {}
    };
    fetchData();

    return () => (isMounted = false); // this return function runs whenever a component is unmounted
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

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
              <tr
                className="table-row"
                key={stockData.symbol}
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>
                  {stockData.data.pc}{" "}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) => {
                      e.stopPropagation(); // this (stopPropogation) prevents the event from bubbling up and initiating the navigation to the stock detail page
                      deleteStock(stockData.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
