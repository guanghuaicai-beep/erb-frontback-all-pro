import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [selectedMethod,setSelectedMethod] = useState("VISA");

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true"
    };
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      return;
    }

    const groupCartItems = (items) => {
      const grouped = {};
      items.forEach(item => {
        if (grouped[item.courseName]) {
          grouped[item.courseName].quantity += item.quantity;
          grouped[item.courseName].subTotal += item.subTotal;
        } else {
          grouped[item.courseName] = { ...item };
        }
      });
      return Object.values(grouped);
    };

    axios.get("https://channing-dichasial-marissa.ngrok-free.dev/cart", {
      headers: getHeaders()
    })
    .then(res => {
      const groupItems = groupCartItems(res.data.items);
      setCartItems(groupItems);

      const totalAmount = groupItems.reduce((sum, item) => sum + item.subTotal, 0);
      setTotal(totalAmount);
    })
    .catch(err => {
      alert("Checkout error:", err.response?.data || err.message);
    });
  }, []);

  const handleConfirmOrder = () => {
    const token = localStorage.getItem("token");
    axios.post("https://channing-dichasial-marissa.ngrok-free.dev/cart/checkout", {
      paymentMethod: selectedMethod
    }, {
      headers: getHeaders()
    })
    .then(res => {
      alert("✅ " + res.data.message);
      const orderId = res.data.orderId;
      // ✅ navigate 去 Payment 時帶埋 cartItems 同 total
      navigate("/payment", { state: { orderId, total, cartItems,selectedMethod } });
    })
    .catch(err => {
      alert("❌ Checkout failed: " + (err.response?.data?.message || err.message));
    });
  };

  // const handleConfirmOrder = () => {
  //   navigate("/payment", { state: { total } });
  // };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Sub‑Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.courseName}</td>
              <td>{item.quantity}</td>
              <td>${item.unitPrice}</td>
              <td>${item.subTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="checkout-total">
        <h3>Total: ${total}</h3>
      </div>
      <div className="checkout-actions">
        <button className="btn-confirm" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
};

export default Checkout;
