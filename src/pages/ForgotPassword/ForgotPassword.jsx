import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../ForgotPassword/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setMessage("Password reset link sent! Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { state: { fromReset: true } });
      }, 3000);
    } catch (err) {
      console.error("Reset error:", err);

      let errorMsg;
      switch (err.code) {
        case "auth/user-not-found":
          errorMsg = "No account found with this email.";
          break;
        case "auth/invalid-email":
          errorMsg = "Please enter a valid email address.";
          break;
        default:
          errorMsg = "Failed to send reset email. Please try again.";
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <form onSubmit={handleSubmit} className="forgot-form">
        <h2 className="forgot-title">Reset Password</h2>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="forgot-email">Enter your email</label>
        <input
          type="email"
          id="forgot-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // clear error when typing
          }}
          required
        />

        <button 
            type="submit"
            disabled={loading}
            className="forgot-btn"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
