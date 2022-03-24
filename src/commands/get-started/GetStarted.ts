import { Command } from '../../models/Command.js';

export const GetStarted = new Command({
  name: 'get-started',
  aliases: ['gs'],
  description: 'Get help with getting started',
  action() {},
});
