const BASE_PATH = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const sitePath = (path = "") => `${BASE_PATH}${path.replace(/^\/+/, "")}`;

type Locale = "en" | "fr";

const AMAZE_URL = "https://www.amazemontreal.com";
const OFFICIAL_GROUP_URLS = {
  en: `${AMAZE_URL}/team-building-activity`,
  fr: `${AMAZE_URL}/fr/evenement-corporatif`,
} as const;

export function TeamBuildingPage({ locale = "en" }: { locale?: Locale }) {
  const isFr = locale === "fr";
  const homeUrl = sitePath(isFr ? "fr/" : "");
  const languageUrl = sitePath(isFr ? "team-building/" : "fr/evenements-de-groupe/");

  return (
    <main className="team-page" lang={locale}>
      <header className="team-header">
        <a className="brand" href={homeUrl} aria-label={isFr ? "Accueil — Inventions par A\\Maze" : "Inventions by A\\Maze home"}>
          <img className="brand-lockup" src={sitePath(isFr ? "images/inventions-header-lockup-fr-transparent.webp" : "images/inventions-header-lockup.png")} alt="" width="315" height="195" />
        </a>
        <nav aria-label={isFr ? "Navigation de l’événement" : "Event navigation"}>
          <a href={homeUrl}>{isFr ? "Le bar et les jeux" : "The bar & games"}</a>
          <a href="#packages">{isFr ? "Forfaits" : "Packages"}</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="language-link" href={languageUrl} hrefLang={isFr ? "en-CA" : "fr-CA"} lang={isFr ? "en" : "fr"}>{isFr ? "EN" : "FR"}</a>
      </header>

      <section className="team-hero">
        <div className="team-hero-copy">
          <p className="eyebrow">A\Maze {isFr ? "Vieux-Port · Événements privés" : "Old Port · Private events"}</p>
          <h1>{isFr ? "Rassemblez l’équipe." : "Bring the team."}<br /><em>{isFr ? "Activez le courant." : "Switch on the current."}</em></h1>
          <p>{isFr
            ? "Des jeux d’évasion privés, des défis collaboratifs et un verre chez Inventions, le bar inspiré de Nikola Tesla au cœur d’A\\Maze Vieux-Port."
            : "Private escape games, collaborative challenges and a drink at Inventions—the Nikola Tesla-inspired bar inside A\\Maze Old Port."}</p>
          <div className="hero-actions">
            <a className="button button-solid" href="mailto:escape@amazemontreal.com?subject=A%5CMaze%20Old%20Port%20group%20event">{isFr ? "Planifier l’événement" : "Plan the event"}</a>
            <a className="button" href={OFFICIAL_GROUP_URLS[locale]}>{isFr ? "Voir les détails A\\Maze" : "See A\\Maze details"}</a>
          </div>
          <div className="team-facts"><span>{isFr ? "Jusqu’à 30 personnes" : "Up to 30 guests"}</span><span>{isFr ? "Jeux privés" : "Private games"}</span><span>{isFr ? "Cocktails sur place" : "Cocktails on site"}</span></div>
        </div>
        <div className="team-hero-image"><img src={sitePath("images/groups-current.webp")} alt={isFr ? "Une équipe partage des cocktails chez Inventions" : "A team sharing cocktails at Inventions"} fetchPriority="high" decoding="async" width="1200" height="780" /></div>
      </section>

      <section className="team-intro section-shell">
        <div><p className="eyebrow">{isFr ? "Pourquoi le Vieux-Port" : "Why Old Port"}</p><h2>{isFr ? "Une sortie d’équipe, sans formule beige." : "A team outing without the beige formula."}</h2></div>
        <p>{isFr
          ? "A\\Maze Vieux-Port réunit des énigmes immersives, les rues historiques du Vieux-Montréal et l’atmosphère intime d’Inventions. L’espace intérieur accueille jusqu’à 25 personnes; l’expérience extérieure permet de réunir jusqu’à 30 participants."
          : "A\\Maze Old Port combines immersive puzzles, the historic streets of Old Montréal and the intimate atmosphere of Inventions. The indoor venue accommodates up to 25 guests, while the outdoor experience can bring together as many as 30 participants."}</p>
      </section>

      <section className="team-packages section-shell" id="packages" aria-labelledby="packages-title">
        <div className="team-packages-heading"><p className="eyebrow">{isFr ? "Forfaits actuels" : "Current packages"}</p><h2 id="packages-title">{isFr ? "Choisissez votre expérience." : "Choose your experiment."}</h2></div>
        <div className="package-grid">
          <article className="package-card">
            <span>01 · {isFr ? "À l’intérieur" : "Indoors"}</span>
            <h3>{isFr ? "Expérience privée Inventions" : "Private Inventions experience"}</h3>
            <p>{isFr ? "Deux équipes alternent entre les jeux dans l’atmosphère privée du bar." : "Two teams rotate through games in the private atmosphere of the bar."}</p>
            <dl>
              <div><dt>{isFr ? "Groupe" : "Group"}</dt><dd>{isFr ? "10 joueurs" : "10 players"}</dd></div>
              <div><dt>{isFr ? "Durée" : "Duration"}</dt><dd>{isFr ? "2,5 heures" : "2.5 hours"}</dd></div>
              <div><dt>{isFr ? "Format" : "Format"}</dt><dd>{isFr ? "2 équipes · 2 jeux/heure" : "2 teams · 2 games/hour"}</dd></div>
              <div><dt>{isFr ? "Prix" : "Price"}</dt><dd>{isFr ? "1 000 $ + taxes" : "$1,000 + tax"}</dd></div>
            </dl>
          </article>
          <article className="package-card package-card-featured">
            <span>02 · {isFr ? "Vieux-Montréal" : "Old Montréal"}</span>
            <h3>{isFr ? "Expédition extérieure + verre" : "Outdoor expedition + drink"}</h3>
            <p>{isFr ? "Le secret d’un empire maritime en équipes, puis un cocktail signature, un verre de vin ou une bière artisanale au retour." : "Secrets of a Shipping Empire in teams, followed by a signature cocktail, glass of wine or craft beer on your return."}</p>
            <dl>
              <div><dt>{isFr ? "Groupe" : "Group"}</dt><dd>{isFr ? "Jusqu’à 30" : "Up to 30"}</dd></div>
              <div><dt>{isFr ? "Durée" : "Duration"}</dt><dd>{isFr ? "2,5 h de jeu · 3,5 h au total" : "2.5 h game · 3.5 h total"}</dd></div>
              <div><dt>{isFr ? "Format" : "Format"}</dt><dd>{isFr ? "6 équipes max. · 5 joueurs" : "6 teams max · 5 players"}</dd></div>
              <div><dt>{isFr ? "Prix" : "Price"}</dt><dd>{isFr ? "45 $ par personne" : "$45 per person"}</dd></div>
            </dl>
          </article>
        </div>
        <p className="package-note">{isFr ? "Les forfaits et disponibilités peuvent changer. Confirmez les détails avec l’équipe A\\Maze avant de finaliser votre événement." : "Packages and availability may change. Confirm details with the A\\Maze team before finalizing your event."}</p>
      </section>

      <section className="team-story">
        <div className="team-story-image"><img src={sitePath("images/game-shipping-current.webp")} alt={isFr ? "Une équipe explore le Vieux-Montréal pendant le jeu extérieur" : "A team exploring Old Montréal during the outdoor game"} loading="lazy" decoding="async" width="1000" height="667" /></div>
        <div className="team-story-copy"><p className="eyebrow">{isFr ? "Jeu · stratégie · célébration" : "Play · strategy · celebration"}</p><h2>{isFr ? "Le défi finit au bar." : "The challenge ends at the bar."}</h2><p>{isFr ? "Les équipes reviennent chez Inventions pour comparer leurs théories, célébrer leur résultat et choisir leur prochain courant." : "Teams return to Inventions to compare theories, celebrate the result and choose their next current."}</p></div>
      </section>

      <section className="team-contact section-shell" id="contact">
        <div><p className="eyebrow">{isFr ? "Organisons quelque chose" : "Let’s organize something"}</p><h2>{isFr ? "Parlez-nous de votre équipe." : "Tell us about your team."}</h2></div>
        <div><p>{isFr ? "Indiquez la date souhaitée, le nombre de personnes et le type d’expérience. L’équipe A\\Maze vous aidera à choisir la meilleure formule." : "Share your preferred date, group size and type of experience. The A\\Maze team will help choose the right format."}</p><a className="button button-solid" href="mailto:escape@amazemontreal.com?subject=A%5CMaze%20Old%20Port%20group%20event">escape@amazemontreal.com</a><a className="text-link" href="tel:+15145042139">+1 514 504 2139</a></div>
      </section>

      <footer className="team-footer">
        <a href={homeUrl}>{isFr ? "Retour à Inventions" : "Back to Inventions"} ↖</a>
        <a href={AMAZE_URL} className="amaze-family"><span>{isFr ? "Un membre de la famille" : "Part of the family"}</span><img src={sitePath("images/amaze-official-logo.webp")} alt="A\\Maze" width="1000" height="203" /></a>
      </footer>
    </main>
  );
}
