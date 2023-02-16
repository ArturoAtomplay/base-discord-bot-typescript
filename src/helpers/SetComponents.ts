import { join } from "node:path";
import Bot from "../structures/Bot";
import readDirectory from "./readDirectory";
import { ComponentBuilder } from "../structures/ComponentBuilder";

const componentsDir = join(__dirname, "..", "components");

export default async function setComponents(client: Bot) {
	const categories = readDirectory(componentsDir);

	for (const category of categories) {
		const componentFiles = readDirectory(join(componentsDir, category), true);

		for (const componentFile of componentFiles) {
			const { default: component }: { default: ComponentBuilder } =
				await import(join(componentsDir, category, componentFile));
			client.components.set(component.id, component);
		}
	}
}
