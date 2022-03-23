import { Command } from '../../../models/Command.js';

export const List = new Command({
  name: 'list',
  description: 'List all groups',
  aliases: ['l'],
  arguments: [],
  action() {},
});
