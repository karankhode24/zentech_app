import { useMemo, useState } from "react";

export default function ApplicationAssignmentModal({
  show,
  onClose,
  user,
  availableApps = [],
  onAssignApp,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");

  // Always call hooks first
  const assignedCodes = useMemo(
    () => (user?.applications ?? []).map((a) => a.code),
    [user]
  );

  const candidates = useMemo(() => {
    const list = Array.isArray(availableApps) ? availableApps : [];
    const q = (searchTerm || "").trim().toLowerCase();
    return list.filter((a) => {
      const code = (a?.code || "").toString();
      const name = (a?.name || "").toString();
      const notAssigned = !assignedCodes.includes(code);
      const matches =
        q === "" ||
        name.toLowerCase().includes(q) ||
        code.toLowerCase().includes(q);
      return notAssigned && matches;
    });
  }, [availableApps, assignedCodes, searchTerm]);

  const handleAssign = (app) => {
    if (!user) return;
    const appData = {
      name: app?.name || app?.code || "Unknown",
      code: app?.code,
      color: app?.color || "indigo",
      role: selectedRole,
      accessGranted: new Date().toLocaleDateString(),
      expiryDate: null,
    };
    onAssignApp(user.id, appData);
    onClose?.();
  };

  if (!show || !user) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="m-0">Grant New Access</h5>
          <button className="modal-close-btn" aria-label="Close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body-custom">
          
          <div className="text-muted mb-2" style={{fontSize:"12px"}}>
            Available: {availableApps?.length ?? 0} • Already assigned: {assignedCodes.length} • Candidates: {candidates.length}
          </div>

          <div className="mb-3">
            <label className="form-label">Search Applications</label>
            <div className="search-input">
              <div className="position-relative">
                <i className="bi bi-search search-icon" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or code…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="app-search-container" style={{ maxHeight: 360 }}>
            {(!availableApps || availableApps.length === 0) ? (
              <p className="text-muted text-center m-0 py-3">
                No application catalog provided.
              </p>
            ) : candidates.length === 0 ? (
              <p className="text-muted text-center m-0 py-3">
                {searchTerm
                  ? "No applications match your search."
                  : "All available applications are already assigned to this user."}
              </p>
            ) : (
              candidates.map((app) => {
                const code = app?.code || "—";
                const name = app?.name || code;
                return (
                  <div key={code} className="available-app">
                    <div className="available-app-info">
                      <div className={`app-icon ${app?.color || "indigo"}`}>{code}</div>
                      <div style={{color:"var(--color-text)"}}>
                        <h6 className="m-0">{name}</h6>
                        
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-Zentech-primary btn-sm"
                      onClick={() => handleAssign(app)}
                    >
                      Add
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="modal-footer-custom">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}