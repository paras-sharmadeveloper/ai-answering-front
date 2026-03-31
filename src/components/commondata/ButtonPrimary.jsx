const ButtonPrimary = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="h-[52px] w-full rounded-[12px] bg-[#23b043] text-[16px] font-medium text-white transition hover:bg-[#1e9a3a] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;