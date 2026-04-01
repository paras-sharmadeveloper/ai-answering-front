const TTSSettingsPanel = ({
  selectedVoice,
  selectedModel,
  onVoiceOpen,
  onModelOpen,
  sliders,
  setSliders,
  speakerBoost,
  setSpeakerBoost,
  onSwitchHistory,
}) => {
  const rows = [
    { key: "speed", label: "Speed", left: "Slower", right: "Faster" },
    { key: "stability", label: "Stability", left: "More variable", right: "More stable" },
    { key: "similarity", label: "Similarity", left: "Low", right: "High" },
    { key: "style", label: "Style Exaggeration", left: "None", right: "Exaggerated" },
  ];

  return (
    <div className="h-full rounded-[18px] border border-[#ececec] bg-[#fbfbfb] p-3">
      <div className="grid grid-cols-2 rounded-[12px] bg-[#f1f1f1] p-1">
        <button className="rounded-[10px] bg-white py-2 text-[12px] font-semibold text-[#222] shadow-sm">
          Settings
        </button>
        <button
          onClick={onSwitchHistory}
          className="rounded-[10px] py-2 text-[12px] text-[#777]"
        >
          History
        </button>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-[12px] font-medium text-[#222]">Voice</label>
        <button
          onClick={onVoiceOpen}
          className="flex h-[42px] w-full items-center justify-between rounded-[12px] border border-[#e7e7e7] bg-white px-3 text-left"
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-lime-300 via-green-500 to-lime-200" />
            <span className="text-[12px] text-[#333]">
              {selectedVoice.name} - {selectedVoice.tag}
            </span>
          </div>
          <span className="text-[#888]">›</span>
        </button>
      </div>

      <div className="mt-3">
        <label className="mb-2 block text-[12px] font-medium text-[#222]">Model</label>
        <button
          onClick={onModelOpen}
          className="flex h-[42px] w-full items-center justify-between rounded-[12px] border border-[#e7e7e7] bg-white px-3 text-left"
        >
          <span className="text-[12px] text-[#333]">{selectedModel.name}</span>
          <span className="text-[#888]">›</span>
        </button>
      </div>

      <div className="mt-4 rounded-[16px] border border-[#ececec] bg-white p-4">
        <p className="text-[14px] font-semibold text-[#181818]">Voice adjustment</p>

        <div className="mt-4 space-y-4">
          {rows.map((item) => (
            <div key={item.key}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#222]">{item.label}</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliders[item.key]}
                onChange={(e) =>
                  setSliders((prev) => ({
                    ...prev,
                    [item.key]: Number(e.target.value),
                  }))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#dfdfdf] accent-[#24b14a]"
              />

              <div className="mt-1 flex items-center justify-between text-[9px] text-[#9b9b9b]">
                <span>{item.left}</span>
                <span>{item.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <label className="flex items-center gap-2 text-[12px] text-[#222]">
          <button
            onClick={() => setSpeakerBoost((prev) => !prev)}
            className={`relative h-5 w-9 rounded-full transition ${
              speakerBoost ? "bg-[#22b14c]" : "bg-[#dcdcdc]"
            }`}
          >
            <span
              className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition ${
                speakerBoost ? "left-[18px]" : "left-[2px]"
              }`}
            />
          </button>
          <span>Speaker Boost</span>
        </label>

        <button className="text-[11px] text-[#444]">↻ Reset values</button>
      </div>
    </div>
  );
};

export default TTSSettingsPanel;