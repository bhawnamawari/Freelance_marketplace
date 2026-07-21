import { useState } from "react";

const SecuritySettings = ({ initialData = {}, onSave }) => {
  const [settings, setSettings] = useState({
    twoFactorAuth: initialData.twoFactorAuth ?? true,
    sessionTimeout: initialData.sessionTimeout || 30,
    maxLoginAttempts: initialData.maxLoginAttempts || 5,
    passwordMinLength: initialData.passwordMinLength || 8,
    requireSpecialChar:
      initialData.requireSpecialChar ?? true,
  });

  const handleCheckbox = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        Security Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label>Password Minimum Length</label>

          <input
            type="number"
            value={settings.passwordMinLength}
            onChange={(e) =>
              setSettings({
                ...settings,
                passwordMinLength: Number(e.target.value),
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label>Session Timeout (Minutes)</label>

          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) =>
              setSettings({
                ...settings,
                sessionTimeout: Number(e.target.value),
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label>Maximum Login Attempts</label>

          <input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) =>
              setSettings({
                ...settings,
                maxLoginAttempts: Number(e.target.value),
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

      </div>

      <div className="space-y-4 mt-6">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={() => handleCheckbox("twoFactorAuth")}
          />
          Enable Two-Factor Authentication
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.requireSpecialChar}
            onChange={() =>
              handleCheckbox("requireSpecialChar")
            }
          />
          Require Special Characters in Password
        </label>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => onSave(settings)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Security Settings
        </button>

      </div>

    </div>
  );
};

export default SecuritySettings;