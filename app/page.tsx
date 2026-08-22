/* eslint-disable @next/next/no-img-element -- all imagery is self-hosted for the offline/LAN build */
"use client";

import { useEffect, useRef, useState } from "react";

const AMAZE_URL = "https://www.amazemontreal.com";
const BOOKING_URLS = {
  en: `${AMAZE_URL}/old-port-escape-room-restaurant`,
  fr: `${AMAZE_URL}/fr/jeu-devasion-et-restaurant-vieux-port`,
} as const;
const MAPS_URL =
  "https://www.google.com/maps/place/A%5CMaze:+Escape+Game+Old+Port/@45.5027813,-73.5603544,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc91b14b4dabe19:0x895ec0f0dc0294de!8m2!3d45.5027776!4d-73.5577795!16s%2Fg%2F11fst7nf7c";
const BASE_PATH = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const sitePath = (path = "") => `${BASE_PATH}${path.replace(/^\/+/, "")}`;

type MenuItem = { name: string; price: string; description?: string; label?: string };
type Locale = "en" | "fr";
type CocktailItem = MenuItem & {
  id: string;
  number: string;
  story: string;
  image: string;
};

const cocktails: CocktailItem[] = [
  { id: "science-experiment", number: "01", name: "The Science Experiment", price: "$16", description: "Mezcal · Aperol · lime · soda · absinthe", story: "Tesla’s laboratory was part theatre, part storm: coils hummed, glass glowed and every experiment waited for a final spark. This bright, aromatic invention invites that same sense of discovery, finishing with a restrained current of absinthe.", image: sitePath("images/cocktails/science-experiment.webp") },
  { id: "oscillator", number: "02", name: "Oscillator", price: "$16", description: "Canadian rye · chocolate liqueur · butterscotch · Chartreuse · chocolate bitters · chili", story: "Tesla’s mechanical oscillator translated invisible frequency into physical motion. Here, Canadian rye carries the pulse, chocolate and butterscotch provide the low hum, and Chartreuse with chili sends one final vibration through the glass.", image: sitePath("images/cocktails/oscillator.webp") },
  { id: "teslas-carre", number: "03", name: "Tesla’s Carré", price: "$17", description: "Rye · Grand Marnier · sweet vermouth · Bénédictine · smoked dome", story: "A Montréal what-if: the drink Tesla might have met in a hidden 1920s bar. Inspired by the Vieux Carré, it is strong, layered and precise, then revealed from beneath a smoked dome like an idea emerging from the dark.", image: sitePath("images/cocktails/teslas-carre.webp") },
  { id: "radioactive-sour", number: "04", name: "Radioactive Sour", price: "$16", description: "White rum · Midori · lemon · simple syrup · foamer", story: "An imagined laboratory glow captured in a glass. Midori supplies the electric-green charge, rum the hidden current and lemon the sharp voltage, all lifted beneath a soft, luminous cap of foam.", image: sitePath("images/cocktails/radioactive-sour.webp") },
  { id: "wardenclyff", number: "05", name: "Wardenclyff", price: "$16", description: "Calvados · Amaro Montenegro or Nonino · red vermouth · Angostura · smoke bubble", story: "Wardenclyffe Tower was Tesla’s boldest attempt to transmit energy without wires. Calvados gives this tribute its earth, vermouth its structure and Montenegro a nod to Tesla’s roots—an unfinished dream suspended beneath a bubble of smoke.", image: sitePath("images/cocktails/wardenclyff.webp") },
  { id: "alternating-current", number: "06", name: "Alternating Current", price: "$15", description: "Tanqueray · Grand Marnier · cardamom bitters · sparkling water · lemon · dried orange · butterfly-pea tea", story: "Alternating current transformed the modern world. Gin and orange ride a stream of sparkling energy while butterfly-pea tea shifts the colour before your eyes: a small tableside echo of Tesla’s world-changing system.", image: sitePath("images/cocktails/alternating-current.webp") },
  { id: "fire-conductor", number: "07", name: "Fire Conductor", price: "$15", description: "Fireball or Crown Royal Apple · lime · maple syrup · ginger beer", story: "Tesla became famous for commanding spectacular electrical discharges. This copper-cold conductor channels that energy through cinnamon or apple warmth, maple, lime and a sharp ginger spark—controlled chaos with the current still flowing.", image: sitePath("images/cocktails/fire-conductor.webp") },
  { id: "seasonal", number: "08", name: "Cocktail of the Season", price: "$17", description: "Ask your bartender for the current invention", label: "Seasonal", story: "No laboratory stops at one successful experiment. This rotating creation gives the bar team room to test a new ingredient, technique or idea, then serve the most promising result while it is in season.", image: sitePath("images/cocktails/seasonal.webp") },
];

const zeroProof: MenuItem[] = [
  { name: "Winnie le Pop", price: "$8", description: "Habanero lemonade · water · honey · lime" },
  { name: "Soft Drinks", price: "$4", description: "Cola · Diet · Lemon-Lime · Orange · Canada Dry" },
  { name: "Red Bull", price: "$5.50", description: "Energy drink", label: "16+" },
  { name: "Mikkeller", price: "$8", description: "Non-alcoholic beer", label: "0%" },
  { name: "Ginger Beer", price: "$5", description: "Spicy · bright · bubbly" },
  { name: "Grapefruit Juice", price: "$5", description: "Fresh · tart · citrus" },
  { name: "Shirley Temple", price: "$7", description: "Grenadine · lime · ginger ale" },
];

const beer: MenuItem[] = [
  { name: "French Pilsner", price: "$9", description: "Pilsner · Avant-Garde / Memento" },
  { name: "IPA", price: "$10", description: "IPA · Wills" },
  { name: "Doux Bisous", price: "$9", description: "Blanche · Avant-Garde" },
  { name: "Rage", price: "$9", description: "Light Lager · Rage" },
  { name: "Le cœur à ses raisins", price: "$9", description: "Blanche · Avant-Garde" },
  { name: "Mikkeller", price: "$8", description: "Non-alcoholic · Sober Sips", label: "0%" },
];

const wine: MenuItem[] = [
  { name: "Torres Las Pisadas Rioja 2020", price: "15 / 45", description: "Ebre Valley, Spain · raspberry · dried dates · warm spice", label: "Red" },
  { name: "Class Hic 2020", price: "16 / 45", description: "Côtes du Rhône, France · floral · vanilla · dark fruit", label: "Red · Organic" },
  { name: "Parajes del Valle Orange Ecológico", price: "16 / 38", description: "Spain · fruity · floral · spicy", label: "Orange · Organic" },
  { name: "Pinot Gris d’Alsace Willm", price: "15 / 40", description: "Alsace, France · floral · honey · melon · stone fruit", label: "White" },
  { name: "Kim Crawford", price: "14 / 38", description: "Marlborough, New Zealand · lime · grapefruit · tropical fruit · mineral", label: "White" },
  { name: "Bernard-Massard Cuvée de l’Écusson Brut 200 ml", price: "$16", description: "Moselle, France · bright bubbles · fresh acidity · mineral", label: "Sparkling" },
];

const bites: MenuItem[] = [
  { name: "Chicken Jerky", price: "$10", description: "Marinated in Memento imperial stout · pickles · olives" },
  { name: "House-Roasted Nuts", price: "$8", description: "Caramel · spice" },
  { name: "Olives or Pickles", price: "$6" },
];

const frText: Record<string, string> = {
  "The Science Experiment": "L’Expérience scientifique",
  "Tesla’s Carré": "Carré Tesla",
  "Radioactive Sour": "Sour radioactif",
  "Alternating Current": "Courant alternatif",
  "Fire Conductor": "Le conducteur de feu",
  "Cocktail of the Season": "Cocktail de la saison",
  "Seasonal": "Saison",
  "Mezcal · Aperol · lime · soda · absinthe": "Mezcal · Aperol · jus de lime · soda · absinthe",
  "Canadian rye · chocolate liqueur · butterscotch · Chartreuse · chocolate bitters · chili": "Whisky de seigle canadien · liqueur de chocolat · butterscotch · Chartreuse · amers au chocolat · chili",
  "Rye · Grand Marnier · sweet vermouth · Bénédictine · smoked dome": "Whisky de seigle · Grand Marnier · vermouth doux · Bénédictine · cloche fumée",
  "White rum · Midori · lemon · simple syrup · foamer": "Rhum blanc · Midori · jus de citron · sirop simple · agent moussant",
  "Calvados · Amaro Montenegro or Nonino · red vermouth · Angostura · smoke bubble": "Calvados · amaro Montenegro ou Nonino · vermouth rouge · amer Angostura · bulle de fumée",
  "Tanqueray · Grand Marnier · cardamom bitters · sparkling water · lemon · dried orange · butterfly-pea tea": "Tanqueray · Grand Marnier · amers à la cardamome · eau pétillante · citron · orange séchée · thé aux fleurs de pois papillon",
  "Fireball or Crown Royal Apple · lime · maple syrup · ginger beer": "Fireball ou Crown Royal Apple · lime · sirop d’érable · bière de gingembre",
  "Ask your bartender for the current invention": "Demandez à l’équipe quelle est l’invention du moment",
  "Tesla’s laboratory was part theatre, part storm: coils hummed, glass glowed and every experiment waited for a final spark. This bright, aromatic invention invites that same sense of discovery, finishing with a restrained current of absinthe.": "Le laboratoire de Tesla tenait à la fois du théâtre et de l’orage : les bobines vibraient, le verre brillait et chaque expérience attendait l’étincelle finale. Cette invention vive et aromatique cultive le même esprit de découverte, avec un courant d’absinthe tout en retenue.",
  "Tesla’s mechanical oscillator translated invisible frequency into physical motion. Here, Canadian rye carries the pulse, chocolate and butterscotch provide the low hum, and Chartreuse with chili sends one final vibration through the glass.": "L’oscillateur mécanique de Tesla transformait une fréquence invisible en mouvement. Ici, le whisky de seigle canadien porte la pulsation, le chocolat et le butterscotch créent un grondement sourd, puis la Chartreuse et le chili font vibrer le verre une dernière fois.",
  "A Montréal what-if: the drink Tesla might have met in a hidden 1920s bar. Inspired by the Vieux Carré, it is strong, layered and precise, then revealed from beneath a smoked dome like an idea emerging from the dark.": "Une uchronie montréalaise : le cocktail que Tesla aurait pu découvrir dans un bar clandestin des années 1920. Inspiré du Vieux Carré, il est puissant, complexe et précis, puis dévoilé sous une cloche fumée comme une idée surgissant de l’ombre.",
  "An imagined laboratory glow captured in a glass. Midori supplies the electric-green charge, rum the hidden current and lemon the sharp voltage, all lifted beneath a soft, luminous cap of foam.": "La lueur d’un laboratoire imaginaire capturée dans un verre. Le Midori apporte la charge vert électrique, le rhum le courant caché et le citron la tension vive, le tout sous une mousse douce et lumineuse.",
  "Wardenclyffe Tower was Tesla’s boldest attempt to transmit energy without wires. Calvados gives this tribute its earth, vermouth its structure and Montenegro a nod to Tesla’s roots—an unfinished dream suspended beneath a bubble of smoke.": "La tour Wardenclyffe fut la tentative la plus audacieuse de Tesla pour transmettre l’énergie sans fil. Le Calvados ancre cet hommage, le vermouth lui donne sa structure et le Montenegro salue les racines de Tesla : un rêve inachevé suspendu sous une bulle de fumée.",
  "Alternating current transformed the modern world. Gin and orange ride a stream of sparkling energy while butterfly-pea tea shifts the colour before your eyes: a small tableside echo of Tesla’s world-changing system.": "Le courant alternatif a transformé le monde moderne. Le gin et l’orange suivent un flux d’énergie pétillante tandis que le thé de pois papillon change de couleur sous vos yeux : un petit écho, servi à table, du système révolutionnaire de Tesla.",
  "Tesla became famous for commanding spectacular electrical discharges. This copper-cold conductor channels that energy through cinnamon or apple warmth, maple, lime and a sharp ginger spark—controlled chaos with the current still flowing.": "Tesla est devenu célèbre pour ses décharges électriques spectaculaires. Ce conducteur glacé par le cuivre canalise cette énergie entre la chaleur de la cannelle ou de la pomme, l’érable, la lime et une étincelle vive de gingembre : un chaos maîtrisé où le courant circule encore.",
  "No laboratory stops at one successful experiment. This rotating creation gives the bar team room to test a new ingredient, technique or idea, then serve the most promising result while it is in season.": "Aucun laboratoire ne s’arrête à une seule expérience réussie. Cette création changeante permet à l’équipe du bar de tester un ingrédient, une technique ou une idée, puis de servir le résultat le plus prometteur pendant sa saison.",
  "Habanero lemonade · water · honey · lime": "Limonade habanero · eau · miel · lime",
  "Soft Drinks": "Boissons gazeuses",
  "Cola · Diet · Lemon-Lime · Orange · Canada Dry": "Cola · Diète · Citron-lime · Orange · Canada Dry",
  "Energy drink": "Boisson énergisante",
  "Non-alcoholic beer": "Bière sans alcool",
  "Ginger Beer": "Bière de gingembre",
  "Spicy · bright · bubbly": "Épicée · vive · pétillante",
  "Grapefruit Juice": "Jus de pamplemousse",
  "Fresh · tart · citrus": "Frais · acidulé · agrumes",
  "Grenadine · lime · ginger ale": "Grenadine · lime · soda au gingembre",
  "Light Lager · Rage": "Lager légère · Rage",
  "Non-alcoholic · Sober Sips": "Sans alcool · Sober Sips",
  "Ebre Valley, Spain · raspberry · dried dates · warm spice": "Vallée de l’Èbre, Espagne · framboise · dattes séchées · épices chaleureuses",
  "Côtes du Rhône, France · floral · vanilla · dark fruit": "Côtes-du-Rhône, France · floral · vanille · fruits noirs",
  "Spain · fruity · floral · spicy": "Espagne · fruité · floral · épicé",
  "Alsace, France · floral · honey · melon · stone fruit": "Alsace, France · floral · miel · melon · fruits à noyau",
  "Marlborough, New Zealand · lime · grapefruit · tropical fruit · mineral": "Marlborough, Nouvelle-Zélande · lime · pamplemousse · fruits tropicaux · minéral",
  "Moselle, France · bright bubbles · fresh acidity · mineral": "Moselle, France · bulles éclatantes · acidité fraîche · notes minérales",
  "Red": "Rouge", "Red · Organic": "Rouge · Bio", "Orange · Organic": "Orange · Bio", "White": "Blanc", "Sparkling": "Pétillant",
  "Chicken Jerky": "Jerky de poulet BBQ",
  "Marinated in Memento imperial stout · pickles · olives": "Mariné dans la stout impériale Memento · cornichons · olives",
  "House-Roasted Nuts": "Noix rôties maison",
  "Caramel · spice": "Caramel · épices",
  "Olives or Pickles": "Olives ou cornichons",
  "The bar": "Le bar", "Escape games": "Jeux d’évasion", "Groups": "Groupes", "Visit": "Nous trouver",
  "Book an experience": "Réserver une expérience", "View the menu": "Voir le menu", "Plan your visit": "Planifier votre visite",
  "Tesla-inspired cocktails, curious plates and immersive A\\Maze escape games in Montréal’s Old Port.": "Cocktails inspirés de Tesla, bouchées inventives et jeux d’évasion immersifs A\\Maze au Vieux-Port de Montréal.",
  "Signature cocktails": "Cocktails signatures", "Wine & local beer": "Vins et bières locales", "Three immersive games": "Trois jeux immersifs", "Private groups": "Groupes privés",
  "The bar · After the laboratory": "Le bar · Après le laboratoire", "An evening": "Une soirée", "in progress.": "en cours.",
  "Come early or stay after your game for original cocktails, local craft beer, wine and a tight menu of small bites. Twenty-five seats, low light, zero pressure to solve anything before the first sip.": "Arrivez tôt ou restez après votre jeu pour découvrir nos cocktails maison, nos bières artisanales locales, nos vins et notre courte sélection de bouchées. Vingt-cinq places, lumière tamisée et aucune pression pour résoudre quoi que ce soit avant la première gorgée.",
  "seats": "places", "games": "jeux", "days open": "jours sur 7",
  "The bill of fare · Current selection": "La carte · Sélection du moment", "The menu": "Le menu", "Choose your current": "Choisis ton courant",
  "Select a cocktail to read the story behind the invention.": "Sélectionnez un cocktail pour lire l’histoire derrière l’invention.",
  "Cocktails": "Cocktails", "Zero Proof": "Sans alcool", "Beer & Wine": "Bières et vins", "Small Bites": "Petites bouchées",
  "Select a drink · read its story": "Sélectionnez un cocktail · lisez son histoire",
  "Zero proof": "Sans alcool", "Experiments without the voltage": "Expériences sans tension", "Beer": "Bière", "Craft & local": "Artisanale et locale",
  "Wine": "Vin", "Prices shown exactly as listed": "Prix affichés tels qu’indiqués", "Small bites": "Petites bouchées", "Short, deliberate, shareable": "Simples, soignées, à partager",
  "Please ask the team about ingredients and allergens.": "Veuillez demander à notre équipe les détails sur les ingrédients et les allergènes.",
  "Service note No. 48": "Note de service no 48", "Experiments worth repeating.": "Des expériences qui méritent d’être répétées.",
  "Seasonal items and availability may change. Ask the bartender what is currently on.": "Les produits saisonniers et les disponibilités peuvent changer. Demandez à l’équipe ce qui est au menu aujourd’hui.",
  "View source menu": "Voir le menu officiel", "Three ways into the story": "Trois façons d’entrer dans l’histoire", "Choose your": "Choisissez votre", "experiment.": "expérience.",
  "One immersive room, one puzzle chest and one outdoor expedition. Every booking is private to your group and playable in English or French.": "Une salle immersive, un coffre à énigmes et une expédition extérieure. Chaque réservation est privée pour votre groupe et peut se jouer en français ou en anglais.",
  "Tesla’s Enigmas": "Les énigmes de Tesla", "Dead Man’s Chest": "Le coffre du mort", "Secrets of a Shipping Empire": "Le secret d’un empire maritime",
  "Indoor": "À l’intérieur", "In the lounge": "Dans le salon", "Outdoors": "À l’extérieur", "players": "joueurs", "success": "de réussite", "/ person": "/ personne", "Details": "Détails",
  "Enter Tesla’s abandoned study, follow the experiments and unlock interconnected mechanisms to discover what he left behind.": "Entrez dans le bureau abandonné de Tesla, suivez le fil de ses expériences et déverrouillez des mécanismes interreliés pour découvrir ce qu’il a laissé derrière lui.",
  "Read the symbols, solve the riddles and open every hidden compartment before the mysterious chest keeps its secret.": "Déchiffrez les symboles, résolvez les énigmes et ouvrez chaque compartiment caché avant que le mystérieux coffre ne garde son secret.",
  "Turn the streets of Old Montréal into your game board on the trail of the fabled Elixir of Ingenuity.": "Transformez les rues du Vieux-Montréal en terrain de jeu sur la piste du légendaire Élixir d’ingéniosité.",
  "Private games": "Jeux privés", "No strangers added to your booking": "Aucun autre joueur ne sera ajouté à votre groupe", "Advance booking recommended": "Réservation à l’avance recommandée",
  "Private events · Team building · 5 à 7": "Événements privés · Cohésion d’équipe · 5 à 7", "Bring your": "Réunissez vos", "brightest minds.": "esprits les plus brillants.",
  "Combine a private game with drinks in the lounge for a team night, celebration or small corporate event in the Old Port.": "Combinez un jeu privé et des consommations dans le salon pour une soirée d’équipe, une célébration ou un petit événement d’entreprise au Vieux-Port.",
  "Plan a group event": "Planifier un événement de groupe", "Explore Old Port team building": "Découvrir les activités de groupe au Vieux-Port", "Find the": "Suivez le", "current.": "courant.", "Opening hours": "Heures d’ouverture",
  "Monday—Friday": "Lundi au vendredi", "2 pm—11 pm": "14 h à 23 h", "Saturday—Sunday": "Samedi et dimanche", "10 am—11 pm": "10 h à 23 h",
  "Reservations are not taken by phone. Book online or email the team for help.": "Nous ne prenons pas de réservations par téléphone. Réservez en ligne ou écrivez à l’équipe si vous avez besoin d’aide.",
  "Arrive": "Accès", "Orange Line · a short walk through Old Montréal.": "Ligne orange · à quelques minutes de marche dans le Vieux-Montréal.", "Parking": "Stationnement",
  "Questions are answered fastest by email or text.": "Pour une réponse rapide, écrivez-nous par courriel ou texto.", "Access note": "Note sur l’accessibilité",
  "The entrance has four steps. Tesla’s Enigmas includes stairs and flashing lights. The outdoor Shipping Empire route is wheelchair accessible and covers more than 1 km.": "L’entrée compte quatre marches. Les énigmes de Tesla comportent des escaliers et des lumières clignotantes. Le parcours extérieur Le secret d’un empire maritime est accessible en fauteuil roulant et s’étend sur plus de 1 km.",
  "Read the FAQ": "Consulter la FAQ", "Cocktails · Wine · Escape Games": "Cocktails · Vin · Jeux d’évasion", "Montréal Old Port": "Vieux-Port de Montréal", "Gift cards": "Cartes-cadeaux",
  "Menu and hours checked August 20, 2026 · Availability may change.": "Menu et horaires vérifiés le 20 août 2026 · Les disponibilités peuvent changer.",
};

const translate = (locale: Locale, value: string) => locale === "fr" ? (frText[value] ?? value) : value;
const localizeItem = <T extends MenuItem>(item: T, locale: Locale): T => ({
  ...item,
  name: translate(locale, item.name),
  description: item.description ? translate(locale, item.description) : undefined,
  label: item.label ? translate(locale, item.label) : undefined,
  ...(Object.prototype.hasOwnProperty.call(item, "story") ? { story: translate(locale, (item as CocktailItem).story) } : {}),
});

function Monogram({ small = false }: { small?: boolean }) {
  return <span className={`monogram${small ? " monogram-small" : ""}`} aria-hidden="true"><span>I</span></span>;
}

function OrnamentDivider() {
  return <div className="ornament-divider" aria-hidden="true"><span>✦</span></div>;
}

function MenuList({ items }: { items: MenuItem[] }) {
  return (
    <div className="menu-list">
      {items.map((item) => (
        <article className="menu-item" key={item.name}>
          <div className="menu-item-copy">
            <div className="menu-item-title"><h4>{item.name}</h4>{item.label && <span>{item.label}</span>}</div>
            {item.description && <p>{item.description}</p>}
          </div>
          <strong className="menu-price">{item.price}</strong>
        </article>
      ))}
    </div>
  );
}

function CocktailDetail({ cocktail, id, className = "", onClose, locale }: { cocktail: CocktailItem; id: string; className?: string; onClose: () => void; locale: Locale }) {
  const isFr = locale === "fr";
  return (
    <section className={`cocktail-detail ${className}`} id={id} aria-labelledby={`${id}-title`}>
      <span className="cocktail-detail-orbit" aria-hidden="true" />
      <div className="cocktail-detail-topline"><span>{isFr ? "Histoire de l’invention · no" : "Invention story · No."} {cocktail.number}</span><button type="button" onClick={onClose} aria-label={isFr ? `Fermer l’histoire de ${cocktail.name}` : `Close ${cocktail.name} story`}>{isFr ? "Fermer" : "Close"} ×</button></div>
      <div className="cocktail-detail-mark"><Monogram /></div>
      <h4 id={`${id}-title`}>{cocktail.name}</h4>
      <strong className="cocktail-detail-price">{cocktail.price}</strong>
      <div className="cocktail-art"><img src={cocktail.image} alt={isFr ? `Illustration gravée de ${cocktail.name}` : `Engraved illustration of ${cocktail.name}`} loading="lazy" decoding="async" width="560" height="700" /></div>
      <p className="cocktail-service">{cocktail.story}</p>
      <p className="cocktail-ingredients">{cocktail.description}</p>
    </section>
  );
}

function CocktailMenu({ items, activeId, onSelect, onClose, registerButton, locale }: { items: CocktailItem[]; activeId: string | null; onSelect: (id: string) => void; onClose: () => void; registerButton: (id: string, node: HTMLButtonElement | null) => void; locale: Locale }) {
  const isFr = locale === "fr";
  const activeCocktail = items.find((cocktail) => cocktail.id === activeId) ?? null;
  return (
    <div className="cocktail-explorer">
      <div className="cocktail-list">
        {items.map((cocktail) => {
          const isActive = activeId === cocktail.id;
          const desktopPanelId = "cocktail-detail-desktop";
          const mobilePanelId = `cocktail-detail-mobile-${cocktail.id}`;
          return (
            <div className={`cocktail-entry${isActive ? " is-active" : ""}`} key={cocktail.id}>
              <button className="cocktail-row" type="button" ref={(node) => registerButton(cocktail.id, node)} onClick={() => onSelect(cocktail.id)} aria-expanded={isActive} aria-controls={`${desktopPanelId} ${mobilePanelId}`}>
                <span className="cocktail-glass-icon" aria-hidden="true"><img src={cocktail.image} alt="" loading="lazy" decoding="async" width="560" height="700" /></span>
                <span className="cocktail-row-copy">
                  <span className="cocktail-row-title">{cocktail.name}{cocktail.label && <em>{cocktail.label}</em>}</span>
                  <span className="cocktail-row-ingredients">{cocktail.description}</span>
                  <span className="cocktail-row-cue">{isActive ? (isFr ? "Histoire ouverte · fermer" : "Story open · close") : (isFr ? "Lire son histoire" : "Read its story")}</span>
                </span>
                <strong>{cocktail.price}</strong>
              </button>
              {isActive && <CocktailDetail cocktail={cocktail} id={mobilePanelId} className="cocktail-detail-mobile" onClose={onClose} locale={locale} />}
            </div>
          );
        })}
      </div>
      <div className="cocktail-detail-column">
        {activeCocktail ? <CocktailDetail cocktail={activeCocktail} id="cocktail-detail-desktop" className="cocktail-detail-desktop" onClose={onClose} locale={locale} /> : <div className="cocktail-detail cocktail-detail-empty"><Monogram /><p>{isFr ? "Sélectionnez une invention pour découvrir son histoire." : "Select an invention to discover its story."}</p></div>}
      </div>
      <p className="sr-only" aria-live="polite">{activeCocktail ? (isFr ? `Détails de ${activeCocktail.name} affichés.` : `Showing ${activeCocktail.name} details.`) : (isFr ? "Détails du cocktail fermés." : "Cocktail details closed.")}</p>
    </div>
  );
}

export function InventionsPage({ locale = "en" }: { locale?: Locale }) {
  const isFr = locale === "fr";
  const bookingUrl = BOOKING_URLS[locale];
  const officialLocationUrl = BOOKING_URLS[locale];
  const teamBuildingUrl = sitePath(isFr ? "fr/evenements-de-groupe/" : "team-building/");
  const t = (value: string) => translate(locale, value);
  const localizedCocktails = cocktails.map((item) => localizeItem(item, locale));
  const localizedZeroProof = zeroProof.map((item) => localizeItem(item, locale));
  const localizedBeer = beer.map((item) => localizeItem(item, locale));
  const localizedWine = wine.map((item) => localizeItem(item, locale));
  const localizedBites = bites.map((item) => localizeItem(item, locale));
  const menuTabs = [
    { id: "cocktails", label: t("Cocktails") },
    { id: "zero", label: t("Zero Proof") },
    { id: "beer-wine", label: t("Beer & Wine") },
    { id: "bites", label: t("Small Bites") },
  ] as const;
  const [menuTab, setMenuTab] = useState<(typeof menuTabs)[number]["id"]>("cocktails");
  const [activeCocktailId, setActiveCocktailId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cocktailButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeMenu = () => setMobileOpen(false);
  const closeCocktail = () => {
    const closingId = activeCocktailId;
    setActiveCocktailId(null);
    if (closingId) requestAnimationFrame(() => cocktailButtonRefs.current[closingId]?.focus());
  };
  const chooseMenuTab = (id: (typeof menuTabs)[number]["id"]) => {
    setMenuTab(id);
    setActiveCocktailId(null);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeCocktailId) {
        const closingId = activeCocktailId;
        setActiveCocktailId(null);
        requestAnimationFrame(() => cocktailButtonRefs.current[closingId]?.focus());
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeCocktailId, locale]);

  return (
    <main id="top" lang={locale}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={isFr ? "Accueil — Inventions par A\\Maze" : "Inventions by A Maze home"} onClick={closeMenu}>
          <img className="brand-lockup" src={sitePath(isFr ? "images/inventions-header-lockup-fr-transparent.webp" : "images/inventions-header-lockup.png")} alt="" width="315" height="195" />
        </a>
        <nav className="desktop-nav" aria-label={isFr ? "Navigation principale" : "Primary navigation"}>
          <a href="#bar">{t("The bar")}</a><a href="#menu">Menu</a><a href="#games">{t("Escape games")}</a><a href={teamBuildingUrl}>{t("Groups")}</a><a href="#visit">{t("Visit")}</a>
        </nav>
        <div className="header-actions">
          <a className="language-link" href={sitePath(isFr ? "" : "fr/")} hrefLang={isFr ? "en" : "fr"} lang={isFr ? "en" : "fr"} aria-label={isFr ? "EN — Version anglaise" : "FR — Version française"}>{isFr ? "EN" : "FR"}</a>
          <a className="button button-small header-book" href={bookingUrl}>{t("Book an experience")}</a>
          <button className={`menu-toggle${mobileOpen ? " is-open" : ""}`} type="button" aria-label={mobileOpen ? (isFr ? "Fermer le menu" : "Close navigation") : (isFr ? "Ouvrir le menu" : "Open navigation")} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((open) => !open)}><span /><span /></button>
        </div>
        <nav className={`mobile-nav${mobileOpen ? " is-open" : ""}`} id="mobile-navigation" aria-label={isFr ? "Navigation mobile" : "Mobile navigation"}>
          <a href="#bar" onClick={closeMenu}>{t("The bar")}</a><a href="#menu" onClick={closeMenu}>Menu</a><a href="#games" onClick={closeMenu}>{t("Escape games")}</a><a href={teamBuildingUrl} onClick={closeMenu}>{t("Groups")}</a><a href="#visit" onClick={closeMenu}>{t("Visit")}</a><a href={bookingUrl}>{t("Book an experience")} ↗</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="hero-copy-frame" aria-hidden="true" />
          <p className="eyebrow">{isFr ? "Montréal · Vieux-Port · Service no 48" : "Montréal · Old Port · Service No. 48"}</p>
          <h1 id="hero-title"><span className="sr-only">{isFr ? "Inventions par A\\Maze. Le courant passe." : "Inventions by A Maze. The current is on."}</span><img className="hero-lockup" src={sitePath(isFr ? "images/inventions-wordmark-lockup-fr-transparent.webp" : "images/inventions-wordmark-lockup.png")} alt="" width={isFr ? 1200 : 1010} height={isFr ? 675 : 510} /></h1>
          <p className="hero-lede">{t("Tesla-inspired cocktails, curious plates and immersive A\\Maze escape games in Montréal’s Old Port.")}</p>
          <a className="hero-endorsement" href={officialLocationUrl}><span>{isFr ? "Le premier bar à cocktails de la famille" : "The first cocktail bar in the"}</span><img src={sitePath("images/amaze-official-logo.webp")} alt="A\\Maze" width="1000" height="203" /></a>
          <div className="hero-actions">
            <a className="button button-solid" href={bookingUrl}>{t("Book an experience")}</a>
            <a className="button" href="#menu">{t("View the menu")}</a>
          </div>
          <div className="hero-meta" aria-label={isFr ? "Points forts du lieu" : "Venue highlights"}><span>{isFr ? "480, rue Saint-Jean" : "480 Rue Saint-Jean"}</span><span>{isFr ? "25 places" : "25 seats"}</span><span>{isFr ? "Jeux en FR / EN" : "EN / FR games"}</span></div>
        </div>
        <div className="hero-visual">
          <img className="hero-bar-photo" src={sitePath("images/bartender.webp")} alt={isFr ? "Un barman d’Inventions prépare un cocktail au bar du Vieux-Port" : "An Inventions bartender preparing a cocktail at the Old Port bar"} fetchPriority="high" decoding="async" width="1200" height="1200" />
          <figure className="hero-cocktail-inset"><img src={sitePath("images/venue-cocktails-current.webp")} alt={isFr ? "Trois cocktails signatures servis chez Inventions" : "Three signature cocktails served at Inventions"} decoding="async" width="800" height="1200" /><figcaption>{isFr ? "Cocktails maison · Vieux-Port" : "Original cocktails · Old Port"}</figcaption></figure>
        </div>
      </section>

      <section className="ticker" aria-label={isFr ? "Points forts du lieu" : "Venue highlights"}><span>{t("Signature cocktails")}</span><i>✦</i><span>{t("Wine & local beer")}</span><i>✦</i><span>{t("Three immersive games")}</span><i>✦</i><span>{t("Private groups")}</span></section>

      <section className="bar-section section-shell" id="bar">
        <div className="bar-gallery">
          <figure className="bar-photo bar-photo-main"><img src={sitePath("images/venue-overview-current.webp")} alt={isFr ? "Le véritable salon d’Inventions dans le Vieux-Port de Montréal" : "The real Inventions lounge in Montréal’s Old Port"} loading="lazy" decoding="async" width="1000" height="1400" /><figcaption>Inventions · {isFr ? "480, rue Saint-Jean" : "480 Rue Saint-Jean"}</figcaption></figure>
          <figure className="bar-photo bar-photo-detail"><img src={sitePath("images/venue-drink-current.webp")} alt={isFr ? "Un cocktail signature servi dans une tasse en cuivre chez Inventions" : "A signature cocktail served in a copper mug at Inventions"} loading="lazy" decoding="async" width="1000" height="714" /></figure>
        </div>
        <div className="bar-copy">
          <p className="eyebrow">{t("The bar · After the laboratory")}</p>
          <h2>{t("An evening")}<br />{t("in progress.")}</h2>
          <p className="section-lede">{isFr ? "Inventions est un bar à cocktails inspiré des travaux de Nikola Tesla, installé à l’intérieur du centre de jeux d’évasion A\\Maze Vieux-Port. Venez avant ou après votre jeu pour découvrir des créations maison, des bières artisanales montréalaises, du vin et quelques bouchées." : "Inventions is a cocktail bar inspired by Nikola Tesla’s work, housed inside the A\\Maze Old Port escape-game venue. Come before or after your game for original cocktails, Montréal craft beer, wine and a concise menu of small bites."}</p>
          <div className="fact-grid"><div><strong>25</strong><span>{t("seats")}</span></div><div><strong>3</strong><span>{t("games")}</span></div><div><strong>7/7</strong><span>{t("days open")}</span></div></div>
          <a className="text-link" href="#visit">{t("Plan your visit")} <span>↘</span></a>
          <a className="text-link amaze-location-link" href={officialLocationUrl}>{isFr ? "Découvrir A\\Maze Vieux-Port" : "Discover A\\Maze Old Port"} <span>↗</span></a>
        </div>
      </section>

      <section className="menu-section" id="menu" aria-labelledby="menu-title">
        <div className="menu-heading section-shell">
          <div><p className="eyebrow">{t("The bill of fare · Current selection")}</p><h2 id="menu-title">{t("The menu")}</h2><p className="menu-subtitle">{t("Choose your current")}</p></div>
          <p>{t("Select a cocktail to read the story behind the invention.")}</p>
        </div>
        <div className="menu-tabs" aria-label={isFr ? "Catégories du menu" : "Menu categories"}>
          {menuTabs.map((tab, index) => <button key={tab.id} type="button" aria-pressed={menuTab === tab.id} className={menuTab === tab.id ? "active" : ""} onClick={() => chooseMenuTab(tab.id)}><span>0{index + 1}</span>{tab.label}</button>)}
        </div>
        <div className={`menu-board section-shell${menuTab === "cocktails" ? " menu-board-cocktails" : ""}`} id="menu-panel">
          <div className="menu-content">
            {menuTab === "cocktails" && <><div className="menu-content-heading"><h3>{t("Signature cocktails")}</h3><span>{t("Select a drink · read its story")}</span></div><CocktailMenu items={localizedCocktails} activeId={activeCocktailId} onSelect={(id) => setActiveCocktailId((current) => current === id ? null : id)} onClose={closeCocktail} registerButton={(id, node) => { cocktailButtonRefs.current[id] = node; }} locale={locale} /></>}
            {menuTab === "zero" && <><div className="menu-content-heading"><h3>{t("Zero proof")}</h3><span>{t("Experiments without the voltage")}</span></div><MenuList items={localizedZeroProof} /></>}
            {menuTab === "beer-wine" && <div className="beverage-columns"><div><div className="menu-content-heading"><h3>{t("Beer")}</h3><span>{t("Craft & local")}</span></div><MenuList items={localizedBeer} /></div><div><div className="menu-content-heading"><h3>{t("Wine")}</h3><span>{t("Prices shown exactly as listed")}</span></div><MenuList items={localizedWine} /></div></div>}
            {menuTab === "bites" && <><div className="menu-content-heading"><h3>{t("Small bites")}</h3><span>{t("Short, deliberate, shareable")}</span></div><MenuList items={localizedBites} /><p className="menu-footnote">{t("Please ask the team about ingredients and allergens.")}</p></>}
          </div>
          {menuTab !== "cocktails" && <aside className="menu-aside">
            <Monogram /><p className="eyebrow">{t("Service note No. 48")}</p><blockquote>{t("Experiments worth repeating.")}</blockquote><div className="menu-aside-line" /><p>{t("Seasonal items and availability may change. Ask the bartender what is currently on.")}</p><a href={isFr ? "https://www.amazemontreal.com/vieux-port-menu" : "https://www.amazemontreal.com/old-port-menu"} target="_blank" rel="noreferrer">{t("View source menu")} ↗</a>
          </aside>}
        </div>
      </section>

      <section className="games-section section-shell" id="games" aria-labelledby="games-title">
        <div className="games-heading"><div><p className="eyebrow">{t("Three ways into the story")}</p><h2 id="games-title">{t("Choose your")}<br /><em>{t("experiment.")}</em></h2></div><p>{t("One immersive room, one puzzle chest and one outdoor expedition. Every booking is private to your group and playable in English or French.")}</p></div>
        <div className="game-grid">
          <article className="game-card game-card-tesla"><div className="game-image"><img src={sitePath("images/game-tesla.webp")} alt={isFr ? "Scène des Énigmes de Tesla avec une ampoule électrique lumineuse" : "Tesla’s Enigmas scene with a glowing electric bulb"} loading="lazy" decoding="async" width="1500" height="906" /><span>01 · {t("Indoor")}</span></div><div className="game-card-body"><p className="eyebrow">{isFr ? "2 à 6 joueurs · 60 min · 45 % de réussite" : "2–6 players · 60 min · 45% success"}</p><h3>{t("Tesla’s Enigmas")}</h3><p>{t("Enter Tesla’s abandoned study, follow the experiments and unlock interconnected mechanisms to discover what he left behind.")}</p><div className="game-card-footer"><strong>$37 <small>{t("/ person")}</small></strong><a href={isFr ? "https://www.amazemontreal.com/fr/enigmes-de-tesla-jeu-devasion-vieux-port" : "https://www.amazemontreal.com/teslas-enigmas-escape-game-old-port"} target="_blank" rel="noreferrer">{t("Details")} ↗</a></div></div></article>
          <article className="game-card game-card-chest"><div className="game-image"><img src={sitePath("images/game-chest-current.webp")} alt={isFr ? "Des joueurs ouvrent Le coffre du mort" : "Players opening the Dead Man’s Chest"} loading="lazy" decoding="async" width="1000" height="632" /><span>02 · {t("In the lounge")}</span></div><div className="game-card-body"><p className="eyebrow">{isFr ? "2 à 3 joueurs · 60 min · 60 % de réussite" : "2–3 players · 60 min · 60% success"}</p><h3>{t("Dead Man’s Chest")}</h3><p>{t("Read the symbols, solve the riddles and open every hidden compartment before the mysterious chest keeps its secret.")}</p><div className="game-card-footer"><strong>$20 <small>{t("/ person")}</small></strong><a href={isFr ? "https://www.amazemontreal.com/fr/excellente-idee-de-rendez-vous-en-couple" : "https://www.amazemontreal.com/escape-game-for-2-players-montreal-man-chest"} target="_blank" rel="noreferrer">{t("Details")} ↗</a></div></div></article>
          <article className="game-card game-card-shipping"><div className="game-image"><img src={sitePath("images/game-shipping-current.webp")} alt={isFr ? "Des joueurs explorent le Vieux-Montréal avec Le secret d’un empire maritime" : "Players exploring Old Montréal with Secrets of a Shipping Empire"} loading="lazy" decoding="async" width="1000" height="667" /><span>03 · {t("Outdoors")}</span></div><div className="game-card-body"><p className="eyebrow">{isFr ? "2 à 7 joueurs · 60 à 90 min · 82 % de réussite" : "2–7 players · 60–90 min · 82% success"}</p><h3>{t("Secrets of a Shipping Empire")}</h3><p>{t("Turn the streets of Old Montréal into your game board on the trail of the fabled Elixir of Ingenuity.")}</p><div className="game-card-footer"><strong>$25 <small>{t("/ person")}</small></strong><a href={isFr ? "https://www.amazemontreal.com/fr/jeu-devasion-exterieur-chasse-au-tresor-montreal" : "https://www.amazemontreal.com/montreal-outdoor-escape-game-scavenger-hunt"} target="_blank" rel="noreferrer">{t("Details")} ↗</a></div></div></article>
        </div>
        <div className="games-cta"><p><span>{t("Private games")}</span> · {t("No strangers added to your booking")} · {t("Advance booking recommended")}</p><a className="button button-solid" href={bookingUrl}>{t("Book an experience")}</a></div>
      </section>

      <OrnamentDivider />

      <section className="groups-section" id="groups">
        <div className="groups-image"><img src={sitePath("images/groups-current.webp")} alt={isFr ? "Un groupe profite de cocktails signatures chez Inventions" : "A group enjoying signature cocktails at Inventions"} loading="lazy" decoding="async" width="1200" height="780" /></div>
        <div className="groups-copy"><p className="eyebrow">{t("Private events · Team building · 5 à 7")}</p><h2>{t("Bring your")}<br /><em>{t("brightest minds.")}</em></h2><p>{t("Combine a private game with drinks in the lounge for a team night, celebration or small corporate event in the Old Port.")}</p><a className="button" href={teamBuildingUrl}>{t("Explore Old Port team building")}</a></div>
      </section>

      <section className="visit-section section-shell" id="visit" aria-labelledby="visit-title">
        <div className="visit-intro"><div><p className="eyebrow">{isFr ? "Montréal · Vieux-Port" : "Montréal · Old Port"}</p><h2 id="visit-title">{t("Find the")}<br /><em>{t("current.")}</em></h2></div><a className="address-link" href={MAPS_URL} target="_blank" rel="noreferrer"><span>{isFr ? "480, rue Saint-Jean" : "480 Rue Saint-Jean"}<br />Montréal, QC H2Y 2S3</span><b>↗</b></a></div>
        <div className="visit-details">
          <div className="hours-card"><p className="eyebrow">{t("Opening hours")}</p><dl><div><dt>{t("Monday—Friday")}</dt><dd>{t("2 pm—11 pm")}</dd></div><div><dt>{t("Saturday—Sunday")}</dt><dd>{t("10 am—11 pm")}</dd></div></dl><p className="small-note">{t("Reservations are not taken by phone. Book online or email the team for help.")}</p></div>
          <div className="arrival-card"><div><p className="eyebrow">{t("Arrive")}</p><h3>Square-Victoria–OACI</h3><p>{t("Orange Line · a short walk through Old Montréal.")}</p></div><div><p className="eyebrow">{t("Parking")}</p><p>{isFr ? "508–510, rue Saint-Jean, ou Indigo au 230, rue Saint-Sacrement." : "508–510 Rue Saint-Jean, or Indigo at 230 Rue Saint-Sacrement."}</p></div></div>
          <div className="contact-card"><p className="eyebrow">Contact</p><a href="mailto:escape@amazemontreal.com">escape@amazemontreal.com</a><a href="tel:+15145042139">+1 514 504 2139</a><p>{t("Questions are answered fastest by email or text.")}</p></div>
        </div>
        <div className="access-note"><span>{t("Access note")}</span><p>{t("The entrance has four steps. Tesla’s Enigmas includes stairs and flashing lights. The outdoor Shipping Empire route is wheelchair accessible and covers more than 1 km.")}</p><a href={isFr ? "https://www.amazemontreal.com/fr/faq" : "https://www.amazemontreal.com/faq"} target="_blank" rel="noreferrer">{t("Read the FAQ")} ↗</a></div>
      </section>

      <OrnamentDivider />

      <footer className="site-footer">
        <a className="footer-brand" href="#top" aria-label={isFr ? "Retour en haut — Inventions par A\\Maze" : "Back to top — Inventions by A\\Maze"}>
          <span className="footer-monogram"><Monogram /></span>
          <span className="footer-signature"><strong>Inventions</strong><small>{isFr ? "par A\\Maze" : "by A\\Maze"}</small></span>
        </a>
        <p>{t("Cocktails · Wine · Escape Games")}<br />{t("Montréal Old Port")}</p>
        <div className="footer-links"><a href="https://www.instagram.com/amazemontreal/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.facebook.com/amazemontreal" target="_blank" rel="noreferrer">Facebook ↗</a><a className="gift-card-link" href={isFr ? "https://www.amazemontreal.com/fr/cartes-cadeaux-jeux-devasion" : "https://www.amazemontreal.com/gift-certificates-escape-room"}>{t("Gift cards")} ↗</a></div>
        <a className="amaze-family" href={AMAZE_URL} aria-label={isFr ? "Un membre de la famille A\\Maze" : "Part of the A\\Maze family"}><span>{isFr ? "Un membre de la famille" : "Part of the family"}</span><img src={sitePath("images/amaze-official-logo.webp")} alt="A\\Maze" width="1000" height="203" /></a>
        <small>{t("Menu and hours checked August 20, 2026 · Availability may change.")}</small>
      </footer>
    </main>
  );
}

export default function Home() {
  return <InventionsPage locale="en" />;
}
