import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import visaIcon from "../assets/visa-card.png";
import mastercardIcon from "../assets/master-card.png";
import alipayIcon from "../assets/alipay.png";
import paymeIcon from "../assets/payme.png";
import "../css/payment.css";

  const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardParts, setCardParts] = useState(["", "", "", ""]);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [messages, setMessages] = useState({});
  const [notification, setNotification] = useState("");
  const [paymentURL, setPaymentURL] = useState("");

  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const { orderId, total = 0, cartItems = [] } = location.state || {};

  const paymentMethods = [
    { id: "VISA", name: "VISA", img: visaIcon },
    { id: "MASTERCARD", name: "MASTERCARD", img: mastercardIcon },
    { id: "ALIPAY", name: "ALIPAY", img: alipayIcon },
    { id: "PAYME", name: "PAYME", img: paymeIcon },
  ];

  // Luhn Algorithm
  const luhnCheck = (num) => {
    const arr = (num + "").split("").reverse().map((x) => parseInt(x));
    const sum = arr.reduce((acc, val, i) => {
      if (i % 2) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      return acc + val;
    }, 0);
    return sum % 10 === 0;
  };

  const validateField = (field, value) => {
    let error = "";
    let valid = "";

    if (field === "cardNumber") {
      const sanitized = value.replace(/\s|-/g, "");
      if (!sanitized) error = "Card number is required";
      else if (sanitized.length < 16) error = "Card number incomplete";
      else if (!luhnCheck(sanitized)) error = "Invalid card number";
      else valid = "Valid card number ✔";
    }

    if (field === "expiry") {
      if (!value) error = "Expiry date is required";
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value))
        error = "Expiry must be MM/YY";
      else valid = "Valid expiry ✔";
    }

    if (field === "cvv") {
      if (!value) error = "CVV is required";
      else if (!/^\d{3,4}$/.test(value))
        error = "CVV must be 3 or 4 digits";
      else valid = "Valid CVV ✔";
    }

    if (field === "cardholder") {
      if (!value.trim()) error = "Cardholder name is required";
      else valid = "Valid cardholder name ✔";
    }

    setMessages((prev) => ({
      ...prev,
      [field]: error ? { type: "error", text: error } : { type: "valid", text: valid },
    }));
  };

  const handleCardChange = (index, val) => {
    if (/^\d{0,4}$/.test(val)) {
      const newParts = [...cardParts];
      newParts[index] = val;
      setCardParts(newParts);

      const fullCard = newParts.join(" - ");
      validateField("cardNumber", fullCard);

      if (val.length === 4 && index < 3) {
        inputsRef[index + 1].current?.focus();
      }
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpiry(value);
    validateField("expiry", value);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && cardParts[index] === "" && index > 0) {
      inputsRef[index - 1].current?.focus();
    }
  };

  const handleConfirm = () => {
    const fullCard = cardParts.join(" - ");

    validateField("cardNumber", fullCard);
    validateField("expiry", expiry);
    validateField("cvv", cvv);
    validateField("cardholder", cardholder);

    // 等待 state 更新後再檢查
    setTimeout(() => {
      const allValid =
        messages.cardNumber?.type === "valid" &&
        messages.expiry?.type === "valid" &&
        messages.cvv?.type === "valid" &&
        messages.cardholder?.type === "valid";

      if (allValid) {
        setNotification("Payment validating ...");
        alert("Payment successfully!");

        const purchasedItems = (cartItems || []).map((c) => ({
          courseName: c.courseName || c.course?.name || "Unknown Course",
          quantity: c.quantity || 0,
          price: c.unitPrice || c.course?.price || 0,
          subTotal: c.subTotal || (c.course?.price || c.unitPrice || 0) * (c.quantity || 0),
        }));
        console.log("Confirming payment with:", selectedMethod);


        navigate("/order-confirmation", {
          state: {
            orderId,
            total,
            paymentMethod: method.id,
            items: purchasedItems,
          },
        });
      } else {
        setNotification("Please fix the errors in the form.");
      }
    }, 3000);
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <p>Total: HKD {total}</p>

      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method-card ${selectedMethod === method.id ? "selected" : ""}`}
            onClick={() => {
              console.log("Selected method:", method.id);
              setSelectedMethod(method.id);

              if (method.id === "ALIPAY" || method.id === "PAYME") {
                const url = `https://example.com/pay/${method.id}`;
                setPaymentURL(url);
                setNotification("Payment validating ...");

                setTimeout(() => {
                  alert("✅ Payment successful!");
                  const purchasedItems = (cartItems || []).map((c) => ({
                    courseName: c.course?.name || c.courseName || "Unknown Course",
                    quantity: c.quantity || 0,
                    price: c.course?.price || c.unitPrice || 0,
                    subTotal:
                      c.subTotal ||
                      (c.course?.price || c.unitPrice || 0) * (c.quantity || 0),
                  }));

                 navigate("/order-confirmation", {
                    state: {
                      orderId,
                      total,
                      paymentMethod: method.id,
                      items: purchasedItems
                    
                    },
                  });
                }, 3000);
              }
            }}
          >
            <img src={method.img} alt={method.name} className="method-icon" />
            <span>{method.name}</span>
            <i className={`checkmark ${selectedMethod === method.id ? "show" : ""}`}>✓</i>
          </div>
        ))}
      </div>

      {/* Credit Card Form - Visa & Mastercard */}
      {(selectedMethod === "VISA" || selectedMethod === "MASTERCARD") && (
        <div className="card-details">
          <div className="input-group">
            <label>Card Number</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              {cardParts.map((part, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    ref={(el) => (inputsRef[i].current = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={part}
                    onChange={(e) => handleCardChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    style={{ width: "70px", textAlign: "center" }}
                    placeholder="1234"
                  />
                  {i < 3 && <span style={{ margin: "0 5px" }}>-</span>}
                </div>
              ))}
            </div>
            {messages.cardNumber && (
              <span className={messages.cardNumber.type === "error" ? "error" : "valid"}>
                {messages.cardNumber.text}
              </span>
            )}
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Expiry Date (MM/YY)</label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                style={{ width: "120px", textAlign: "center" }}
              />
              {messages.expiry && (
                <span className={messages.expiry.type === "error" ? "error" : "valid"}>
                  {messages.expiry.text}
                </span>
              )}
            </div>

            <div className="input-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => {
                  setCvv(e.target.value);
                  validateField("cvv", e.target.value);
                }}
                placeholder="123"
                maxLength={4}
              />
              {messages.cvv && (
                <span className={messages.cvv.type === "error" ? "error" : "valid"}>
                  {messages.cvv.text}
                </span>
              )}
            </div>
          </div>

          <div className="input-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardholder}
              onChange={(e) => {
                setCardholder(e.target.value);
                validateField("cardholder", e.target.value);
              }}
              placeholder="JOHN DOE"
            />
            {messages.cardholder && (
              <span className={messages.cardholder.type === "error" ? "error" : "valid"}>
                {messages.cardholder.text}
              </span>
            )}
          </div>

          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm Payment
          </button>
        </div>
      )}

      {/* QR Code for Alipay / PayMe */}
      {(selectedMethod === "ALIPAY" || selectedMethod === "PAYME") && paymentURL && (
        <div className="qr-section">
          <h3>Scan to Pay</h3>
          <QRCodeCanvas value={paymentURL} size={200} />
        </div>
      )}

      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default Payment;