import React from "react";
import Patreon from "../../assets/patreon.svg";

export const Plan = () => {
  return (
    <div className="sticky top-[calc(100vh_-_48px_-_16px)] flex h-12 flex-col justify-end border-t border-zinc-800 px-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-textcolor">Free</p>
          <p className="text-stone-500">Support on Patreon</p>
        </div>
        <a
          href="https://www.patreon.com/JTMythic"
          target="_blank"
          className="rounded bg-black px-2 py-1.5 font-medium transition-colors hover:bg-stone-900"
          rel="noreferrer"
        >
          <img className="size-5" src={Patreon} alt="Patreon" />
        </a>
      </div>
    </div>
  );
};
