import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useStore } from "../../hooks/useGlobalReducer.jsx"; // 👈 import global store
import "../SignUp/SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { dispatch } = useStore(); // 👈 get dispatch from global state

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    month: "1",
    day: "1",
    year: "2000",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    // ✅ Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    try {
      // ✅ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Format birthdate string
      const birthDate = `${form.year}-${form.month}-${form.day}`;

      // ✅ Save extra info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        birthDate: birthDate,
        createdAt: new Date(),
      });

      // ✅ Save to global state for profile use
      dispatch({
        type: "SET_USER",
        payload: {
          uid: user.uid,
          email: user.email,
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          birthDate,
        },
      });

      console.log("User signed up:", user.uid);
      alert("Account created successfully!");
      navigate("/"); // 🔀 redirect to  page after signup
    } catch (error) {
      console.error("Signup error:", error.message);

      let message;
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use.";
          break;
        case "auth/weak-password":
          message =
            "Password should be at least 6 characters (our rules require 8+ with symbols).";
          break;
        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;
        default:
          message = "Signup failed. Please try again.";
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2 className="sub-title">Sign up</h2>

        <div className="signup-form">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Birthdate dropdowns */}
        <div className="signup-form">
          <div className="birth-date">
            <div className="month">
              <label htmlFor="month">Month</label>
              <select name="month" id="month" value={form.month} onChange={handleChange}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="day">
              <label htmlFor="day">Day</label>
              <select name="day" id="day" value={form.day} onChange={handleChange}>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="year">
              <label htmlFor="year">Year</label>
              <select name="year" id="year" value={form.year} onChange={handleChange}>
                {Array.from({ length: 76 }, (_, i) => {
                  const year = 1950 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="signup-form">
          <label htmlFor="password">Create a password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-form">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}
