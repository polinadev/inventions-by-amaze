import { createRoot, hydrateRoot } from "react-dom/client";
import { InventionsPage } from "../app/page";
import { TeamBuildingPage } from "../app/team-building";
import "../app/globals.css";

const pathname = window.location.pathname.replace(/\/+$/, "");
const locale = pathname.includes("/fr/") || pathname.endsWith("/fr") ? "fr" : "en";
const isTeamBuilding = pathname.endsWith("/team-building") || pathname.endsWith("/evenements-de-groupe");
const app = isTeamBuilding ? <TeamBuildingPage locale={locale} /> : <InventionsPage locale={locale} />;
const root = document.getElementById("root")!;

document.documentElement.lang = locale;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
