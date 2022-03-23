import { Command } from '../../../models/Command.js';

export const Add = new Command({
  name: 'add',
  description: 'Add a group',
  aliases: ['a'],
  arguments: [
    {
      name: 'name',
      description: 'The group name',
      required: true,
    },
  ],
  action() {},
});
