const AuthHeading = ({ title, subtitle, linkText, onLinkClick }) => {
  return (
    <div className="text-center">
      <h1 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-black sm:text-[36px]">
        {title}
      </h1>

      {(subtitle || linkText) && (
        <p className="mt-4 text-[15px] leading-[1.4] text-[#6d6d6d] sm:text-[14px]">
          {subtitle}{" "}
          {linkText && (
            <button
              type="button"
              onClick={onLinkClick}
              className="font-medium text-[#23b043]"
            >
              {linkText}
            </button>
          )}
        </p>
      )}
    </div>
  );
};

export default AuthHeading;