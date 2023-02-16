import { ApplicationCommandType } from 'discord.js';
import ContextMenuBuilder from '../../structures/ContextMenuBuilder';

export default new ContextMenuBuilder<'User'>()
  .setName('ctx_menu_test')
  .setType(ApplicationCommandType.User)
  .setCallback(async (interaction, client) => {
    const { username } = interaction.targetUser;
    interaction.reply(`hi ${username}`);
  });
