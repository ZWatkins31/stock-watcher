import { React, useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  // state variable to store results from search
  const [results, setResults] = useState([]);
  const { addStock } = useContext(WatchListContext);

  const renderDropdown = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropdownClass}`}
      >
        {results.map((result) => {
          return (
            <li
              className="dropdown-item"
              key={result.symbol}
              onClick={() => {
                addStock(result.symbol);
                setSearch(""); // remove "show" class from dropdown menu, hiding dropdown after clicking on stock
              }}
            >
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto auto-complete">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "#22354b", color: "white" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)} //setSearch is updated on change
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
