import { useRef, useState } from "react";

export default function ImageUploader({
  label = "Profile Picture",
  value,                
  onChange,              
  maxSizeMB = 3,
  accept = "image/png, image/jpeg, image/jpg, image/webp",
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    setError("");
    if (!file) return;
    if (!accept.split(",").some(t => file.type.includes(t.trim().replace("image/", "")))) {
      setError("Please upload a PNG, JPG, or WEBP image.");
      return;
    }
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`Image must be ≤ ${maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => onChange?.(e.target.result); 
    reader.readAsDataURL(file);
  };

  const onInput = (e) => handleFile(e.target.files?.[0]);

  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      <div className="d-flex align-items-center gap-3">
        <img
          src={value || "https://via.placeholder.com/80x80?text=Avatar"}
          alt="Preview"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid var(--color-border)",
          }}
        />
        <div className="d-flex gap-2">
          {/* Upload button - is will be alwaysb white when ill change it dark */}
          <button
            type="button"
            className="btn btn-upload"
            onClick={() => inputRef.current?.click()}
          >
            <i className="bi bi-upload me-2" />
            Upload
          </button>

          {/* Remove button - default styling */}
          {value && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onChange("")}
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onInput}
        className="d-none"
      />

      {error && <div className="login-error mt-2">{error}</div>}
      <small className="text-muted d-block mt-1">
        PNG, JPG, or WEBP • up to {maxSizeMB}MB
      </small>
    </div>
  );
}