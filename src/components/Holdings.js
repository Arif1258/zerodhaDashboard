import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get("https://zerodha-backend-woad.vercel.app/holdings"); // Update with your deployed backend URL
        setAllHoldings(response.data.data); // Adjusted to match the new response structure
      } catch (err) {
        setError("Failed to fetch holdings data");
        console.error(err);
      }
    };

    fetchHoldings();
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {error && <p className="error">{error}</p>} {/* Display error message if any */}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0).toFixed(2)} {/* Total investment */}
            <span> </span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0).toFixed(2)} {/* Current value */}
            <span> </span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {(
              allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty - stock.avg * stock.qty), 0)
            ).toFixed(2)} {/* P&L */}
            <span> (+{(
              (allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty - stock.avg * stock.qty), 0) /
              allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0) * 100
            ).toFixed(2))}%)</span>
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
