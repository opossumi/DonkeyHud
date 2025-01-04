import Patreon from "../../assets/patreon.svg";

export const Plan = () => {
  return (
    <div className="sticky top-[calc(100vh_-_48px_-_16px)] flex h-12 flex-col justify-end border-t border-border px-4 text-xs">
      <div className="flex items-center justify-between transition-colors">
        <a
          href="https://www.patreon.com/JTMythic"
          target="_blank"
          rel="noreferrer"
          className="text-text hover:text-gray-400 transition-colors"
        >
          <p className="text-sm font-bold">Support on Patreon</p>
          {/* <p className="text-slate-400">Support on Patreon</p> */}
        </a>
        <a
          href="https://www.patreon.com/JTMythic"
          target="_blank"
          className="rounded bg-black px-2 py-1.5 font-medium transition-colors hover:bg-primary"
          rel="noreferrer"
        >
          <img className="size-5" src={Patreon} alt="Patreon" />
        </a>
      </div>
    </div>
  );
};
