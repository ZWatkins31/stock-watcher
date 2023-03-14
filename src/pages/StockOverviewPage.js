import React from "react";
import StockList from "../components/StockList";
import AutoComplete from "../components/AutoComplete";
import bull from "../assets/images/bull.png";

const StockOverviewPage = () => {
  return (
    <div>
      <h1 className="title">STOCK WATCHER</h1>
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
