import { useRef } from "react";

export default function OtpFieldGroup({ otp, setOtp }) {
  const refs = useRef([]);

  const handleChange = (index, value) => {
    const clean = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = clean;
    setOtp(next);

    if (clean && index < otp.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (refs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="h-[42px] w-[76px] rounded-[10px] border border-[#d8d8d8] bg-[#f7f7f7] text-center text-[26px] text-[#111111] focus:border-[#23b043] focus:outline-none sm:w-[106px]"
        />
      ))}
    </div>
  );
}