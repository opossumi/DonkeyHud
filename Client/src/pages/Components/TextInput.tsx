import React from "react";

interface TextInputProps {
  label: string;
  value: string | number;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export const TextInput = ({
  label,
  value,
  required,
  onChange,
  error,
  errorMessage,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="mb-2 block font-medium text-text">
        {label}
      </label>
      <input
        type="text"
        id={label}
        placeholder={required ? `${label} *` : `${label}`}
        required={required}
        value={value}
        onChange={onChange}
        className={`h-14 w-full rounded-md border bg-background2 px-3 py-2 focus:border-0 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 placeholder:text-red-500 focus:ring-red-500"
            : "border-gray-500 placeholder:text-text-secondary focus:ring-primary"
        }`}
      />
      {error && <p className="absolute text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
