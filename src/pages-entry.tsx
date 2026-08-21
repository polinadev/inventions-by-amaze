import { createRoot } from "react-dom/client";
import { InventionsPage } from "../app/page";
import "../app/globals.css";

const pathname = window.location.pathname.replace(/\/+$/, "");
const locale = pathname.endsWith("/fr") ? "fr" : "en";

document.documentElement.lang = locale;

createRoot(document.getElementById("root")!).render(
  <InventionsPage locale={locale} />,
);
