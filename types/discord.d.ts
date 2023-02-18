import type Bot from '../src/structures/Bot';

declare module 'discord.js' {
  interface Client {
    commands: Bot['commands'];
    components: Bot['components'];
  }
}
