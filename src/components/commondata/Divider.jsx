const Divider = ({ text }) => {
  return (
    <div className="my-8 flex items-center gap-3">
      <div className="h-px flex-1 bg-[#dddddd]" />
      <span className="text-[14px] text-[#707070]">{text}</span>
      <div className="h-px flex-1 bg-[#dddddd]" />
    </div>
  );
};

export default Divider;