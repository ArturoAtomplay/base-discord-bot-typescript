import { join } from "node:path";
import Bot from "../structures/Bot";
import readDirectory from "./readDirectory";
import { CommandBuilder } from "../structures/CommandBuilder";
import ContextMenuBuilder from "../structures/ContextMenuBuilder";

const commandsDir = join(__dirname, "..", "commands");

export default async function getCommands() {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const commands: (CommandBuilder | ContextMenuBuilder<any>)[] = [];
	const categories = readDirectory(commandsDir);

	for (const category of categories) {
		const commandFiles = readDirectory(join(commandsDir, category), true);

		for (const commandFile of commandFiles) {
			const {
				default: cmd,
				// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			}: { default: CommandBuilder | ContextMenuBuilder<any> } = await import(
				join(commandsDir, category, commandFile)
			);
			commands.push(cmd);
		}
	}

	return commands;
}

export async function setCommands(client: Bot) {
	const commands = await getCommands();

	for (const cmd of commands) {
		client.commands.set(cmd.name, cmd);
	}
}
