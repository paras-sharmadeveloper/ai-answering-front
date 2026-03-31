import { useRef } from "react";

const OtpfieldGroup = ({ otp, setOtp }) => {
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

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-7 flex items-center justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          className="h-[54px] w-[64px] rounded-[12px] border border-[#d8d8d8] bg-[#f7f7f7] text-center text-[24px] text-[#111111] focus:border-[#23b043] focus:outline-none sm:w-[78px]"
        />
      ))}
    </div>
  );
};

export default OtpfieldGroup;