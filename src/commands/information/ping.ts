import { CommandBuilder } from "../../structures/CommandBuilder";

export default new CommandBuilder()
	.setName("ping")
	.setDescription("shows the bot lancency")
	.setCallback(async (interaction, client) => {
		interaction.reply(`Ping ${client.ws.ping}ms`);
	});
