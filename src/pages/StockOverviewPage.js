import React from "react";
import StockList from "../components/StockList";
import AutoComplete from "../components/AutoComplete";
import bull from "../assets/images/bull.png";

const StockOverviewPage = () => {
  return (
    <div>
      <h1 className="title">Stock Watcher</h1>
      <img className="hero-image hide-bg" src={bull} />
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
