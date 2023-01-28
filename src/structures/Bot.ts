import logger from "../helpers/logger";
import { Client, Collection } from "discord.js";
import { CommandBuilder } from "./CommandBuilder";
import { ComponentBuilder } from "./ComponentBuilder";
import ContextMenuBuilder from "./ContextMenuBuilder";

export default class Bot extends Client {
	public commands = new Collection<
		String,
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		CommandBuilder | ContextMenuBuilder<any>
	>();
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	public components = new Collection<String, ComponentBuilder<any>>();
	public logger = logger;
}
