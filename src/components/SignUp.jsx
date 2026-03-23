import { useState , useEffect} from "react";
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";
import "../css/sign-up.css";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // auto hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 5000);  
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validate = () => {
  const newErrors = {};
  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const mobileRegex = /^\d{8}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!firstname.trim()) {
    newErrors.firstname = "Firstname is required";
  } else if (!nameRegex.test(firstname)) {
    newErrors.firstname = "Firstname must start with uppercase and contain only letters";
  }

  if (!lastname.trim()) {
    newErrors.lastname = "Lastname is required";
  } else if (!nameRegex.test(lastname)) {
    newErrors.lastname = "Lastname must start with uppercase and contain only letters";
  }

  if (!username.trim()) {
    newErrors.username = "Username is required";
  } else if (!usernameRegex.test(username)) {
    newErrors.username = "Username must be 3-20 characters, letters/numbers/underscore only";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Invalid email format";
  }

  if (!mobile.trim()) {
    newErrors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(mobile)) {
    newErrors.mobile = "Mobile must be 8 digits";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase and a number";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (confirmPassword !== password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};


  // form submission and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8081/register", {
          firstname,
          lastname,
          email,
          username,
          mobile,
          password
        });
        alert(`✅ Success: ${res.data.message}`);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (err) {
        let errorMsg = "Server not reachable";
        const errorData = err.response?.data;

        if (errorData) {
          if (typeof errorData === "string") {
            errorMsg = errorData;
          } else if (typeof errorData === "object") {
            errorMsg = Object.values(errorData).join(", ");
          }
        }

        alert(`❌ Error: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // helper render function for inputs with status icon
  const renderInput = (type, placeholder, value, setValue, errorKey, icon) => (
    <div className="mb-4">
      <div className="input-group has-validation">
        <span className="input-group-text">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          className={`form-control ${
            submitted && errors[errorKey] ? "is-invalid" : submitted ? "is-valid" : ""
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {submitted && (
          <span className="input-group-text status-icon">
            {errors[errorKey] ? (
              <i className="fas fa-exclamation-circle"></i>
            ) : (
              <i className="fas fa-check-circle"></i>
            )}
          </span>
        )}
      </div>
      {submitted && errors[errorKey] && (
        <div className="error-message">{errors[errorKey]}</div>
      )}
    </div>
  );

  return (
    <div className="glass-card p-4 p-md-5">
      <div className="logo"></div>

      <h2 className="form-title line-simple-2"> 📘 Sign Up</h2>

      <form onSubmit={handleSubmit} noValidate>
        {renderInput("text", "Firstname", firstname, setFirstname, "firstname", "👤")}
        {renderInput("text", "Lastname", lastname, setLastname, "lastname", "👤")}
        {renderInput("text", "Username", username, setUsername, "username", "👤")}
        {renderInput("email", "Email", email, setEmail, "email", "✉️")}
        {renderInput("tel", "Mobile", mobile, setMobile, "mobile", "📱")}

        {/* Password */}
        <div className="mb-4">
          <div className="input-group has-validation">
            <span className="input-group-text">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`form-control ${
                submitted && errors.password ? "is-invalid" : submitted ? "is-valid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </span>
            {submitted && (
              <span className="input-group-text status-icon">
                {errors.password ? (
                  <i className="fas fa-exclamation-circle"></i>
                ) : (
                  <i className="fas fa-check-circle"></i>
                )}
              </span>
            )}
          </div>
          {submitted && errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <div className="input-group has-validation">
            <span className="input-group-text">🔒</span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`form-control ${
                submitted && errors.confirmPassword ? "is-invalid" : submitted ? "is-valid" : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="input-group-text toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
            </span>
            {submitted && (
              <span className="input-group-text status-icon">
                {errors.confirmPassword ? (
                  <i className="fas fa-exclamation-circle"></i>
                ) : (
                  <i className="fas fa-check-circle"></i>
                )}
              </span>
            )}
          </div>
          {submitted && errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Sign Up */}
        <button type="submit" className="btn-signup">
          Sign Up
        </button>

        {/* Login link */}
        <div className="login">
          Already have an account ? <Link to="/signin">Sign In Here</Link>
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

export default SignUp;
