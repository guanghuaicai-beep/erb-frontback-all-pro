import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/reset-password.css";

const ResetPassword = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");

  const validate = () => {
    const newErrors = {};
    if (method === "email") {
      if (!email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email format";
      }
    } else if (method === "newPassword") {
      if (!newPassword) {
        newErrors.username = "New Password is required";
      } else if (password.length > 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:8081/reset_password", {
          method,
          email,
          username,
          newPassword
        });
        alert("✅ Password reset link has been sent, please check your email");
      } catch (err) {
        alert(`❌ Error: ${err.response?.data || "Server not reachable"}`);
      }
    }
  };

  return (
    <div className="glass-card p-4 p-md-5">
      <div className="logo">
        <span className="logo-icon">📘</span>
        <span>Course</span>
      </div>

      <h2 className="form-title line-simple-2">Reset Password</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Login Method */}
        <div className="login-method mb-4">
          <label>
            <input
              type="radio"
              name="method"
              value="email"
              checked={method === "email"}
              onChange={() => setMethod("email")}
            /> Email
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="method"
              value="usernme"
              checked={method === "username"}
              onChange={() => setMethod("username")}
            /> Username
          </label>
        </div>

        {/* Email */}
        {method === "email" && (
          <div id="email-group" className="mb-4 login-field">
            <div className="input-group has-validation">
              <span className="input-group-text">✉️</span>
              <input
                type="email"
                placeholder="Email address"
                className={`form-control ${
                  submitted && errors.email
                    ? "is-invalid"
                    : submitted && email && !errors.email
                    ? "is-valid"
                    : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {submitted && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
        )}

        {/* Username */}
        {method === "username" && (
          <div id="mobile-group" className="mb-4 login-field">
            <div className="input-group has-validation">
              <span className="input-group-text">📱</span>
              <input
                type="text"
                placeholder="Username"
                className={`form-control ${
                  submitted && errors.username
                    ? "is-invalid"
                    : submitted && username && !errors.username
                    ? "is-valid"
                    : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {submitted && errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
        )}

        {/* New Password */}
        <div className="mb-4">
          <div className="input-group has-validation">
            <span className="input-group-text">🔒</span>
            <input
              type={showPassword ? "text" : "newPassword"}
              placeholder="Password"
              className={`form-control ${
                submitted && errors.password ? "is-invalid" : submitted ? "is-valid" : ""
              }`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="input-group-text toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </span>
          </div>
          {submitted && errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        {/* Send Button */}
        <button type="submit" className="btn-send">
          Send
        </button>

        {/* Back to Sign In */}
        <div className="back-link">
          <Link to="/signin">← Back to Sign In</Link>
        </div>
      </form>

      {/* Notification */}
      {notification && (
        <div
          className={`notification show ${
            notification.startsWith("❌") ? "error" : ""
          }`}
        >
          {notification}
        </div>
      )}
    </div>
  );
};
export default ResetPassword;
