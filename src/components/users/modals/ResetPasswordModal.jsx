import { useMemo, useState } from "react";
import PasswordField from "../../auth/PasswordField";

export default function ResetPasswordModal({ show, user, onClose, onSubmit }) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s; // 0..5
  }, [pw]);

  if (!show || !user) return null;

  const validate = () => {
    if (!pw || !pw2) return "Please enter and confirm the new password.";
    if (pw !== pw2) return "Passwords do not match.";
    if (strength < 3) return "Password is too weak. Use 8+ chars incl. letters & numbers.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);

    setLoading(true);
    try {
      // Simulate API latency
      await new Promise((r) => setTimeout(r, 800));
      onSubmit(user.id, pw); // delegate up to App
      setPw(""); setPw2("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom" style={{ maxWidth: 520 }}>
        <div className="modal-header-custom">
          <h5>Reset Password</h5>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body-custom">
            <p className="text-muted mb-3">
              Set a new password for <strong>{user.fullName}</strong> ({user.email})
            </p>

            <PasswordField
              label="New Password"
              name="newPassword"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(""); }}
              autoComplete="new-password"
              placeholder="At least 8 characters"
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={pw2}
              onChange={(e) => { setPw2(e.target.value); setErr(""); }}
              autoComplete="new-password"
              placeholder="Re-enter password"
            />

            {/* Simple strength meter */}
            <div className="mb-2">
              <div className="progress" style={{ height: 6 }}>
                <div
                  className={`progress-bar ${strength <= 2 ? "bg-danger" : strength === 3 ? "bg-warning" : "bg-success"}`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
              </div>
              <small className="text-muted">
                Strength: {["Very weak","Weak","Okay","Good","Strong","Very strong"][strength]}
              </small>
            </div>

            {err && <div className="login-error mt-2">{err}</div>}
          </div>

          <div className="modal-footer-custom">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-Zentech-primary" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}