import config from './config';
import { REST, Routes } from 'discord.js';
import getCommands from './helpers/Commands';
(async () => {
  const commands = (await getCommands()).filter((c) => c.toJSON());

  const rest = new REST({ version: '10' }).setToken(config.TOKEN);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
