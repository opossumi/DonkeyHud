import React, { useState } from "react";
import { ButtonContained, Container } from "../../components";

export const Settings = () => {
  const [autoSwitch, setAutoSwitch] = useState(false);
  const [layout, setLayout] = useState("horizontal");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = () => {
    setAutoSwitch(!autoSwitch);
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 overflow-y-auto">
      <h2 className="border-b border-border pb-2 font-bold">Settings</h2>
      <div className="container flex flex-col gap-6 overflow-y-auto">
        <div className="rounded-lg bg-background-secondary p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">File Status</h2>
          <p className="text-text-secondary">
            Check if the required files are installed:
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li className="text-text-secondary">
              File 1: <span className="text-green-500">Installed</span>
            </li>
          </ul>
          <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
            Install Files
          </button>
        </div>

        <div className="rounded-lg bg-background-secondary p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Layout</h2>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="horizontal"
              name="layout"
              value="horizontal"
              checked={layout === "horizontal"}
              onChange={handleLayoutChange}
              className="mr-2"
            />
            <label htmlFor="horizontal" className="mr-4">
              Horizontal
            </label>
            <input
              type="radio"
              id="vertical"
              name="layout"
              value="vertical"
              checked={layout === "vertical"}
              onChange={handleLayoutChange}
              className="mr-2"
            />
            <label htmlFor="vertical">Vertical</label>
          </div>
        </div>

        <div className="rounded-lg bg-background-secondary p-6 shadow-md">
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

        <div className="rounded-lg bg-background-secondary p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">HUDs Directory</h2>
          <ButtonContained onClick={() => window.electron.openHudsDirectory()}>
            Open Directory
          </ButtonContained>
        </div>

        <div className="rounded-lg bg-background-secondary p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Auto-switch Sides</h2>
          <div className="flex items-center">
            <label className="switch">
              <input
                type="checkbox"
                checked={autoSwitch}
                onChange={handleToggle}
              />
              <span className="slider round"></span>
            </label>
            <span className="ml-2">{autoSwitch ? "On" : "Off"}</span>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full justify-end gap-2 border-t border-border p-2">
        {errorMessage && (
          <p className="my-1 text-end text-red-500">{errorMessage}</p>
        )}
        <div className="mt-1 flex justify-end gap-1">
          {isSubmitting ? (
            <ButtonContained disabled>Saving...</ButtonContained>
          ) : (
            <ButtonContained>Save</ButtonContained>
          )}
          <ButtonContained color="secondary">Cancel</ButtonContained>
        </div>
      </div>
    </div>
  );
};

export default Settings;
