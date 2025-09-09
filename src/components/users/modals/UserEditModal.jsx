// src/components/users/modals/UserEditModal.jsx
import { useEffect, useState } from "react";
import ImageUploader from "../../common/ImageUploader";

export default function UserEditModal({ show, user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    title: "",
    userType: "Internal",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        title: user.title || "",
        userType: user.userType || "Internal",
        profileImage:
          user.profileImage ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageChange = (dataUrl) =>
    setFormData((p) => ({ ...p, profileImage: dataUrl }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // include profileImage in the payload
    onSave(user.id, formData);
  };

  if (!show || !user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5>Edit User</h5>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-custom">
            {/* Profile picture */}
            <div className="mb-4">
              <ImageUploader
                label="Profile Picture"
                value={formData.profileImage}
                onChange={handleImageChange}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">User Type</label>
              <div className="radio-group">
                <div className="radio-item">
                  <input
                    type="radio"
                    id="internal-edit"
                    name="userType"
                    value="Internal"
                    checked={formData.userType === "Internal"}
                    onChange={handleChange}
                  />
                  <label htmlFor="internal-edit">Internal</label>
                </div>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="external-edit"
                    name="userType"
                    value="External"
                    checked={formData.userType === "External"}
                    onChange={handleChange}
                  />
                  <label htmlFor="external-edit">External</label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer-custom">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-Zentech-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}