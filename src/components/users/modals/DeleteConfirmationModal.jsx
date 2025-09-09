// src/components/users/modals/DeleteConfirmationModal.jsx
export default function DeleteConfirmationModal({ show, user, onClose, onConfirm }) {
  if (!show || !user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5>Delete User</h5>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body-custom">
          <p>{`Are you sure you want to delete ${user.fullName}?`}</p>
          <p className="text-muted">This action cannot be undone.</p>
        </div>

        <div className="modal-footer-custom">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              onConfirm(user.id);
              onClose();
            }}
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
}