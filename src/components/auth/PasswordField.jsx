import { useState } from "react";

export default function PasswordField({
  label = "Password",
  value,
  onChange,
  name = "password",
  autoComplete = "new-password",
  placeholder = "Enter password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <div className="position-relative">
        <input
          type={show ? "text" : "password"}
          className="form-control pe-5"
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="btn btn-link p-0 position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          style={{ textDecoration: "none" }}
        >
          <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`} />
        </button>
      </div>
    </div>
  );
}