import { renderToString } from "react-dom/server";
import { InventionsPage } from "../app/page";
import { TeamBuildingPage } from "../app/team-building";
import { ContentPage, type ContentMode } from "../app/content-pages";

export function renderPath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  const locale = normalized.includes("/fr/") || normalized.endsWith("/fr") ? "fr" : "en";
  const contentMode: ContentMode | null = normalized.endsWith("/cocktail-bar-old-montreal") || normalized.endsWith("/bar-a-cocktails-vieux-montreal") ? "bar" : normalized.endsWith("/menu") ? "menu" : normalized.endsWith("/escape-games") || normalized.endsWith("/jeux-evasion") ? "games" : normalized.endsWith("/faq") ? "faq" : null;
  const isPrivateEvents = normalized.endsWith("/private-events") || normalized.endsWith("/evenements-prives");
  const isTeamBuilding = normalized.endsWith("/team-building") || normalized.endsWith("/evenements-de-groupe");
  return renderToString(contentMode ? <ContentPage locale={locale} mode={contentMode} /> : isPrivateEvents ? <TeamBuildingPage locale={locale} mode="private" /> : isTeamBuilding ? <TeamBuildingPage locale={locale} mode="team" /> : <InventionsPage locale={locale} />);
}
