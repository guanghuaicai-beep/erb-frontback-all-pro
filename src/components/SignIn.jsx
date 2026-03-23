import { useState , useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/sign-in.css";

const SignIn = () => {
  const [method, setMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (method === "email") {
      if (!email) newErrors.email = "Please input email";
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email format incorrect";
    } else {
      if (!mobile) newErrors.mobile = "Please input mobile";
      else if (!/^\d{8}$/.test(mobile)) newErrors.mobile = "Mobile must be 8 digits";
    }

    if (!password) newErrors.password = "Please input password";
    else if (password.length < 8) newErrors.password = "Password at lease 8 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitted(true);
  setErrorMsg("");
  setSuccessMsg("");

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  setIsLoading(true);

  try {
    const payload = { 
      identifier: method === "email" ? email : mobile, password 
    };

    const res = await axios.post("http://localhost:8081/login", payload);
    signIn(res.data.token, res.data.firstname);

    // 儲存 JWT
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("firstname", res.data.firstname);

    // 後端回傳 welcome message，可以直接用
    alert(res.data.welcome || "Login Success");

    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (err) {
    let message = "Login Failed , Try Again";

    if (err.response?.data?.Error) {
      message = err.response.data.Error; // 後端回傳 Error key
    } else if (err.response?.data?.message) {
      message = err.response.data.message;
    } else if (err.message) {
      message = err.message;
    }

    alert(`❌ ${message}`);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="glass-card">
      <h2 className="form-title">📘 Sign In</h2>
      <p className="subheading">Upgrade your skills, start here.</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Login Method */}
        <div className="login-method">
          <label>
            <input
              type="radio"
              name="method"
              value="email"
              checked={method === "email"}
              onChange={() => {
                setMethod("email");
                setErrorMsg("");
                setErrors({});
              }}
            /> Email
          </label>
          <label>
            <input
              type="radio"
              name="method"
              value="mobile"
              checked={method === "mobile"}
              onChange={() => {
                setMethod("mobile");
                setErrorMsg("");
                setErrors({});
              }}
            /> Mobile
          </label>
        </div>

        {/* Email */}
        {method === "email" && (
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">✉️</span>
              <input
                type="email"
                placeholder="Email address"
                className={`form-control ${
                  submitted ? (errors.email ? "is-invalid" : "is-valid") : ""
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg("");
                }}
              />
              {submitted && (
                <span className="validation-icon">
                  {errors.email ? "❗" : "✔"}
                </span>
              )}
            </div>
            {submitted && errors.email && (
              <div className="field-error">{errors.email}</div>
            )}
          </div>
        )}

        {/* Mobile */}
        {method === "mobile" && (
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">📱</span>
              <input
                type="tel"
                placeholder="Mobile number (8 digits)"
                className={`form-control ${
                  submitted ? (errors.mobile ? "is-invalid" : "is-valid") : ""
                }`}
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setErrorMsg("");
                }}
              />
              {submitted && (
                <span className="validation-icon">
                  {errors.mobile ? "❗" : "✔"}
                </span>
              )}
            </div>
            {submitted && errors.mobile && (
              <div className="field-error">{errors.mobile}</div>
            )}
          </div>
        )}

        {/* Password */}
        <div className="form-group">
          <div className="input-group">
            <span className="input-group-text">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`form-control ${
                submitted ? (errors.password ? "is-invalid" : "is-valid") : ""
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
            />
            <span
              className="input-group-text toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </span>
            {submitted && (
              <span className="validation-icon">
                {errors.password ? "❗" : "✔"}
              </span>
            )}
          </div>
          {submitted && errors.password && (
            <div className="field-error">{errors.password}</div>
          )}
        </div>

        {/* Global Messages */}
        {errorMsg && <div className="global-error">{errorMsg}</div>}
        {successMsg && <div className="global-success">{successMsg}</div>}

        <div className="options">
          <Link to="/forget-password">Forget password?</Link>
        </div>

        <button type="submit" className="btn-signin" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="register">
          Don't have an account? <Link to="/signup">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;