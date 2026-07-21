import { useState } from "react";

const SystemSettings = ({ initialData = {}, onSave }) => {
  const [settings, setSettings] = useState({
    maintenanceMode:
      initialData.maintenanceMode ?? false,

    allowRegistration:
      initialData.allowRegistration ?? true,

    maxFileSize:
      initialData.maxFileSize || 10,

    defaultCurrency:
      initialData.defaultCurrency || "INR",

    backupFrequency:
      initialData.backupFrequency || "Daily",
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        System Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label>Maximum Upload Size (MB)</label>

          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) =>
              setSettings({
                ...settings,
                maxFileSize: Number(e.target.value),
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          />

        </div>

        <div>

          <label>Default Currency</label>

          <select
            value={settings.defaultCurrency}
            onChange={(e) =>
              setSettings({
                ...settings,
                defaultCurrency: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>

        </div>

        <div>

          <label>Backup Frequency</label>

          <select
            value={settings.backupFrequency}
            onChange={(e) =>
              setSettings({
                ...settings,
                backupFrequency: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3 mt-2"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

        </div>

      </div>

      <div className="space-y-4 mt-6">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.allowRegistration}
            onChange={(e) =>
              setSettings({
                ...settings,
                allowRegistration: e.target.checked,
              })
            }
          />
          Allow New User Registration
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) =>
              setSettings({
                ...settings,
                maintenanceMode: e.target.checked,
              })
            }
          />
          Enable Maintenance Mode
        </label>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => onSave(settings)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save System Settings
        </button>

      </div>

    </div>
  );
};

export default SystemSettings;