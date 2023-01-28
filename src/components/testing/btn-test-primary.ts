import { ComponentBuilder } from "../../structures/ComponentBuilder";

export default new ComponentBuilder("btn-test-primary", "Button").setCallback(
	async (client, interaction) => {
		interaction.reply("button test completed");
	},
);
