const ButtonSecondary = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[52px] w-full rounded-[12px] border border-[#d8d8d8] bg-transparent text-[16px] font-medium text-[#222222] transition hover:bg-[#f8f8f8]"
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;