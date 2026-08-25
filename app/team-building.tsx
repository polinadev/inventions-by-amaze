/* eslint-disable @next/next/no-img-element -- self-hosted venue photography for the static build */
"use client";

import type { FormEvent } from "react";
import { BrandLockup } from "./brand-lockup";

const BASE_PATH = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const sitePath = (path = "") => `${BASE_PATH}${path.replace(/^\/+/, "")}`;
type Locale = "en" | "fr";
type EventMode = "private" | "team";

const AMAZE_URL = "https://www.amazemontreal.com";
const OFFICIAL_GROUP_URLS = { en: `${AMAZE_URL}/team-building-activity`, fr: `${AMAZE_URL}/fr/evenement-corporatif` } as const;

export function TeamBuildingPage({ locale = "en", mode = "team" }: { locale?: Locale; mode?: EventMode }) {
  const isFr = locale === "fr";
  const isPrivate = mode === "private";
  const homeUrl = sitePath(isFr ? "fr/" : "");
  const languageUrl = sitePath(isFr ? (isPrivate ? "private-events/" : "team-building/") : (isPrivate ? "fr/evenements-prives/" : "fr/evenements-de-groupe/"));

  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Inventions ${isPrivate ? "private event" : "team building"} inquiry`);
    const body = encodeURIComponent([
      `Name: ${data.get("name") || ""}`, `Email: ${data.get("email") || ""}`,
      `Preferred date: ${data.get("date") || ""}`, `Group size: ${data.get("guests") || ""}`,
      `Event: ${data.get("type") || ""}`, `Message: ${data.get("message") || ""}`,
    ].join("\n"));
    window.location.href = `mailto:escape@amazemontreal.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="team-page" lang={locale}>
      <header className="team-header">
        <a className="brand" href={homeUrl} aria-label={isFr ? "Accueil — Inventions par A Maze" : "Inventions by A Maze home"}><BrandLockup locale={locale} compact /></a>
        <nav aria-label={isFr ? "Navigation de l’événement" : "Event navigation"}><a href={homeUrl}>{isFr ? "Le bar" : "The bar"}</a><a href="#formats">{isFr ? "Formules" : "Formats"}</a><a href="#inquiry">{isFr ? "Demande" : "Inquiry"}</a></nav>
        <a className="language-link" href={languageUrl} hrefLang={isFr ? "en-CA" : "fr-CA"} lang={isFr ? "en" : "fr"}>{isFr ? "EN" : "FR"}</a>
      </header>

      <section className="team-hero">
        <div className="team-hero-copy">
          <p className="eyebrow">Inventions · {isFr ? "Vieux-Montréal" : "Old Montreal"}</p>
          <h1>{isPrivate ? (isFr ? "Privatisez le bar." : "Make the bar yours.") : (isFr ? "Team building au Vieux-Port." : "Old Port team building.")}</h1>
          <p>{isPrivate
            ? (isFr ? "Un bar à cocktails intime pour vos 5 à 7, anniversaires et célébrations. Venez pour le lieu, les cocktails et les bouchées — aucun jeu d’évasion requis." : "An intimate cocktail bar for corporate 5 à 7s, birthdays and celebrations. Come for the room, drinks and small plates—no escape game required.")
            : (isFr ? "Réunissez votre équipe autour de cocktails, d’énigmes et d’une expérience privée dans le Vieux-Montréal. Le jeu peut être central ou simplement ajouté à votre 5 à 7." : "Bring the team together over cocktails, puzzles and a private Old Montreal experience. Make the game the main event or add it to a relaxed 5 à 7.")}</p>
          <div className="hero-actions"><a className="button button-solid" href="#inquiry">{isFr ? "Vérifier la disponibilité" : "Check availability"}</a><a className="button" href="#formats">{isFr ? "Voir les formules" : "See event formats"}</a></div>
          <div className="team-facts"><span>{isFr ? "Jusqu’à 25 à l’intérieur" : "Up to 25 indoors"}</span><span>{isFr ? "Soumission personnalisée" : "Custom quote"}</span><span>{isFr ? "Jeux facultatifs" : "Games optional"}</span></div>
        </div>
        <div className="team-hero-image"><img src={sitePath("images/private-events-lounge.jpg")} alt={isFr ? "Le salon d’Inventions disponible pour les événements privés" : "The Inventions lounge available for private events"} fetchPriority="high" decoding="async" width="1800" height="1285" /></div>
      </section>

      <section className="team-intro section-shell">
        <div><p className="eyebrow">{isFr ? "Bar privé · boissons · bouchées" : "Private bar · drinks · small plates"}</p><h2>{isFr ? "Un événement qui ne ressemble pas à une salle de réunion." : "An event that does not feel like a meeting room."}</h2></div>
        <p>{isFr ? "Inventions combine l’atmosphère feutrée du Vieux-Montréal, un menu inspiré de Nikola Tesla et le savoir-faire immersif d’A\\Maze. L’espace intérieur accueille jusqu’à 25 personnes; la configuration finale et la disponibilité sont confirmées avec notre équipe." : "Inventions combines a hidden Old Montreal atmosphere, a Nikola Tesla-inspired menu and A\\Maze’s immersive-experience know-how. The indoor venue welcomes up to 25 guests; final layout and availability are confirmed with our team."}</p>
      </section>

      <section className="event-use-grid section-shell" id="formats" aria-labelledby="formats-title">
        <div className="team-packages-heading"><p className="eyebrow">{isFr ? "Choisissez votre format" : "Choose your format"}</p><h2 id="formats-title">{isPrivate ? (isFr ? "Le bar, à votre façon." : "The bar, your way.") : (isFr ? "Une équipe, plusieurs scénarios." : "One team, several ways to play.")}</h2></div>
        <div className="event-card-grid">
          <article><span>01</span><h3>{isFr ? "5 à 7 d’entreprise" : "Corporate 5 à 7"}</h3><p>{isFr ? "Privatisation, cocktails, options sans alcool et bouchées dans un cadre intime." : "Private use, cocktails, zero-proof options and small plates in an intimate setting."}</p></article>
          <article><span>02</span><h3>{isFr ? "Anniversaires et célébrations" : "Birthdays & celebrations"}</h3><p>{isFr ? "Une soirée centrée sur le bar — avec gâteau, décor ou détails à confirmer avec l’équipe." : "A bar-first evening, with cake, décor or special details confirmed with the team."}</p></article>
          <article><span>03</span><h3>{isFr ? "Jeu d’évasion en option" : "Optional escape game"}</h3><p>{isFr ? "Ajoutez une salle privée ou un coffre à énigmes avant ou après les consommations." : "Add a private room or puzzle chest before or after drinks."}</p></article>
          <article><span>04</span><h3>{isFr ? "Aventure extérieure" : "Outdoor expedition"}</h3><p>{isFr ? "Jusqu’à 30 personnes, 45 $ par personne, boisson incluse au retour." : "Up to 30 guests, $45 per person, with a drink included on return."}</p></article>
        </div>
      </section>

      <section className="event-gallery" aria-label={isFr ? "Configurations d’événement" : "Event configurations"}>
        <figure><img src={sitePath("images/private-events-bar.jpg")} alt={isFr ? "Le bar et le salon d’Inventions" : "The Inventions bar and lounge"} loading="lazy" width="1000" height="1400" /><figcaption>{isFr ? "Location du bar · devis personnalisé" : "Private bar rental · custom quote"}</figcaption></figure>
        <figure><img src={sitePath("images/private-events-game-addon.jpg")} alt={isFr ? "Un groupe autour d’un jeu à énigmes" : "A group gathered around a puzzle game"} loading="lazy" width="1600" height="973" /><figcaption>{isFr ? "Jeu facultatif · à ajouter sur demande" : "Optional game · add on request"}</figcaption></figure>
      </section>

      <section className="team-packages section-shell" aria-labelledby="packages-title">
        <div className="team-packages-heading"><p className="eyebrow">{isFr ? "Tarifs transparents là où ils sont publiés" : "Published pricing where available"}</p><h2 id="packages-title">{isFr ? "Bar sur devis. Jeux en option." : "Bar by quote. Games optional."}</h2></div>
        <div className="package-grid">
          <article className="package-card"><span>01 · {isFr ? "Privatisation" : "Private rental"}</span><h3>{isFr ? "Votre événement chez Inventions" : "Your event at Inventions"}</h3><p>{isFr ? "La soumission dépend de la date, de la durée, du nombre de personnes et des choix de nourriture et de boissons." : "Pricing depends on date, duration, guest count and food-and-drink choices."}</p><dl><div><dt>{isFr ? "Capacité intérieure" : "Indoor capacity"}</dt><dd>{isFr ? "Jusqu’à 25" : "Up to 25"}</dd></div><div><dt>{isFr ? "Boissons" : "Drinks"}</dt><dd>{isFr ? "Cocktails · vin · bière · sans alcool" : "Cocktails · wine · beer · zero proof"}</dd></div><div><dt>{isFr ? "Prix" : "Price"}</dt><dd>{isFr ? "Soumission personnalisée" : "Custom quote"}</dd></div></dl></article>
          <article className="package-card package-card-featured"><span>02 · {isFr ? "Forfait jeu intérieur" : "Indoor game package"}</span><h3>{isFr ? "Expérience privée A\\Maze" : "Private A\\Maze experience"}</h3><p>{isFr ? "Deux équipes alternent entre les jeux; les boissons au bar peuvent être ajoutées séparément." : "Two teams rotate through games; drinks at the bar can be added separately."}</p><dl><div><dt>{isFr ? "Groupe" : "Group"}</dt><dd>{isFr ? "10 joueurs" : "10 players"}</dd></div><div><dt>{isFr ? "Durée" : "Duration"}</dt><dd>{isFr ? "2,5 heures" : "2.5 hours"}</dd></div><div><dt>{isFr ? "Prix publié" : "Published price"}</dt><dd>{isFr ? "1 000 $ + taxes" : "$1,000 + tax"}</dd></div></dl></article>
        </div>
        <p className="package-note">{isFr ? "Les prix et disponibilités peuvent changer. Tous les détails doivent être confirmés avec l’équipe A\\Maze avant de finaliser l’événement." : "Pricing and availability may change. Confirm every detail with the A\\Maze team before finalizing the event."}</p>
      </section>

      <section className="event-inquiry section-shell" id="inquiry">
        <div><p className="eyebrow">{isFr ? "Demande simple" : "One simple inquiry"}</p><h2>{isFr ? "Parlez-nous de votre événement." : "Tell us about your event."}</h2><p>{isFr ? "Remplissez les essentiels; votre application courriel s’ouvrira avec une demande prête à envoyer à l’équipe." : "Add the essentials; your email app will open with a ready-to-send request to the team."}</p></div>
        <form onSubmit={sendInquiry} className="inquiry-form"><label>{isFr ? "Nom" : "Name"}<input name="name" required autoComplete="name" /></label><label>{isFr ? "Courriel" : "Email"}<input name="email" required type="email" autoComplete="email" /></label><label>{isFr ? "Date souhaitée" : "Preferred date"}<input name="date" type="date" /></label><label>{isFr ? "Nombre de personnes" : "Group size"}<input name="guests" type="number" min="2" max="30" /></label><label>{isFr ? "Type d’événement" : "Event type"}<select name="type" defaultValue=""><option value="" disabled>{isFr ? "Choisir" : "Choose"}</option><option>{isFr ? "5 à 7 d’entreprise" : "Corporate 5 à 7"}</option><option>{isFr ? "Anniversaire ou célébration" : "Birthday or celebration"}</option><option>Team building</option><option>{isFr ? "Autre" : "Other"}</option></select></label><label className="form-wide">{isFr ? "Détails" : "Details"}<textarea name="message" rows={5} placeholder={isFr ? "Horaire, nourriture, boissons, jeu facultatif…" : "Timing, food, drinks, optional game…"} /></label><button className="button button-solid form-wide" type="submit">{isFr ? "Préparer ma demande" : "Prepare my inquiry"}</button></form>
      </section>

      <section className="event-source-note section-shell"><p>{isFr ? "Les forfaits de jeu sont présentés à partir des informations officielles A\\Maze Vieux-Port." : "Game packages are presented from official A\\Maze Old Port information."}</p><a href={OFFICIAL_GROUP_URLS[locale]} target="_blank" rel="noreferrer">{isFr ? "Voir la page officielle A\\Maze" : "View the official A\\Maze page"} ↗</a></section>
      <footer className="team-footer"><a href={homeUrl}>{isFr ? "Retour à Inventions" : "Back to Inventions"} ↖</a><a href={AMAZE_URL} className="amaze-family"><span>{isFr ? "Une expérience de la famille" : "An experience from"}</span><img src={sitePath("images/amaze-official-logo.webp")} alt="A\\Maze" width="1000" height="203" /></a></footer>
    </main>
  );
}
