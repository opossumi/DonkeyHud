import React from "react";
import { MdSearch } from "react-icons/md";

export const Search = () => {
  return (
    <div
      id="Search"
      className="relative flex size-full items-center justify-center gap-2 rounded bg-background px-2 py-1.5 text-sm text-textcolor lg:bg-background2"
    >
      <MdSearch className="size-6" />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent focus:outline-none"
      />
      {/* TODO:  Look into cmdk search bar*/}
    </div>
  );
};
