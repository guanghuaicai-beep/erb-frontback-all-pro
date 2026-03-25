import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/cart.css";

const Cart = ({ setCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const BASE_URL = "https://channing-dichasial-marissa.ngrok-free.dev";

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true"
    };
  };
  // const token = localStorage.getItem("token");
  // console.log("TOKEN:", token);
  const refreshCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      return;
    }
    axios.get("https://channing-dichasial-marissa.ngrok-free.dev/cart", {
      headers: getHeaders()
    })
    .then(res => {
      console.log(res.data);
      setCartItems(res.data.items);
      // setCartCount(res.data.items.length);
      setTotal(res.data.total);
    })
    .catch(err => {
      console.error("Cart error:", err.response?.data || err.message);
    });
  };

  const addToCart = (courseId, quantity = 1) => {
    headers: getHeaders()
    if (!token) {
      alert("Please Login");
      return;
    }
    axios.post("https://channing-dichasial-marissa.ngrok-free.dev/cart/add", 
      { courseId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      refreshCart(); 
    })
    .catch(err => console.error("Add to cart error:", err.response?.data || err.message));
  };

  
  useEffect(() => {
    refreshCart();
  }, []);

  const handleIncrease = (id) => {
    const item = cartItems.find(i => i.id === id);
    axios.put(`https://channing-dichasial-marissa.ngrok-free.dev/cart/update/${id}?quantity=${item.quantity + 1}`, {}, {
      headers: getHeaders()
    })
    .then(() => refreshCart())
    .catch(err => console.error("Increase error:", err));
  };

  const handleDecrease = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item.quantity > 1) {
      axios.put(`https://channing-dichasial-marissa.ngrok-free.dev/cart/update/${id}?quantity=${item.quantity - 1}`, {}, {
        headers: getHeaders()
      })
      .then(() => refreshCart())
      .catch(err => console.error("Decrease error:", err));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleDelete = (id) => {
    axios.delete(`https://channing-dichasial-marissa.ngrok-free.dev/cart/${id}`, {
      headers: getHeaders()
    })
    .then(() => {
      refreshCart();
      alert("Course removed from cart");
    })
    .catch(err => console.error("Delete error:", err.response?.data || err.message));
  };

  const handleClearAll = () => {
    axios.delete("https://channing-dichasial-marissa.ngrok-free.dev/cart/clear", {
      headers: getHeaders()
    })
    .then(() => {
      //  console.log("Cart API 返回数据：", res.data); // 调试日志：查看返回结构
      setCartItems([]);
      setCartCount(0);
      setTotal(0);
      alert("Cart cleared!");
    })
    .catch(err => console.error("Clear error:", err));
  };

  return (
    <div className="cart-table-center">
      <div className="cart-container-table">
        <h2>🛒 My Cart</h2>
        {cartItems.length === 0 ? (
          // 清空后显示提示，同时保留容器框框
          <p className="empty-cart">Empty Cart</p>
        ) : (
        <>
        <table className="cart-table">
          <thead>
            <tr>
              <th className="cartth">Course Name</th>
              <th className="cartth">Quantity</th>
              <th className="cartth">Unit Price</th>
              <th className="cartth">Sub‑Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
            <tr key={item.id}>
              <td>
              <i 
                className="fa-solid fa-x delete-icon" 
                onClick={() => handleDelete(item.id)} 
                style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
              ></i>
              {item.courseName}
              </td>
              <td className="cartquantity">
                {item.quantity}
                <div className="quantity-actions">
                  <button className="cartuniversalbtn cartbtn-qty" onClick={() => handleIncrease(item.id)}>+</button>
                  <button className="cartuniversalbtn  cartbtn-qty" onClick={() => handleDecrease(item.id)}>−</button>
                </div>
              </td>
              <td className="cartuniprice">${item.unitPrice}</td>
              <td>${item.subTotal}</td>
            </tr>
            ))}
          </tbody>
        </table>
        <div className="cart-total">
          <h3>Total: ${total}</h3>
        </div>
        <div className="cart-actions">
          <button className="cartuniversalbtn cartbtn cartbtn-checkout" onClick={handleCheckout}>Checkout</button>
          <button className="cartuniversalbtn cartbtn cartbtn-clear" onClick={handleClearAll}>Clear All</button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Cart;