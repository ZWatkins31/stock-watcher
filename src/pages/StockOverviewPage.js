import React from "react";
import StockList from "../components/StockList";
import AutoComplete from "../components/AutoComplete";

const StockOverviewPage = () => {
  return (
    <div>
      <h1 className="title">Stock Watcher</h1>
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverviewPage;
