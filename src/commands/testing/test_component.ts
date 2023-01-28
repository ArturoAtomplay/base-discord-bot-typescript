import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ModalBuilder,
	StringSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { CommandBuilder } from "../../structures/CommandBuilder";
// (although this is not as clean as I would like)
export default new CommandBuilder()
	.setName("test_component")
	.setDescription("checks that the test components are working")
	.addStringOption((o) =>
		o
			.setName("type")
			.setDescription("component type")
			.addChoices(
				{
					name: "button",
					value: "btn",
				},
				{
					name: "select-menu",
					value: "selMenu",
				},
				{
					name: "modal",
					value: "modal",
				},
			)
			.setRequired(true),
	)
	.setCallback(async (interaction, client) => {
		const type = interaction.options.getString("type", true);

		const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("btn-test-primary")
				.setLabel("Click me!")
				.setStyle(ButtonStyle.Primary),
		);

		const selectMenuRow =
			new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
				new StringSelectMenuBuilder()
					.setCustomId("selMenu-test-select")
					.setPlaceholder("Nothing selected")
					.addOptions(
						{
							label: "Select me",
							description: "This is a description",
							value: "first_option",
						},
						{
							label: "You can select me too",
							description: "This is also a description",
							value: "second_option",
						},
					),
			);

		const questionInput = new TextInputBuilder()
			.setCustomId("question")
			.setLabel("do you like the base of the bot?")
			.setStyle(TextInputStyle.Short);

		const modal = new ModalBuilder()
			.setCustomId("modal-test-myModal")
			.setTitle("My Modal")
			.addComponents(
				new ActionRowBuilder<TextInputBuilder>().addComponents(questionInput),
			);

		if (type === "modal") return await interaction.showModal(modal);

		await interaction.reply({
			content: "Pong!",
			components: [type === "btn" ? buttonRow : selectMenuRow],
		});
	});
