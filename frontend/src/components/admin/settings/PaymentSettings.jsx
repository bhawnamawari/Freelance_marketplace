import { useState } from "react";

const PaymentSettings = ({ initialData = {}, onSave }) => {
  const [settings, setSettings] = useState({
    platformCommission:
      initialData.platformCommission || 10,

    escrowEnabled:
      initialData.escrowEnabled ?? true,

    payoutDelay:
      initialData.payoutDelay || 7,

    currency:
      initialData.currency || "INR",

    minimumWithdrawal:
      initialData.minimumWithdrawal || 1000,
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        Payment Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <label className="block mb-2">
            Platform Commission (%)
          </label>

          <input
            type="number"
            value={settings.platformCommission}
            onChange={(e) =>
              setSettings({
                ...settings,
                platformCommission: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div>

          <label className="block mb-2">
            Payout Delay (Days)
          </label>

          <input
            type="number"
            value={settings.payoutDelay}
            onChange={(e) =>
              setSettings({
                ...settings,
                payoutDelay: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div>

          <label className="block mb-2">
            Currency
          </label>

          <select
            value={settings.currency}
            onChange={(e) =>
              setSettings({
                ...settings,
                currency: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          >
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>

        </div>

        <div>

          <label className="block mb-2">
            Minimum Withdrawal
          </label>

          <input
            type="number"
            value={settings.minimumWithdrawal}
            onChange={(e) =>
              setSettings({
                ...settings,
                minimumWithdrawal: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

      </div>

      <div className="mt-5">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={settings.escrowEnabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                escrowEnabled: e.target.checked,
              })
            }
          />

          Enable Escrow Payments

        </label>

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => onSave(settings)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Settings
        </button>

      </div>

    </div>
  );
};

export default PaymentSettings;