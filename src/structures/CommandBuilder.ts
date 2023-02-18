import Bot from './Bot';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class CommandBuilder extends SlashCommandBuilder {
  cmdType = 'slash';
  run!: CommandFunction;

  public setCallback(fn: CommandFunction) {
    this.run = fn;

    return this;
  }
}

type CommandFunction = (
  interaction: ChatInputCommandInteraction,
  client: Bot
) => Promise<unknown>;
