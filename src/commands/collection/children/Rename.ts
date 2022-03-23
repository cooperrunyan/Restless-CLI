import { Command } from '../../../models/Command.js';

export const Rename = new Command({
  name: 'rename',
  description: 'Rename a collection',
  arguments: [
    {
      name: 'oldName',
      description: 'The old collection name',
      required: true,
    },
    {
      name: 'newName',
      description: 'The new collection name',
      required: true,
    },
  ],
  action() {},
});
