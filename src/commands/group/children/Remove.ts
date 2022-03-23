import { Command } from '../../../models/Command.js';

export const Remove = new Command({
  name: 'remove',
  description: 'Remove a group',
  aliases: ['rm', 'delete'],
  arguments: [
    {
      name: 'name',
      description: 'The name of the group to delete',
      required: true,
    },
  ],
  action() {},
});
