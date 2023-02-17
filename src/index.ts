import config from './config';
import getCommands from './helpers/Commands';
import readDirectory from './helpers/readDirectory';
import Bot from './structures/Bot';
import { ComponentBuilder } from './structures/ComponentBuilder';
import { EventBuilder } from './structures/EventBuilder';
import { join } from 'path';

const client = new Bot({ intents: [513] }); //https://ziad87.net/intents/
(async () => {
  // EVENT LOADER //
  const eventsDir = join(__dirname, 'events');

  for (const eventFile of readDirectory(eventsDir)) {
    const { default: event }: { default: EventBuilder } = await import(
      join(eventsDir, eventFile)
    );

    if (!event.once)
      client.on(event.name, (...args) => void event.run(client, ...args));
    else client.once(event.name, (...args) => void event.run(client, ...args));
  }

  // COMMAND LOADER //
  const commands = await getCommands();

  for (const cmd of commands) {
    client.commands.set(cmd.name, cmd);
  }

  // COMPONENT LOADER //
  const componentsDir = join(__dirname, 'components');

  for (const category of readDirectory(componentsDir)) {
    const componentFiles = readDirectory(join(componentsDir, category), true);

    for (const componentFile of componentFiles) {
      const { default: component }: { default: ComponentBuilder } =
        await import(join(componentsDir, category, componentFile));
      client.components.set(component.id, component);
    }
  }
})();

client.login(config.TOKEN);
