// src/components/users/UserList.jsx
import { useState } from "react";
import UserTable from "./UserTable";

export default function UserList({
  users,
  onUserClick,
  onToggleActive,
  onEditUser,
  onDeleteUser,
  onCreateUser,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">
          Manage all users in one place. Control access, assign roles, and monitor activity across your platform.
        </p>
      </div>

      <div className="search-actions-bar">
        <div className="search-input">
          <div className="position-relative">
            <i className="bi bi-search search-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-Zentech-primary" onClick={onCreateUser}>
          <i className="bi bi-plus me-2" />
          Add User
        </button>
      </div>

      <UserTable
        users={users}
        onUserClick={onUserClick}
        onToggleActive={onToggleActive}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
        searchTerm={searchTerm}
      />
    </div>
  );
}