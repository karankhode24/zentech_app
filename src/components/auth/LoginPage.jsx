import { useState, useEffect } from "react";
import Particles from "../../components/common/Particles";

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("Zentech-dark-mode");
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

 
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.body.classList.add("dark-mode");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem("Zentech-dark-mode", JSON.stringify(next));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const email = credentials.email.trim();
    const password = credentials.password.trim();
    if (!email) return setError("Please enter your email address.");
    if (!password) return setError("Please enter your password.");

    setIsLoading(true);
    setTimeout(() => {
      if (email === "admin@Zentech.com" && password === "admin123") {
        onLogin(rememberMe);
      } else {
        setError("Invalid credentials. Please use admin@Zentech.com / admin123");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      <Particles className="login-particles" maxParticles={90} />
      <div className="container" style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <button
          type="button"
          className="theme-toggle"
          onClick={handleToggleTheme}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <i className={`bi bi-${isDarkMode ? "sun" : "moon"}`} />
        </button>
      </div>
      <div className="login-card">
        <div className="login-logo">
          <h1>Zentech</h1>
          <p>User Management System</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter valid admin ID"
              autoComplete="email"
            />
          </div>

          
          <div className="form-group position-relative">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter valid admin password"
              autoComplete="current-password"
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "38px",
                cursor: "pointer",
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            />
          </div>

          
          <div className="remember-forgot">
            <div className="form-check">
              <input
                type="checkbox"
                id="remember"
                className="form-check-input"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

       
          <button type="submit" className="btn btn-login" disabled={isLoading}>
            {isLoading && <span className="loading-spinner me-2" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}