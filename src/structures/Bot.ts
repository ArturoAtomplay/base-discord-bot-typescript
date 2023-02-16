import logger from "../helpers/logger";
import { CommandBuilder } from "./CommandBuilder";
import { ComponentBuilder } from "./ComponentBuilder";
import ContextMenuBuilder from "./ContextMenuBuilder";
import { Client, Collection } from "discord.js";

export default class Bot extends Client {
	public commands = new Collection<
		string,
		CommandBuilder | ContextMenuBuilder
	>();
	public components = new Collection<string, ComponentBuilder>();
	public logger = logger;
}
