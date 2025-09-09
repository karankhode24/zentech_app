// src/components/layout/Navigation.jsx
export default function Navigation({ activeTab, onTabChange }) {
  return (
    <div className="container">
      <ul className="nav nav-tabs nav-tabs-custom">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => onTabChange("users")}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "roles" ? "active" : ""}`}
            onClick={() => onTabChange("roles")}
          >
            Roles
          </button>
        </li>
      </ul>
    </div>
  );
}