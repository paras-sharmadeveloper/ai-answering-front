const TTSHeader = () => {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] border border-[#ececec] bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-[13px] font-semibold text-[#161616]">
          Good morning, Tahsan ☀️
        </p>
        <p className="text-[11px] text-[#969696]">Nice to see you</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-9 items-center gap-2 rounded-xl border border-[#e9e9e9] bg-white px-3 text-[12px] text-[#888]">
          <span>🔍</span>
          <input
            placeholder="Search..."
            className="w-[120px] bg-transparent outline-none placeholder:text-[#9a9a9a]"
          />
        </div>

        <button className="grid h-9 w-9 place-items-center rounded-xl border border-[#ececec] bg-white text-[12px]">
          🔔
        </button>

        <button className="flex h-9 items-center gap-2 rounded-xl border border-[#ececec] bg-white px-3 text-[12px] font-medium text-[#111]">
          <span>💬</span>
          <span>Talk to El</span>
        </button>

        <button className="flex h-9 items-center gap-2 rounded-xl bg-black px-4 text-[12px] font-semibold text-white">
          <span>♛</span>
          <span>Upgrade</span>
        </button>
      </div>
    </div>
  );
};

export default TTSHeader;