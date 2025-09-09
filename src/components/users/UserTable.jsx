// src/components/users/UserTable.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import ToggleSwitch from "../common/ToggleSwitch";

export default function UserTable({
  users,
  onUserClick,
  onToggleActive,
  onEditUser,
  onDeleteUser,
  searchTerm,
}) {
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionDropdown, setShowActionDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) clickedOutside = false;
      });
      if (clickedOutside) setShowActionDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => {
        const q = searchTerm.toLowerCase();
        return (
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.userType.toLowerCase().includes(q)
        );
      }),
    [users, searchTerm]
  );

  const sortedUsers = useMemo(() => {
    if (!sortField) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      return sortDirection === "asc"
        ? av.toString().localeCompare(bv.toString())
        : bv.toString().localeCompare(av.toString());
    });
  }, [filteredUsers, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

  const sortIconClass = (field) =>
    !sortField ? "sortable" : sortField !== field ? "sortable" : sortDirection === "asc" ? "sorted-asc" : "sorted-desc";

  return (
    <div className="user-table-container">
      <table className="table user-table">
        <thead>
          <tr>
            <th className={sortIconClass("fullName")} onClick={() => handleSort("fullName")}>User</th>
            <th className={sortIconClass("email")} onClick={() => handleSort("email")}>Email Address</th>
            <th className={sortIconClass("username")} onClick={() => handleSort("username")}>Username</th>
            <th className={sortIconClass("userType")} onClick={() => handleSort("userType")}>User Type</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={user.profileImage || "https://via.placeholder.com/32x32?text=U"}
                    alt={user.fullName}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid var(--color-border)"
                    }}
                  />
                  <span
                    className="user-name-link"
                    onClick={() => onUserClick(user)}
                  >
                    {user.fullName}
                  </span>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                {user.username}
                {user.userType === "External" && (
                  <i className="bi bi-box-arrow-up-right ms-2" title="External User" />
                )}
              </td>
              <td>
                <span className={`user-type-badge user-type-${user.userType.toLowerCase()}`}>
                  {user.userType}
                </span>
              </td>
              <td>
                <ToggleSwitch checked={user.active} onChange={onToggleActive} userId={user.id} />
              </td>
              <td>
                <div
                  className="action-dropdown"
                  ref={(el) => (dropdownRefs.current[user.id] = el)}
                >
                  <button
                    className="action-btn"
                    onClick={() =>
                      setShowActionDropdown(showActionDropdown === user.id ? null : user.id)
                    }
                  >
                    <i className="bi bi-three-dots-vertical" />
                  </button>

                  {showActionDropdown === user.id && (
                    <div
                      className="dropdown-menu-custom"
                      style={{ position: "absolute", top: "100%", right: 0, zIndex: 1000 }}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowActionDropdown(null);
                          onUserClick(user);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowActionDropdown(null);
                          onEditUser(user);
                        }}
                      >
                        Edit User
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowActionDropdown(null);
                          alert("Reset password functionality coming soon!");
                        }}
                      >
                        Reset Password
                      </button>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => {
                          setShowActionDropdown(null);
                          onDeleteUser(user);
                        }}
                      >
                        Delete User
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-wrapper">
        <div className="d-flex align-items-center">
          <span className="me-2">Show:</span>
          <select
            className="form-select show-rows-select"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value="10">10 rows</option>
            <option value="25">25 rows</option>
            <option value="50">50 rows</option>
          </select>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-3">
            {`Showing ${startIndex + 1}-${Math.min(startIndex + rowsPerPage, sortedUsers.length)} of ${sortedUsers.length}`}
          </span>

          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                      {page}
                    </button>
                  </li>
                );
              })}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}