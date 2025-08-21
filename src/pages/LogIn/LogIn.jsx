import "../LogIn/LogIn.css";

export default function LogIn() {
    return (
        <div className="log-in-container">
            <h2 className="sub-title">Log In</h2>
            <div className="log-in">
                <div className="login-form">
                    <label htmlFor="log-in-email">Email</label>
                    <input id="log-in-email" type="email" />
                </div>
                <div className="login-form">
                    <label for="password-input">Password</label>
                    <input id="password-input" type="password" />
                </div>
                <button>Submit</button>
            </div>
        </div>
    )
}