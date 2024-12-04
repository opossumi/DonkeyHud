import React, { useState } from "react";

interface TextInputProps {
  label: string;
  value: string | number;
  type?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export const TextInput = ({
  label,
  value,
  type,
  required,
  onChange,
  error,
  errorMessage,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="mb-4">
      <label htmlFor={label} className="mb-2 block font-medium text-text">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={label}
        placeholder={required ? `${label} *` : `${label}`}
        required={required}
        value={value}
        onFocus={() => setIsFocused(true)}
        onChange={onChange}
        className={`h-14 w-full rounded-md border bg-background2 px-3 py-2 focus:border-0 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 placeholder:text-red-500 focus:ring-red-500"
            : "border-gray-500 placeholder:text-text-secondary focus:ring-primary"
        }`}
      />
      {error && <p className="absolute text-sm text-red-500">{errorMessage}</p>}
    </div>
    // <div className="group relative m-4 max-w-[fit-content]">
    //   <input
    //     type="text"
    //     className={`peer bg-zinc-950 px-3 py-3 outline-none ${
    //       error
    //         ? "border-red-500 placeholder:text-red-500 focus:ring-red-500"
    //         : "border-gray-500 placeholder:text-text-secondary focus:ring-primary"
    //     }`}
    //     placeholder=""
    //     onChange={onChange}
    //     required={required}
    //     value={value}
    //   />

    //   <label
    //     htmlFor={label}
    //     className="pointer-events-none absolute left-[9px] top-px -translate-y-1/2 transform px-1 text-sm text-gray-500 transition-all duration-300 group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-green-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl"
    //   >
    //     {label}
    //   </label>

    //   <fieldset className="pointer-events-none invisible absolute inset-0 mt-[-9px] rounded border border-gray-400 group-focus-within:border-2 group-focus-within:!border-green-500 group-hover:border-gray-700 peer-placeholder-shown:visible">
    //     <legend className="invisible ml-2 max-w-[0.01px] whitespace-nowrap px-0 text-sm transition-all duration-300 group-focus-within:max-w-full group-focus-within:px-1">
    //       {label}
    //     </legend>
    //   </fieldset>

    //   <fieldset className="pointer-events-none visible absolute inset-0 mt-[-9px] rounded border border-gray-400 group-focus-within:border-2 group-focus-within:!border-green-500 group-hover:border-gray-700 peer-placeholder-shown:invisible">
    //     <legend className="invisible ml-2 max-w-full whitespace-nowrap px-1 text-sm">
    //       {label}
    //     </legend>
    //   </fieldset>
    //   {error && <p className="absolute text-sm text-red-500">{errorMessage}</p>}
    // </div>
  );
};
