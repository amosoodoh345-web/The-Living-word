const PATHS = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM6 19h13',
  learn: 'M2 9l10-5 10 5-10 5-10-5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
  prayer: 'M12 3c2 3.2 4 5 4 8a4 4 0 0 1-8 0c0-1.6.8-2.6 1.6-3.6C10.4 6.4 11.3 5 12 3zM8.5 21h7M12 15v6',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6',
  bell: 'M6 16v-5a6 6 0 1 1 12 0v5l2 2H4l2-2zM10 21h4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  journal: 'M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  testimony: 'M4 5h16v11H9l-5 4V5z',
  growth: 'M12 21V10M12 10C12 6 9 4 5 4c0 4 3 6 7 6zM12 14c0-3 3-5 7-5 0 4-3 6-7 5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  download: 'M12 3v12M7 10l5 5 5-5M5 20h14',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.500-7 10-7 10z',
  check: 'M5 12.5l4.500 4.500L19 7'
};

export function Icon({ name, size = 22, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function CrossLogo({ size = 46 }) {
  return (
    <svg className="dash-logo" width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Life in the Spirit cross">
      <defs>
        <linearGradient id="lifeos-logo-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e08e" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="#101b3d" stroke="url(#lifeos-logo-gold)" strokeWidth="2" />
      <path d="M24 10v29M15 19h18" stroke="url(#lifeos-logo-gold)" strokeWidth="4.500" strokeLinecap="round" />
      <path d="M13 12l-3-3M35 12l3-3M24 6V3" stroke="#f6e08e" strokeWidth="1.600" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
