import React from "react";

const Orders = () => {
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <a href="https://zerodhabackend-lb15.onrender.com/api/orders" className="btn">
          Get started
        </a>
      </div>
    </div>
  );
};

export default Orders;
