// src/components/layout/Header.jsx
import { useEffect, useRef, useState } from "react";

export default function Header({ user, onLogout, isDarkMode, onToggleTheme }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="Zentech-header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="Zentech-logo">Zentech Systems</h1>

          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <i className={`bi bi-${isDarkMode ? "sun" : "moon"}`} />
            </button>

            <div
              className="user-dropdown"
              onClick={() => setShowDropdown((s) => !s)}
              ref={dropdownRef}
            >
              <i className="bi bi-person-circle me-2" />
              {user.name}
              <i className="bi bi-chevron-down ms-2" />

              {showDropdown && (
                <div className="dropdown-menu-custom">
                  <button className="dropdown-item" onClick={onLogout}>
                    <i className="bi bi-box-arrow-right me-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
