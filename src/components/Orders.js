import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
        
        {/* Link to see orders from the backend */}
        <a href="https://zerodhabackend-lb15.onrender.com/api/orders" className="btn" target="_blank" rel="noopener noreferrer">
          See My Orders
        </a>
      </div>
    </div>
  );
};

export default Orders;
