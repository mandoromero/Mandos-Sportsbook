import { useState } from "react";
import { auth } from "../../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../SignUp/SignUp.css";

export default function SignUp() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "" // ✅ fixed key name
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password // ✅ fixed typo
            );
            console.log("User signed up:", userCredential.user);
            alert("Account created successfully!");
        } catch (error) {
            console.error("Signup error:", error.message);
            alert(error.message);
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
                        onChange={handleChange} // ✅ added
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
                    />
                </div>

                {/* Birthdate dropdowns (optional, not stored in Firebase Auth directly) */}
                <div className="signup-form">
                    <div className="birth-date">
                        <div className="month">
                            <label htmlFor="month">Month</label>
                            <select name="month" id="month">
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
                            <select name="day" id="day">
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="year">
                            <label htmlFor="year">Year</label>
                            <select name="year" id="year">
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
                    />
                </div>

                <button className="submit-btn" type="submit">Sign up</button>
            </form>
        </div>
    );
}
