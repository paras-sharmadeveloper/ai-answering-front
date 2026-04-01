import { authLeftPanelContent } from "../config/authLeftPanelContent";
import logo from "../../assets/logo.png";

const AuthLeftPanel = ({ variant = "signup" }) => {
  const content = authLeftPanelContent[variant] || authLeftPanelContent.signup;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-[#eef8ef] sm:rounded-[24px] lg:rounded-[28px]"
      style={{
        backgroundImage: content.bgImage ? `url(${content.bgImage})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col bg-[#eef8ef]/80">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4 lg:px-8 lg:pt-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center rounded-[10px] bg-[#23b043] ">
              <img
                src={logo}
                alt="Logo"
                className="w-6 object-contain sm:w-7 lg:w-8"
              />
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em] text-black sm:text-[17px] lg:text-[18px]">
              {content.brand}
            </span>
          </div>

          <span className="text-[14px] font-medium tracking-[-0.02em] text-black sm:text-[15px] lg:text-[16px]">
            {content.year}
          </span>
        </div>

        <div className="px-4 pt-5 sm:px-6 sm:pt-4 lg:px-10 lg:pt-8 ">
          <h1 className="max-w-[620px] text-[24px] font-bold leading-[1.15] tracking-[-0.04em] text-black sm:text-[28px] lg:text-[34px] lg:pl-[60px]">
            {content.title}
          </h1>

          <p className="mt-4 max-w-[680px] text-[14px] leading-[1.6] text-[#575759] sm:text-[15px] lg:text-[16px] lg:pl-[60px]">
            {content.description}
          </p>
        </div>

        <div className="mt-9  lg:pl-[100px]">
          <div className="overflow-hidden rounded-tl-[24px] border border-[#e5e7eb] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:rounded-tl-[40px]">
            {content.previewImage ? (
              <img
                src={content.previewImage}
                alt="Preview"
                className="block w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center px-6 py-16 text-center text-sm text-[#6b7280] sm:text-base lg:text-lg">
                Preview Image
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;