import { Command } from '../../../models/Command.js';

export const Rename = new Command({
  name: 'rename',
  description: 'Rename a group',
  arguments: [
    {
      name: 'oldName',
      description: 'The old group name',
      required: true,
    },
    {
      name: 'newName',
      description: 'The new group name',
      required: true,
    },
  ],
  action() {},
});
