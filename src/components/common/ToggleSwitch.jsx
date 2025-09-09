// src/components/common/ToggleSwitch.jsx
export default function ToggleSwitch({ checked, onChange, userId }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(userId, e.target.checked)}
      />
      <span className="toggle-slider" />
    </label>
  );
}