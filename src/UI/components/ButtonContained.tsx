import React from "react";

interface ButtonContainedProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

export const ButtonContained = ({
  children,
  color,
  ...rest
}: ButtonContainedProps) => {
  const bgColor = color
    ? `bg-${color} hover:bg-${color}-dark`
    : "bg-primary hover:bg-primary-dark";
  return (
    <button
      {...rest}
      className={`${bgColor} flex items-center justify-center rounded px-5 py-1.5 text-sm font-semibold uppercase text-text drop-shadow-md transition-colors`}
    >
      {children}
    </button>
  );
};
