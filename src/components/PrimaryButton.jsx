export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-[44px] w-full rounded-[10px] bg-[#23b043] text-[16px] font-medium text-white disabled:opacity-70"
    >
      {children}
    </button>
  );
}