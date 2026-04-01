const TTSHistoryDetail = ({ sliders, onBackHistory }) => {
  return (
    <div className="h-full rounded-[18px] border border-[#ececec] bg-[#fbfbfb] p-3">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBackHistory}
          className="grid h-8 w-8 place-items-center rounded-xl border border-[#ececec] bg-white"
        >
          ‹
        </button>
        <p className="text-[14px] font-medium text-[#1e1e1e]">Back to history</p>
      </div>

      <div className="rounded-[16px] border border-[#ececec] bg-white p-3">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-lime-300 via-green-500 to-lime-200 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.08)]" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#222]">
              James <span className="text-[#6fc88c]">• Narrative & Story</span>
            </p>
            <p className="mt-1 text-[10px] text-[#8e8e8e]">2 minutes ago</p>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <span className="rounded-lg bg-[#f5f5f5] px-3 py-2 text-[10px] text-[#444]">
            77 credits used
          </span>
          <span className="rounded-lg bg-[#f5f5f5] px-3 py-2 text-[10px] text-[#444]">
            Vernal Multilingual v2
          </span>
        </div>

        <p className="mt-3 text-[12px] leading-[1.4] text-[#666]">
          Let’s rewind time and explore how design has transformed the world around us!
        </p>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-xl border border-[#e8e8e8] bg-white py-3 text-[12px] font-medium text-[#333]">
            ▶ Play Voice
          </button>
          <button className="flex-1 rounded-xl border border-[#e8e8e8] bg-white py-3 text-[12px] font-medium text-[#333]">
            Restore text
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[14px] font-semibold text-[#222]">Settings</p>

        <div className="mt-4 space-y-4">
          {[
            { label: "Model", value: sliders.speed, text: "Vernal Multilingual v2" },
            { label: "Stability", value: sliders.stability, text: "50%" },
            { label: "Similarity", value: sliders.similarity, text: "75%" },
            { label: "Style", value: sliders.style, text: "25%" },
            { label: "Speaker boost", value: 0, text: "0%" },
          ].map((row) => (
            <div key={row.label}>
              <p className="mb-2 text-[12px] font-semibold text-[#333]">{row.label}</p>
              <div className="h-[4px] w-full rounded-full bg-[#dedede]">
                <div
                  className="h-[4px] rounded-full bg-[#23b14a]"
                  style={{ width: `${row.value}%` }}
                />
              </div>
              <p className="mt-2 text-[10px] text-[#8d8d8d]">{row.text}</p>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full rounded-xl border border-[#ececec] bg-[#f8f8f8] py-3 text-[12px] font-medium text-[#333]">
          Restore settings
        </button>
      </div>
    </div>
  );
};

export default TTSHistoryDetail;