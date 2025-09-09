// src/components/toast/ToastNotification.jsx
import { useEffect } from "react";

export default function ToastNotification({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`toast-notification toast-${type}`}
      onClick={() => onClose()}
      role="status"
      aria-live="polite"
    >
      <i
        className={`bi bi-${
          type === "success"
            ? "check-circle-fill"
            : type === "error"
            ? "exclamation-circle-fill"
            : "info-circle-fill"
        }`}
      />
      <span>{message}</span>
      <button
        type="button"
        className="modal-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close notification"
        style={{ marginLeft: "auto" }}
      >
        ×
      </button>
    </div>
  );
}