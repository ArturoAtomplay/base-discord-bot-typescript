import { join } from "node:path";
import Bot from "../structures/Bot";
import readDirectory from "./readDirectory";
import { CommandBuilder } from "../structures/CommandBuilder";
import ContextMenuBuilder from "../structures/ContextMenuBuilder";

const commandsDir = join(__dirname, "..", "commands");

export default async function getCommands() {
	const commands: (CommandBuilder | ContextMenuBuilder)[] = [];
	const categories = readDirectory(commandsDir);

	for (const category of categories) {
		const commandFiles = readDirectory(join(commandsDir, category), true);

		for (const commandFile of commandFiles) {
			const { default: cmd }: { default: CommandBuilder | ContextMenuBuilder } =
				await import(join(commandsDir, category, commandFile));
			commands.push(cmd);
		}
	}

	return commands;
}
