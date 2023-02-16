import Bot from "./Bot";
import {
	ButtonInteraction,
	ModalSubmitInteraction,
	StringSelectMenuInteraction,
} from "discord.js";

interface ComponentTypes {
	Button: ButtonInteraction;
	SelectMenu: StringSelectMenuInteraction;
	Modal: ModalSubmitInteraction;
}

export class ComponentBuilder<
	T extends keyof ComponentTypes = keyof ComponentTypes,
> {
	run!: ComponentFunction<T>;
	public constructor(public id: string, public type: T) {}

	public setCallback(fn: ComponentFunction<T>) {
		this.run = fn;

		return this;
	}
}

type ComponentFunction<T extends keyof ComponentTypes> = (
	client: Bot,
	interaction: ComponentTypes[T],
) => Promise<unknown>;
