import { json } from "@remix-run/node";
import { countStorageMedia } from "~/api/count-media";

export async function loader() {
  try {
    const stats = await countStorageMedia();
    return json(stats);
  } catch (error) {
    return json({ error: "Erreur lors du comptage des médias" }, { status: 500 });
  }
} 