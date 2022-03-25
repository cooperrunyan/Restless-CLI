import { getUser, updateUser } from '../../../utils/user.js';
import { error } from '../../../utils/error.js';
import { Command } from '../../../models/Command.js';
import chalk from 'chalk';

export const Rename = new Command({
  name: 'rename',
  description: 'Rename a collection',
  arguments: [
    {
      name: 'old-name',
      type: 'string',
      description: 'The old collection name',
      required: true,
    },
    {
      name: 'new-name',
      type: 'string',
      description: 'The new collection name',
      required: true,
    },
  ],
  action(oldName: string, newName: string, options) {
    const user = getUser(options.local);
    let exists = false;

    for (const collection of user.collections) {
      if (collection.name === newName)
        throw error('The new name is already in use by a different collection. Run `collection list` to see all used collection names.', 'Not Available');
    }

    for (const collection of user.collections) {
      if (collection.name === oldName) {
        collection.name = newName;

        if (user.currentSelectedCollection === oldName) user.currentSelectedCollection = newName;

        exists = true;
        break;
      }
    }

    if (!exists) throw error('Could not find a collection with that name. Run `collection list` to see all available collections.', 'Not Found');

    updateUser(user, options.local);
    console.log(`
  ${chalk.bold.green('Successfully')} switched renamed collection from ${chalk.bold(oldName)} to ${chalk.bold(newName)}
    `);
  },
});
