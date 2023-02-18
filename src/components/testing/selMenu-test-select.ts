import { ComponentBuilder } from '../../structures/ComponentBuilder';

export default new ComponentBuilder(
  'selMenu-test-select',
  'SelectMenu'
).setCallback(async (client, interaction) => {
  interaction.reply('select-menu test completed');
});
