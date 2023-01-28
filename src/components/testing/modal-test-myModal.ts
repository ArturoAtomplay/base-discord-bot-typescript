import { ComponentBuilder } from "../../structures/ComponentBuilder";

export default new ComponentBuilder("modal-test-myModal", "Modal").setCallback(
	async (client, interaction) => {
		interaction.reply("modal test completed");
	},
);
