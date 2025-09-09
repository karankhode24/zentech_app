// src/components/user/modals/AddUserModal.jsx
import { useState } from "react";
import ImageUploader from "../../common/ImageUploader";

export default function AddUserModal({ show, onClose, onSave, availableApps }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    workdayId: "",
    title: "",
    calendarLink: "",
    userType: "Internal",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });
  const [selectedApps, setSelectedApps] = useState([]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleAppToggle = (app) => {
    setSelectedApps((prev) => {
      const exists = prev.find((a) => a.code === app.code);
      return exists
        ? prev.filter((a) => a.code !== app.code)
        : [
            ...prev,
            {
              name: app.name,
              code: app.code,
              color: app.color,
              role: "User",
              accessGranted: new Date().toLocaleDateString(),
              expiryDate: null,
            },
          ];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, selectedApps);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      username: "",
      workdayId: "",
      title: "",
      calendarLink: "",
      userType: "Internal",
      profileImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    });
    setSelectedApps([]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom" style={{ maxWidth: "800px" }}>
        <div className="modal-header-custom">
          <h5>Create New User</h5>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-custom">
            <h6 className="mb-3">Personal Information</h6>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Full Name *</label>
                <input
                  type="text" className="form-control" name="fullName"
                  value={formData.fullName} onChange={handleInputChange} required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email Address *</label>
                <input
                  type="email" className="form-control" name="email"
                  value={formData.email} onChange={handleInputChange} required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel" className="form-control" name="phone"
                  value={formData.phone} onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Username</label>
                <input
                  type="text" className="form-control" name="username"
                  value={formData.username} onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
              <ImageUploader
                value={formData.profileImage}onChange={(url) =>
                 setFormData((prev) => ({ ...prev, profileImage: url }))
             }
            />
                  </div>

              <div className="col-md-4">
                <label className="form-label">Workday ID</label>
                <input
                  type="text" className="form-control" name="workdayId"
                  value={formData.workdayId} onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Title</label>
                <input
                  type="text" className="form-control" name="title"
                  value={formData.title} onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Calendar Link</label>
              <input
                type="url" className="form-control" name="calendarLink"
                value={formData.calendarLink} onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">User Type</label>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    type="radio" id="internal-new" name="userType" value="Internal"
                    checked={formData.userType === "Internal"} onChange={handleInputChange}
                  />
                  <label htmlFor="internal-new">Internal</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio" id="external-new" name="userType" value="External"
                    checked={formData.userType === "External"} onChange={handleInputChange}
                  />
                  <label htmlFor="external-new">External</label>
                </div>
              </div>
            </div>

            <h6 className="mb-3">Application Access</h6>
            <div className="app-search-container" style={{ maxHeight: "200px" }}>
              {availableApps.slice(0, 4).map((app) => (
                <div key={app.code} className="available-app">
                  <div className="available-app-info">
                    <div className={`app-icon ${app.color}`}>{app.code}</div>
                    <div>
                      <h6 className="m-0">{app.name}</h6>
                      <small className="app-category">{app.category}</small>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedApps.some((a) => a.code === app.code)}
                    onChange={() => handleAppToggle(app)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer-custom">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-Zentech-primary">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}