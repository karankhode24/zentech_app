// src/components/users/UserDetail.jsx
import { useState } from "react";
import ApplicationCard from "../apps/ApplicationCard";
import ApplicationAssignmentModal from "../apps/ApplicationAssignmentModal";

export default function UserDetail({
  user,
  onBack,
  onEditUser,
  onAssignApp,
  onRemoveApp,
  availableApps,
  onOpenReset, // <-- add this
}) {
  const [showAppModal, setShowAppModal] = useState(false);
  if (!user) return null;

  return (
    <div className="container">
      <nav className="breadcrumb-custom">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              Users
            </a>
          </li>
          <li className="breadcrumb-item active">{user.fullName}</li>
        </ol>
      </nav>

      <div className="user-profile-header">
        <div className="d-flex align-items-center">
          <img
            src={user.profileImage}
            alt={user.fullName}
            className="profile-avatar me-4"
          />
          <div className="profile-info flex-grow-1">
            <h2>{user.fullName}</h2>
            <p className="text-muted mb-1">{user.title}</p>
            <p className="text-muted mb-2">{user.email}</p>
            <span className={user.active ? "status-active" : "status-inactive"}>
              <i className="bi bi-circle-fill me-1" />
              {user.active ? "Active" : "Inactive"}
            </span>
            <div className="mt-2">
              <small className="text-muted">Last accessed: {user.lastAccessed}</small>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-secondary" onClick={() => onEditUser(user)}>
              <i className="bi bi-pencil me-2" />
              Edit Profile
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={() => onOpenReset?.(user)} // <-- open modal passed from App
            >
              <i className="bi bi-arrow-clockwise me-2" />
              Reset Password
            </button>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h4>Personal Information</h4>
        <div className="info-row">
          <div className="info-item">
            <label>Full Name</label>
            <div className="value">{user.fullName}</div>
          </div>
          <div className="info-item">
            <label>Email Address</label>
            <div className="value">{user.email}</div>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <label>Phone Number</label>
            <div className="value">{user.phone}</div>
          </div>
          <div className="info-item">
            <label>Username</label>
            <div className="value">{user.username}</div>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <label>Workday ID</label>
            <div className="value">{user.workdayId || "N/A"}</div>
          </div>
          <div className="info-item">
            <label>Calendar Link</label>
            <div className="value">{user.calendarLink || "N/A"}</div>
          </div>
        </div>

        <div className="info-row">
          <div className="info-item">
            <label>User Type</label>
            <div className="value">
              <span className={`user-type-badge user-type-${user.userType.toLowerCase()}`}>
                {user.userType}
              </span>
            </div>
          </div>
          <div className="info-item">
            <label>Status</label>
            <div className="value">
              <span className={user.active ? "status-active" : "status-inactive"}>
                {user.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h4>
          Applications & Entitlements
          <button
            className="btn btn-Zentech-primary btn-sm ms-2"
            onClick={() => setShowAppModal(true)}
          >
            <i className="bi bi-plus me-1" />
            Grant New Access
          </button>
        </h4>

        {user.applications?.length ? (
          user.applications.map((app) => (
            <ApplicationCard
              key={app.code}
              app={app}
              onRemove={(code) => onRemoveApp(user.id, code)}
            />
          ))
        ) : (
          <p className="text-muted">No applications assigned to this user.</p>
        )}
      </div>

      <ApplicationAssignmentModal
        show={showAppModal}
        onClose={() => setShowAppModal(false)}
        user={user}
        availableApps={availableApps}
        onAssignApp={(userId, appData) => {
          onAssignApp(userId, appData);
          setShowAppModal(false);
        }}
      />
    </div>
  );
}