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
    <span className={`brand-system-lockup${compact ? " brand-system-lockup-compact" : ""}${className ? ` ${className}` : ""}`} role="img" aria-label={locale === "fr" ? "Inventions par A Maze" : "Inventions by A Maze"}>
      <span className="brand-system-art" aria-hidden="true">
        <img
          src={sitePath("images/inventions-primary-wordmark.webp")}
          alt=""
          width="1014"
          height="416"
        />
      </span>
      <span className="brand-system-parent" aria-hidden="true">
        <span>{locale === "fr" ? "PAR" : "BY"}</span>
        <img src={sitePath("images/amaze-official-logo.webp")} alt="" width="1000" height="203" />
      </span>
    </span>
  );
}
