const TTSShareModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/20 px-4">
      <div className="relative w-full max-w-[560px] rounded-[24px] border border-[#eaeaea] bg-gradient-to-b from-[#effcf2] to-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-[#777]"
        >
          ×
        </button>

        <div className="mx-auto mb-4 grid h-[74px] w-[74px] place-items-center rounded-[20px] border border-[#1f9a49] bg-[#0f1b16] text-3xl text-white shadow-[0_0_0_4px_rgba(34,197,94,0.1)]">
          ⤴
        </div>

        <h3 className="text-center text-[20px] font-semibold text-[#171717]">
          Share with your community
        </h3>
        <p className="mt-2 text-center text-[13px] text-[#737373]">
          Share your ideas with the people who actually care.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {["Facebook", "Twitter-X", "WhatsApp"].map((item) => (
            <button
              key={item}
              className="rounded-xl border border-[#e8e8e8] bg-white py-3 text-[12px] font-medium text-[#333]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-[12px] font-medium text-[#333]">
            Share public link
          </label>
          <div className="flex gap-2">
            <input
              value="https://vernal.io/app/share/fbiFa263783hf749bt384bf94832g3h478yr849..."
              readOnly
              className="h-11 flex-1 rounded-xl border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
            <button className="rounded-xl border border-[#dddddd] bg-white px-4 text-[12px] font-medium text-[#333]">
              ⧉ Copy
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-[12px] font-medium text-[#333]">
            Your public name
          </label>
          <div className="flex gap-2">
            <input
              defaultValue="Community User"
              className="h-11 flex-1 rounded-xl border border-[#dddddd] bg-white px-3 text-[12px] text-[#444] outline-none"
            />
            <button className="rounded-xl border border-[#dddddd] bg-white px-4 text-[12px] font-medium text-[#333]">
              💾 Save
            </button>
          </div>
          <p className="mt-1 text-[11px] text-[#8d8d8d]">
            This name will be displayed on Vernal and other platforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TTSShareModal;