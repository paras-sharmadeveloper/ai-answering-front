import { useState } from "react";

const UserIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
};

const MailIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
};

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon = "user",
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-[14px] font-semibold text-black">
        {label}
      </label>

      <div
        className={`flex h-[52px] items-center rounded-[12px] border bg-[#f7f7f7] px-4 ${
          focused ? "border-[#23b043]" : "border-[#d8d8d8]"
        }`}
      >
        <span className="mr-3 text-[#828282]">
          {icon === "mail" ? <MailIcon /> : <UserIcon />}
        </span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? "Typing..." : placeholder}
          className="w-full bg-transparent text-[16px] text-[#111111] placeholder:text-[#b8b8b8] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TextField;