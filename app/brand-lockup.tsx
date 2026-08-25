/* eslint-disable @next/next/no-img-element -- local brand artwork is prerendered for GitHub Pages */

const BASE_PATH = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const sitePath = (path = "") => `${BASE_PATH}${path.replace(/^\/+/, "")}`;

type BrandLockupProps = {
  locale?: "en" | "fr";
  compact?: boolean;
  className?: string;
};

export function BrandLockup({ locale = "en", compact = false, className = "" }: BrandLockupProps) {
  return (
    <span className={`brand-system-lockup${compact ? " brand-system-lockup-compact" : ""}${className ? ` ${className}` : ""}`} aria-label={locale === "fr" ? "Inventions par A Maze" : "Inventions by A Maze"}>
      <span className="brand-system-art" aria-hidden="true">
        <img
          src={sitePath(compact ? "images/inventions-header-lockup.png" : "images/inventions-wordmark-lockup.png")}
          alt=""
          width={compact ? 315 : 1010}
          height={compact ? 195 : 510}
        />
      </span>
      <span className="brand-system-parent" aria-hidden="true">
        <span>{locale === "fr" ? "PAR" : "BY"}</span>
        <img src={sitePath("images/amaze-official-logo.webp")} alt="" width="1000" height="203" />
      </span>
    </span>
  );
}
