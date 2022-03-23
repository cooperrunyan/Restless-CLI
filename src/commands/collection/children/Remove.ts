import { Command } from '../../../models/Command.js';

export const Remove = new Command({
  name: 'remove',
  description: 'Remove a collection',
  aliases: ['rm', 'delete'],
  arguments: [
    {
      name: 'name',
      description: 'The name of the collection to delete',
      required: true,
    },
  ],
  action() {},
});
