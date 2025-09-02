import type { Route } from "./+types/chat";
import { FRCChat } from "../components/FRCChat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Callister FRC AI Assistant" },
    { name: "description", content: "Callister FRC AI Assistant - FRC robot yarışması için yapay zeka asistanı" },
  ];
}

export default function Chat() {
  return (
    <div>
      <FRCChat />
    </div>
  );
}
