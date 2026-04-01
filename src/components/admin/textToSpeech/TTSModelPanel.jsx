const TTSModelPanel = ({ selectedModel, setSelectedModel, models, onBack }) => {
  return (
    <div className="h-full rounded-[18px] border border-[#ececec] bg-[#fbfbfb] p-3">
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBack}
          className="grid h-8 w-8 place-items-center rounded-xl border border-[#ececec] bg-white"
        >
          ‹
        </button>
        <p className="text-[14px] font-medium text-[#1e1e1e]">Select a model</p>
      </div>

      <div className="space-y-3">
        {models.map((model) => {
          const active = selectedModel.id === model.id;

          return (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="w-full rounded-[14px] border border-[#ececec] bg-white p-3 text-left transition hover:bg-[#fcfcfc]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <span className="inline-block rounded-full border border-[#e7e7e7] bg-[#fafafa] px-2 py-1 text-[9px] text-[#555]">
                    {model.badge}
                  </span>

                  <p className="text-[13px] font-semibold text-[#222]">{model.name}</p>
                  <p className="text-[10px] text-[#8b8b8b]">{model.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {model.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ececec] bg-[#fafafa] px-2 py-1 text-[10px] text-[#666]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className={`mt-1 grid h-4 w-4 place-items-center rounded border text-[10px] ${
                    active
                      ? "border-[#23b14a] bg-[#23b14a] text-white"
                      : "border-[#d7d7d7] bg-white text-transparent"
                  }`}
                >
                  ✓
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TTSModelPanel;