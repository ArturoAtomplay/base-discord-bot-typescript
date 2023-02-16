import { join } from "node:path";
import Bot from "../structures/Bot";
import { readdirSync } from "node:fs";
import { EventBuilder } from "../structures/EventBuilder";

const eventsDir = join(__dirname, "..", "events");

export default async function setEvents(client: Bot) {
	const eventFiles = readdirSync(eventsDir);

	for (const eventFile of eventFiles) {
		const { default: event }: { default: EventBuilder } = await import(
			join(eventsDir, eventFile)
		);

		if (!event.once)
			client.on(event.name, (...args) => void event.run(client, ...args));
		else client.once(event.name, (...args) => void event.run(client, ...args));
	}
}
