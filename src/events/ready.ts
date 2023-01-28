import { EventBuilder } from "../structures/EventBuilder";

export default new EventBuilder("ready", true).setCallback(async (client) => {
	client.logger.info(`${client.user?.tag}: I am ready`);
});
