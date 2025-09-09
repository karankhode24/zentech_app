// src/components/apps/ApplicationCard.jsx
export default function ApplicationCard({ app, onRemove }) {
  return (
    <div className="app-card">
      <div className="app-info">
        <div className={`app-icon ${app.color}`}>{app.code}</div>
        <div className="app-details">
          <h6>{app.name}</h6>
          <small>Access Granted: {app.accessGranted}</small>
          <br />
          <span className="app-role-badge">{app.role}</span>
          {app.expiryDate && <small className="text-muted ms-2">Expires: {app.expiryDate}</small>}
        </div>
      </div>

      <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(app.code)}>
        Remove
      </button>
    </div>
  );
}