import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/order-history.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true"
    };
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token : " + token);
        const identifier = localStorage.getItem("identifier");
console.log("identifier : " + identifier);
        // 🔒 防呆：如果冇 token 或 identifier，直接提示用戶
        if (!token || !identifier) {
          alert("⚠️ Missing login information. Please log in again.");
          setLoading(false);
          return;
        }

        console.log("Fetching orders with identifier:", identifier);

        const res = await axios.get(
          `https://channing-dichasial-marissa.ngrok-free.dev/orders/history/${encodeURIComponent(identifier)}`,
          { headers: getHeaders() }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        alert("❌ Failed to fetch orders: " + (err.response?.data || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;

  return (
    <div className="order-history-container">
      <h1>📜 Order History</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order No</th>
              <th>Course Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order =>
              order.items.map((item, idx) => (
                <tr key={`${order.id}-${idx}`}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.orderNo}</td>
                  <td>{item.courseName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subTotal}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
