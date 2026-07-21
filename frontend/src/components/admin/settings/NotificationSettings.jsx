import { useState } from "react";

const NotificationSettings = ({ initialData = {}, onSave }) => {
  const [settings, setSettings] = useState({
    emailNotifications:
      initialData.emailNotifications ?? true,

    smsNotifications:
      initialData.smsNotifications ?? false,

    pushNotifications:
      initialData.pushNotifications ?? true,

    disputeAlerts:
      initialData.disputeAlerts ?? true,

    paymentAlerts:
      initialData.paymentAlerts ?? true,
  });

  const toggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        Notification Settings
      </h2>

      <div className="space-y-5">

        {[
          ["emailNotifications", "Email Notifications"],
          ["smsNotifications", "SMS Notifications"],
          ["pushNotifications", "Push Notifications"],
          ["disputeAlerts", "Dispute Alerts"],
          ["paymentAlerts", "Payment Alerts"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center justify-between border rounded-xl p-4"
          >
            <span>{label}</span>

            <input
              type="checkbox"
              checked={settings[key]}
              onChange={() => toggle(key)}
            />
          </label>
        ))}

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => onSave(settings)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Notification Settings
        </button>

      </div>

    </div>
  );
};

export default NotificationSettings;