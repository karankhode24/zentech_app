// src/components/toast/ToastContainer.jsx
import ToastNotification from "./ToastNotification.jsx";

export default function ToastContainer({ toasts, onRemoveToast }) {
  if (!toasts?.length) return null;
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastNotification
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => onRemoveToast(t.id)}
        />
      ))}
    </div>
  );
}