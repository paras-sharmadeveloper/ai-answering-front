export default function AuthHeading({
  title,
  subtitle,
  linkText,
  onLinkClick,
}) {
  return (
    <div className="text-center">
      <h1 className="text-[34px] font-extrabold leading-[1.15] text-black sm:text-[46px]">
        {title}
      </h1>

      {(subtitle || linkText) && (
        <p className="mt-4 text-[15px] leading-[1.35] text-[#6d6d6d] sm:text-[16px]">
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
}