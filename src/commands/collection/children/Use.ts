import { Command } from '../../../models/Command.js';

export const Use = new Command({
  name: 'use',
  aliases: ['u'],
  description: 'Start using a certain collection',
  action() {},
});
