const TTSHistoryEmpty = ({ onBackSettings }) => {
  return (
    <div className="h-full rounded-[18px] border border-[#ececec] bg-[#fbfbfb] p-3">
      <div className="grid grid-cols-2 rounded-[12px] bg-[#f1f1f1] p-1">
        <button
          onClick={onBackSettings}
          className="rounded-[10px] py-2 text-[12px] text-[#777]"
        >
          Settings
        </button>
        <button className="rounded-[10px] bg-white py-2 text-[12px] font-semibold text-[#222] shadow-sm">
          History
        </button>
      </div>

      <div className="flex h-[calc(100%-52px)] flex-col items-center justify-center text-center">
        <div className="relative mb-5 h-28 w-28 rounded-full bg-gradient-to-br from-white to-[#ececec] shadow-[inset_0_10px_25px_rgba(255,255,255,0.9),0_20px_30px_rgba(0,0,0,0.06)]">
          <div className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-[#8f8f8f] text-white">
            〰
          </div>
        </div>

        <p className="text-[14px] font-medium text-[#222]">
          Your generated speech will appear here
        </p>

        <button className="mt-4 rounded-xl bg-[#23b14a] px-5 py-2 text-[12px] font-semibold text-white">
          Give me a prompt
        </button>
      </div>
    </div>
  );
};

export default TTSHistoryEmpty;