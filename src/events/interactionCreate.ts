import { EventBuilder } from "../structures/EventBuilder";
import ContextMenuBuilder from "../structures/ContextMenuBuilder";

export default new EventBuilder("interactionCreate").setCallback(
	async (client, interaction) => {
		if (interaction.isChatInputCommand()) {
			const cmd = client.commands.get(interaction.commandName);

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
			const cmd = client.commands.get(interaction.commandName);

			if (!(cmd && cmd instanceof ContextMenuBuilder))
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

		if (interaction.isMessageComponent() || interaction.isModalSubmit()) {
			const component = client.components.get(interaction.customId);

			if (!component)
				return interaction.reply({
					content: "Sorry, that component does not exist.",
					ephemeral: true,
				});

			try {
				component.run(client, interaction);
			} catch (error) {
				client.logger.error(
					error,
					`An error occurred while running the '${interaction.customId}' component. Please check the code and try again.`,
				);
			}
		}
	},
);
