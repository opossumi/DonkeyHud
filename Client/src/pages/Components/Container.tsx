import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="mx-auto box-border flex size-full flex-col overflow-x-hidden px-6 sm:px-10 md:max-w-7xl">
      {children}
    </div>
  );
};
