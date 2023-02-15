import config from "./config";
import Bot from "./structures/Bot";
import setEvents from "./helpers/setEvents";
import { setCommands } from "./helpers/Commands";
import setComponents from "./helpers/SetComponents";

const client = new Bot({ intents: [513] }); //https://ziad87.net/intents/

setEvents(client);
setCommands(client);
setComponents(client);

client.login(config.TOKEN);