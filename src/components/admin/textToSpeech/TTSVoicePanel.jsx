const DotAvatar = ({ accent = "green" }) => {
  const map = {
    green: "from-lime-300 via-green-500 to-lime-200",
    purple: "from-fuchsia-300 via-violet-500 to-pink-300",
    orange: "from-orange-300 via-pink-400 to-purple-300",
    emerald: "from-lime-200 via-green-300 to-emerald-100",
    sky: "from-cyan-200 via-sky-300 to-slate-100",
  };

  return (
    <div
      className={`h-10 w-10 rounded-full bg-gradient-to-br ${map[accent]} shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.08)]`}
    />
  );
};

const TTSVoicePanel = ({ selectedVoice, setSelectedVoice, voices, onBack }) => {
  return (
    <div className="h-full rounded-[18px] border border-[#ececec] bg-[#fbfbfb] p-3">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBack}
          className="grid h-8 w-8 place-items-center rounded-xl border border-[#ececec] bg-white"
        >
          ‹
        </button>
        <p className="text-[14px] font-medium text-[#1e1e1e]">Select a voice</p>
      </div>

      <div className="rounded-[14px] border border-[#ececec] bg-white p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <DotAvatar accent={selectedVoice.accent} />
            <div>
              <p className="text-[13px] font-semibold text-[#222]">
                {selectedVoice.name}{" "}
                <span className="text-[#71c88c]">• {selectedVoice.tag}</span>
              </p>
              <p className="text-[10px] text-[#8d8d8d]">{selectedVoice.desc}</p>
            </div>
          </div>
          <button className="text-[#8a8a8a]">×</button>
        </div>
      </div>

      <div className="mt-3 rounded-[12px] border border-[#ececec] bg-white px-3 py-2 text-[12px] text-[#8d8d8d]">
        🔍 Search voices...
      </div>

      <div className="mt-3 flex items-center gap-3 text-[11px] text-[#777]">
        <button className="font-semibold text-[#222]">All</button>
        <button>Voice Library</button>
        <button>Top Picks for You</button>
        <button>Default</button>
      </div>

      <div className="mt-3 space-y-3">
        {voices.map((voice) => (
          <button
            key={voice.id}
            onClick={() => setSelectedVoice(voice)}
            className="w-full rounded-[14px] border border-[#ececec] bg-white p-3 text-left transition hover:bg-[#fcfcfc]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <DotAvatar accent={voice.accent} />
                <div>
                  <p className="text-[13px] font-semibold text-[#222]">
                    {voice.name} <span className="text-[#6fc88c]">• {voice.tag}</span>
                  </p>
                  <p className="mt-1 text-[10px] text-[#8b8b8b]">{voice.desc}</p>
                </div>
              </div>
              <button className="text-[#8a8a8a]">⋮</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {voice.countries.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#ececec] bg-[#fafafa] px-2 py-1 text-[10px] text-[#666]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <button className="mt-3 w-full rounded-[12px] border border-[#ececec] bg-white py-2 text-[12px] font-medium text-[#333]">
        View All
      </button>
    </div>
  );
};

export default TTSVoicePanel;