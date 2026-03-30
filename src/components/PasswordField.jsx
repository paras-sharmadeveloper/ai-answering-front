import { useState } from "react";

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.1A10.9 10.9 0 0 1 12 5c7 0 10 7 10 7a17.6 17.6 0 0 1-4 4.9" />
      <path d="M6.7 6.7A17.2 17.2 0 0 0 2 12s3 7 10 7c2 0 3.8-.5 5.3-1.3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-[14px] font-semibold text-black">
        {label}
      </label>

      <div
        className={`flex h-[42px] items-center rounded-[10px] border bg-[#f7f7f7] px-4 ${
          focused ? "border-[#23b043]" : "border-[#d8d8d8]"
        }`}
      >
        <span className="mr-3 text-[#828282]">
          <LockIcon />
        </span>

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? "Typing" : placeholder}
          className="w-full bg-transparent text-[16px] text-[#111111] placeholder:text-[#b8b8b8] focus:outline-none"
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="ml-3 text-[#888888]"
        >
          {show ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
    </div>
  );
}