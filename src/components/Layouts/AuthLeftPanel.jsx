import { authLeftPanelContent } from "../components/config/authLeftPanelContent";

const AuthLeftPanel = ({ variant = "signup" }) => {
  const content = authLeftPanelContent[variant] || authLeftPanelContent.signup;

  return (
    <div className="relative hidden overflow-hidden bg-[#eef8ef] lg:flex">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: content.bgImage ? `url(${content.bgImage})` : "none",
        }}
      />

      <div className="absolute inset-0 bg-[#eef8ef]/70" />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-center justify-between px-8 pb-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#23b043] text-sm font-semibold text-white">
              V
            </div>

            <span className="text-[28px] font-semibold tracking-[-0.02em] text-black">
              {content.brand}
            </span>
          </div>

          <span className="text-[28px] font-medium tracking-[-0.02em] text-black">
            {content.year}
          </span>
        </div>

        <div className="px-12 pt-8">
          <h1 className="max-w-[620px] text-[56px] font-semibold leading-[1.06] tracking-[-0.04em] text-black">
            {content.title}
          </h1>

          <p className="mt-5 max-w-[680px] text-[22px] leading-[1.4] text-[#6b7280]">
            {content.description}
          </p>
        </div>

        <div className="relative mt-8 flex-1 overflow-hidden">
          <div className="absolute bottom-0 left-[86px] right-0 top-[100px] overflow-hidden rounded-tl-[28px] border border-[#e5e7eb] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            {content.previewImage ? (
              <img
                src={content.previewImage}
                alt="Preview"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg text-[#6b7280]">
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