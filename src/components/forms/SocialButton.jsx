const GoogleIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19c1.8-4.3 6-7 11.1-7 3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2c-2.1 1.6-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l.1-.1 6.2 5.2C37.1 38 44 33 44 24c0-1.2-.1-2.3-.4-3.5Z"
      />
    </svg>
  );
};

const AppleIcon = () => {
  return (
    <svg width="18" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.5c0-2.3 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.8 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.1 9.1.7 1 1.6 2.2 2.8 2.1 1.1 0 1.5-.7 2.9-.7s1.7.7 2.9.7c1.2 0 2-.9 2.7-2 .8-1.2 1.1-2.4 1.1-2.4-.1 0-3.7-1.4-3.7-5.7ZM14.4 5.6c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.9-1.3Z" />
    </svg>
  );
};

const SocialActionButton = ({ icon, text }) => {
  return (
    <button
      type="button"
      className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#f5f5f5] text-[16px] font-medium text-black transition hover:bg-[#eeeeee]"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

const SocialButton = () => {
  return (
    <div className="mt-8 space-y-3">
      <SocialActionButton icon={<GoogleIcon />} text="Continue with Google" />
      <SocialActionButton icon={<AppleIcon />} text="Continue with Apple" />
    </div>
  );
};

export default SocialButton;