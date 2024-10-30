import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
  return (
    <div
      id="Search"
      className="relative flex size-full items-center justify-center gap-2 rounded bg-background px-2 py-1.5 text-sm text-textcolor lg:bg-background2"
    >
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent focus:outline-none"
      />
      {/* TODO:  Look into cmdk search bar*/}
    </div>
  );
};
