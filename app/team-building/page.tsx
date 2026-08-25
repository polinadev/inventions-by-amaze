import type { Metadata } from "next";
import { TeamBuildingPage } from "../team-building";

export const metadata: Metadata = {
  title: "Team Building in Montreal Old Port | Inventions by A\\Maze",
  description: "Private escape games, cocktails and outdoor team-building experiences for groups of up to 30 at A\\Maze Old Port in Montréal.",
};

export default function TeamBuilding() {
  return <TeamBuildingPage locale="en" />;
}
