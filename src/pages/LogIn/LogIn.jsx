import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../LogIn/LogIn.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login error:", err.message);

      let message;
      switch (err.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email.";
          break;
        default:
          message = "Login failed. Please try again.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-in-container">
      <h2 className="sub-title">Log In</h2>

      {location.state?.fromReset && (
        <p className="success-message">
          Password reset link sent! Please check your email.
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="log-in">
        <div className="login-form">
          <label htmlFor="log-in-email">Email</label>
          <input
            id="log-in-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // clear error while typing
            }}
            required
          />
        </div>

        <div className="login-form">
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); // clear error while typing
            }}
            required
          />
        </div>

        <Link to="/forgot-password" className="forgot-password">
          Forgot password?
        </Link>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
