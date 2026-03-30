export default function SecondaryButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[44px] w-full rounded-[10px] border border-[#d8d8d8] bg-transparent text-[16px] font-medium text-[#222222]"
    >
      {children}
    </button>
  );
}