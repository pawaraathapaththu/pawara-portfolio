import "./BrandLogo.css";

function BrandLogo({ size = 34 }) {
  return (
    <span className="brand-logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-monogram"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="paGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="11"
          fill="url(#paGrad)"
          fillOpacity="0.12"
          stroke="url(#paGrad)"
          strokeWidth="1.5"
        />
        <path
          d="M11 28V12H17.2C19.85 12 21.5 13.45 21.5 15.9C21.5 18.35 19.85 19.8 17.2 19.8H13.6"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.2 28L24.8 12L29.4 28M21.8 22.8H27.8"
          stroke="url(#paGrad)"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="brand-wordmark">
        Pawara<span className="brand-dot">.</span>
      </span>
    </span>
  );
}

export default BrandLogo;
