import { createRoot, hydrateRoot } from "react-dom/client";
import { InventionsPage } from "../app/page";
import { TeamBuildingPage } from "../app/team-building";
import { ContentPage, type ContentMode } from "../app/content-pages";
import "../app/globals.css";

const pathname = window.location.pathname.replace(/\/+$/, "");
const locale = pathname.includes("/fr/") || pathname.endsWith("/fr") ? "fr" : "en";
const contentMode: ContentMode | null = pathname.endsWith("/cocktail-bar-old-montreal") || pathname.endsWith("/bar-a-cocktails-vieux-montreal") ? "bar" : pathname.endsWith("/menu") ? "menu" : pathname.endsWith("/escape-games") || pathname.endsWith("/jeux-evasion") ? "games" : pathname.endsWith("/faq") ? "faq" : null;
const isPrivateEvents = pathname.endsWith("/private-events") || pathname.endsWith("/evenements-prives");
const isTeamBuilding = pathname.endsWith("/team-building") || pathname.endsWith("/evenements-de-groupe");
const app = contentMode ? <ContentPage locale={locale} mode={contentMode} /> : isPrivateEvents ? <TeamBuildingPage locale={locale} mode="private" /> : isTeamBuilding ? <TeamBuildingPage locale={locale} mode="team" /> : <InventionsPage locale={locale} />;
const root = document.getElementById("root")!;

document.documentElement.lang = locale;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
