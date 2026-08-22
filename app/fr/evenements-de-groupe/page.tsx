import type { Metadata } from "next";
import { TeamBuildingPage } from "../../team-building";

export const metadata: Metadata = {
  title: "Team building et événements de groupe | Inventions par A\\Maze",
  description: "Jeux d’évasion privés, cocktails et aventure extérieure pour des groupes jusqu’à 30 personnes chez A\\Maze Vieux-Port à Montréal.",
};

export default function EvenementsDeGroupe() {
  return <TeamBuildingPage locale="fr" />;
}
