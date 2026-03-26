import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/order-confirmation.css"

function OrderConfirmation() {
  const location = useLocation();
  const [cartCount , setCartCount] = useState(0);
  const [heartCount , setHeartCount] = useState(0);
    console.log("Received state:", location.state);


  const { orderId, total, paymentMethod, items = [], status = "Paid" } = location.state || {};

  useEffect(() => {
    setCartCount(0);
    setHeartCount(0);
  }, []);

  if (!orderId) return <p>❌ Invalid order data</p>;

  return (
    <div className="order-confirmation">
      <h1>🎉 Order Confirmation</h1>
      <p>Your order <strong>#{orderId}</strong> has been successfully paid.</p>

      <h2>Order Summary</h2>
      <table className="order-summary">
        <tbody>
          <tr><td><strong>Status</strong></td><td>{status}</td></tr>
          <tr><td><strong>Payment Method</strong></td><td>{paymentMethod}</td></tr>
          <tr><td><strong>Total Amount</strong></td><td>${total}</td></tr>
        </tbody>
      </table>

      <h2>Items</h2>
      <table className="order-items">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.courseName}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.subTotal}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">No items found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderConfirmation;
