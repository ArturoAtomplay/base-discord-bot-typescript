import Bot from './Bot';
import {
  ChatInputCommandInteraction,
  SharedSlashCommandOptions,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from 'discord.js';

export class CommandBuilder extends SlashCommandBuilder {
  cmdType = 'slash';
  run!: CommandFunction;

  public addSubcommand(
    input:
      | SlashCommandSubcommandBuilder
      | ((
          subcommandGroup: SlashCommandSubcommandBuilder
        ) => SlashCommandSubcommandBuilder)
  ): SlashCommandSubcommandsOnlyBuilder {
    super.addSubcommand(input);
    return this;
  }

  public addSubcommandGroup(
    input:
      | SlashCommandSubcommandGroupBuilder
      | ((
          subcommandGroup: SlashCommandSubcommandGroupBuilder
        ) => SlashCommandSubcommandGroupBuilder)
  ): SlashCommandSubcommandsOnlyBuilder {
    super.addSubcommandGroup(input);
    return this;
  }

  public setCallback(fn: CommandFunction) {
    this.run = fn;

    return this;
  }
}

interface SlashCommandSubcommandsOnlyBuilder
  extends Omit<
    CommandBuilder,
    Exclude<keyof SharedSlashCommandOptions, 'options'>
  > {}

type CommandFunction = (
  interaction: ChatInputCommandInteraction,
  client: Bot
) => Promise<unknown>;
