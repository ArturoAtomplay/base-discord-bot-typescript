import { EventBuilder } from '../structures/EventBuilder';

import type { CommandBuilder } from '../structures/CommandBuilder';
import type { ComponentBuilder } from '../structures/ComponentBuilder';
import type ContextMenuBuilder from '../structures/ContextMenuBuilder';

export default new EventBuilder('interactionCreate').setCallback(
  async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands
        .filter((c) => c.cmdType === 'slash')
        .get(interaction.commandName) as CommandBuilder | undefined;

      if (!cmd)
        return interaction.reply({
          content: "Sorry, that command doesn't exist.",
          ephemeral: true,
        });

      try {
        await cmd.run(interaction, client);
      } catch (error) {
        client.logger.error(
          error,
          `An error occurred while running the '${interaction.commandName}' command. Please check the code and try again.`,
        );
      }
    }

    if (
      interaction.isUserContextMenuCommand() ||
      interaction.isMessageContextMenuCommand()
    ) {
      const cmd = client.commands
        .filter((c) => c.cmdType === 'context')
        .get(interaction.commandName) as ContextMenuBuilder | undefined;

      if (!cmd)
        return interaction.reply({
          content: "Sorry, that context menu command doesn't exist.",
          ephemeral: true,
        });

      try {
        await cmd.run(interaction, client);
      } catch (error) {
        client.logger.error(
          error,
          `An error occurred while running the '${interaction.commandName}' context menu command. Please check the code and try again.`,
        );
      }
    }

    if (interaction.isButton()) {
      const buttonComponent = client.components
        .filter((c) => c.type === 'Button')
        .get(interaction.customId) as ComponentBuilder<'Button'> | undefined;

      if (!buttonComponent)
        return interaction.reply({
          content: 'Sorry, this button does not exist.',
          ephemeral: true,
        });

      try {
        buttonComponent.run(client, interaction);
      } catch (error) {
        client.logger.error(
          error,
          `An error occurred while running the '${interaction.customId}' button. Please check the code and try again.`,
        );
      }
    }

    if (interaction.isStringSelectMenu()) {
      const selectMenuComponent = client.components
        .filter((c) => c.type === 'SelectMenu')
        .get(interaction.customId) as
        | ComponentBuilder<'SelectMenu'>
        | undefined;

      if (!selectMenuComponent)
        return interaction.reply({
          content: 'Sorry, this selectMenu does not exist.',
          ephemeral: true,
        });

      try {
        selectMenuComponent.run(client, interaction);
      } catch (error) {
        client.logger.error(
          error,
          `An error occurred while running the '${interaction.customId}' selectMenu. Please check the code and try again.`,
        );
      }
    }

    if (interaction.isModalSubmit()) {
      const modalComponent = client.components
        .filter((c) => c.type === 'Modal')
        .get(interaction.customId) as ComponentBuilder<'Modal'> | undefined;

      if (!modalComponent)
        return interaction.reply({
          content: 'Sorry, this modal does not exist.',
          ephemeral: true,
        });

      try {
        modalComponent.run(client, interaction);
      } catch (error) {
        client.logger.error(
          error,
          `An error occurred while running the '${interaction.customId}' modal. Please check the code and try again.`,
        );
      }
    }
  },
);
