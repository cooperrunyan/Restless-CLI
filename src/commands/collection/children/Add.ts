import { Command } from '../../../models/Command.js';

export const Add = new Command({
  name: 'add',
  description: 'Add a collection',
  aliases: ['a', 'create', 'make'],
  arguments: [
    {
      name: 'name',
      description: 'The collection name',
      required: true,
    },
  ],
  action() {},
});
