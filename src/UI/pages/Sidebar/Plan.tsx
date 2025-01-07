import Patreon from "../../assets/patreon.svg";

export const Plan = () => {
  return (
    <div
      id="Plan"
      className="relative flex items-center justify-center border-t border-border bg-background2 px-2 py-4 text-xs text-text"
    >
      <button
        className="relative flex items-center justify-center gap-2 rounded bg-border px-3 py-2 transition-colors hover:bg-primary"
        onClick={() =>
          window.electron.openExternalLink("https://www.patreon.com/JTMythic")
        }
      >
        <p className="text-center font-bold">Support on Patreon</p>
        <img
          className="flex size-5 items-center justify-center"
          src={Patreon}
          alt="Patreon"
        />
      </button>
    </div>
  );
};
