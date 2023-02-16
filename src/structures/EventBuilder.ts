import Bot from './Bot';
import { ClientEvents } from 'discord.js';

export class EventBuilder<T extends keyof ClientEvents = keyof ClientEvents> {
  run!: EventFunction<T>;
  public constructor(public name: T, public once?: true) {}

  public setCallback(fn: EventFunction<T>) {
    this.run = fn;

    return this;
  }
}

type EventFunction<T extends keyof ClientEvents> = (
  client: Bot,
  ...args: ClientEvents[T]
) => Promise<unknown>;
