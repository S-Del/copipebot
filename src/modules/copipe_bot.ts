import { Client } from 'discord.js';
import { defineCommand } from './commands/command';

export const createClient = (): Client => {
  const client = new Client();
  defineCommand(client);

  return client;
};
