import { useState } from "react";
import { ButtonContained } from "../../components";

export const Settings = () => {
  const [autoSwitch, setAutoSwitch] = useState(true);

  const handleToggle = () => {
    setAutoSwitch(!autoSwitch);
  };
  return (
    <div className="overflow-y-auto p-6">
      <h1 className="text-secondary-light">WORK IN PROGRESS</h1>
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="mb-6 rounded-lg bg-background-secondary p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">File Status</h2>
        <p className="text-text-secondary">
          Check if the required files are installed:
        </p>
        <ul className="my-2 list-inside list-disc">
          <li className="text-text-secondary">
            GSI cfg installed in game files:{" "}
            <span className="text-green-500">Installed</span>
          </li>
          <li className="text-text-secondary">
            File 2: <span className="text-red-500">Not Installed</span>
          </li>
        </ul>
        <ButtonContained>Install Files</ButtonContained>
      </div>

      <div className="mb-6 rounded-lg bg-background-secondary p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Select Language (Coming Soon)
        </h2>
        <select className="w-full rounded-lg border border-gray-300 p-2">
          <option value="en">English</option>
          <option disabled value="es">
            Spanish
          </option>
          <option disabled value="fr">
            French
          </option>
          <option disabled value="de">
            German
          </option>
        </select>
      </div>

      <div className="mb-6 rounded-lg bg-background-secondary p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">HUDs Directory</h2>
        <ButtonContained>Open Directory</ButtonContained>
      </div>

      <div className="rounded-lg bg-background-secondary p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Auto-switch Sides</h2>
        <div className="flex items-center gap-2">
          <span className="ml-2">{autoSwitch ? "On" : "Off"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoSwitch}
              onChange={handleToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
