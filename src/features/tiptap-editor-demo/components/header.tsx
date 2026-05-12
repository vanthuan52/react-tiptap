import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "light" | "dark";

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width="20" height="20" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextjsLogo() {
  return (
    <svg viewBox="0 0 180 180" fill="none" width="22" height="22">
      <mask
        id="a"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#a)">
        <circle cx="90" cy="90" r="87" fill="black" stroke="white" strokeWidth="6" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#b)"
        />
        <rect x="115" y="54" width="12" height="72" fill="url(#c)" />
      </g>
      <defs>
        <linearGradient id="b" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="c" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
      <Link to="/" className="flex items-center gap-2.5 text-zinc-900 dark:text-white no-underline">
        <NextjsLogo />
        <span className="font-semibold text-sm hidden sm:inline">Tiptap Editor</span>
      </Link>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center size-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />
          ) : (
            <div className="size-[18px]" />
          )}
        </button>

        <a
          href="https://react.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center size-9 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="View React"
        >
          <ReactIcon />
        </a>
      </div>
    </header>
  );
}
