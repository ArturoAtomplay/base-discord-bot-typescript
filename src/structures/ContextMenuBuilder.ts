import Bot from "./Bot";
import {
	ContextMenuCommandBuilder,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from "discord.js";

interface ContextMenuTypes {
	Message: MessageContextMenuCommandInteraction;
	User: UserContextMenuCommandInteraction;
}

export default class ContextMenuBuilder<
	T extends keyof ContextMenuTypes,
> extends ContextMenuCommandBuilder {
	run!: ContextMenuFunction<T>;
	public setCallback(fn: ContextMenuFunction<T>) {
		this.run = fn;

		return this;
	}
}

type ContextMenuFunction<T extends keyof ContextMenuTypes> = (
	interaction: ContextMenuTypes[T],
	client: Bot,
) => Promise<unknown>;
