import { useState } from "react";

const GeneralSettings = ({ initialData = {}, onSave }) => {
  const [settings, setSettings] = useState({
    platformName: initialData.platformName || "",
    supportEmail: initialData.supportEmail || "",
    supportPhone: initialData.supportPhone || "",
    defaultLanguage: initialData.defaultLanguage || "en",
    timezone: initialData.timezone || "UTC",
  });

  const handleChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        General Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Platform Name
          </label>

          <input
            name="platformName"
            value={settings.platformName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Support Email
          </label>

          <input
            type="email"
            name="supportEmail"
            value={settings.supportEmail}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Support Phone
          </label>

          <input
            name="supportPhone"
            value={settings.supportPhone}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Default Language
          </label>

          <select
            name="defaultLanguage"
            value={settings.defaultLanguage}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Timezone
          </label>

          <input
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => onSave(settings)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
};

export default GeneralSettings;