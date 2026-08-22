import { renderToString } from "react-dom/server";
import { InventionsPage } from "../app/page";
import { TeamBuildingPage } from "../app/team-building";

export function renderPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  const locale = normalized.includes("/fr/") || normalized.endsWith("/fr") ? "fr" : "en";
  const isTeamBuilding = normalized.endsWith("/team-building") || normalized.endsWith("/evenements-de-groupe");
  return renderToString(isTeamBuilding ? <TeamBuildingPage locale={locale} /> : <InventionsPage locale={locale} />);
}
