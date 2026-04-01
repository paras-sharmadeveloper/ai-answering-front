const TTSComposer = ({
    text,
    setText,
    onGenerate,
    hasAudio,
    onChipClick,
    selectedVoice,
    promptChips,
}) => {
    return (
        <div className="rounded-[18px] border border-[#ececec] bg-white p-3">
            <div className="rounded-[16px] border border-[#ececec] bg-[#fdfdfd] p-4">
                <div className="flex items-start gap-2">
                    <span className="mt-1 text-[#3cc35b]">✨</span>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
                        className="min-h-[320px] w-full resize-none bg-transparent text-[13px] leading-[1.35] text-[#666] outline-none placeholder:text-[#b0b0b0] md:min-h-[420px]"
                    />
                </div>

                <div className="mt-2 flex justify-end">
                    <p className="text-[11px] text-[#8f8f8f]">
                        {text.length.toLocaleString()} / 5,000 characters
                    </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 text-[12px] text-[#7e7e7e]">
                        <span className="inline-block h-3 w-3 rounded-full border border-[#dadada]" />
                        <span>110,000 credits remaining</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="rounded-xl border border-[#e8e8e8] bg-white px-4 py-2 text-[12px] font-medium text-[#333] hover:bg-[#fafafa]">
                            ⇩ Downloads
                        </button>

                        <button
                            onClick={onGenerate}
                            className="rounded-xl bg-[#24b14a] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#1e9b40]"
                        >
                            Generate speech
                        </button>
                    </div>
                </div>
            </div>

            {!hasAudio && (
                <div className="mt-3 flex flex-wrap gap-3">
                    {promptChips.map((chip, index) => (
                        <button
                            key={index}
                            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition"
                        >
                            <img
                                src={chip.img}
                                alt=""
                                className="h-5 w-5 object-contain"
                            />
                            {chip.text}
                        </button>
                    ))}
                </div>
            )}

            {hasAudio && (
                <div className="mt-4 rounded-[18px] border border-[#ececec] bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-lime-300 via-green-500 to-lime-200 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.08)]" />
                            <div>
                                <p className="text-[13px] font-semibold text-[#1a1a1a]">
                                    {selectedVoice.name}{" "}
                                    <span className="text-[#6fc88c]">• {selectedVoice.tag}</span>
                                </p>
                                <p className="text-[10px] text-[#8d8d8d]">Paused • 00:40/00:60</p>
                            </div>
                        </div>

                        <button className="rounded-lg border border-[#ededed] px-2 py-1 text-[12px] text-[#666]">
                            ⋮
                        </button>
                    </div>

                    <div className="mt-5 flex h-[110px] items-center justify-center">
                        <div className="relative flex w-full items-end justify-center gap-[3px] overflow-hidden">
                            {Array.from({ length: 90 }).map((_, index) => {
                                const active = index < 35;
                                const h = 10 + ((index * 19) % 70);

                                return (
                                    <span
                                        key={index}
                                        className={`rounded-full ${active ? "bg-[#9ad9a7]" : "bg-[#eeeeee]"
                                            }`}
                                        style={{ width: "3px", height: `${h}px` }}
                                    />
                                );
                            })}

                            <div className="absolute left-[38%] top-1/2 h-[74px] w-[2px] -translate-y-1/2 rounded-full bg-[#2fb84d]" />
                        </div>
                    </div>

                    <div className="mt-2 text-center">
                        <p className="text-[15px] font-semibold text-[#111]">
                            00:40<span className="text-[#8f8f8f]">/00:60</span>
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-[12px] font-medium text-[#222]">Voice Generated</p>
                            <p className="text-[10px] text-[#8d8d8d]">MP3 • 2.6 MB</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="text-[12px] text-[#777]">⇄</button>
                            <button className="grid h-9 w-9 place-items-center rounded-xl bg-black text-white">
                                ❚❚
                            </button>
                            <button className="text-[12px] text-[#777]">↺</button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="rounded-lg border border-[#ececec] px-2 py-2 text-[12px] text-[#666]">
                                ⤴
                            </button>
                            <button className="rounded-lg border border-[#ececec] px-2 py-2 text-[12px] text-[#666]">
                                ⇩
                            </button>
                            <button className="rounded-lg border border-[#ececec] px-2 py-2 text-[12px] text-[#666]">
                                ˅
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TTSComposer;