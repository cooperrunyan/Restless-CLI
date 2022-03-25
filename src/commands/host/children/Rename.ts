import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { error } from '../../../utils/error.js';
import chalk from 'chalk';

export const Rename = new Command({
  name: 'rename',
  aliases: ['r'],
  description: 'Rename an existing host',
  arguments: [
    {
      name: 'old-name',
      type: 'string',
      description: 'The old name of the host',
      required: true,
    },
    {
      name: 'new-name',
      type: 'string',
      description: 'The new name for the host',
      required: true,
    },
  ],
  action(oldName: string, newName: string, options) {
    const user = getUser(options.local);
    if (!user.currentSelectedCollection)
      throw error(
        'No current collection to work on. Run `collection list` to see available collections, then to select one, run `collection use <name>`. To create one, run `collection add <name>`, the new collection will be automatically selected to use.',
        'Not Found',
      );
    let exists = false;
    for (const collection of user.collections) {
      if (collection.name !== user.currentSelectedCollection) continue;

      const old = collection.hosts[oldName];

      if (old) {
        delete collection.hosts[oldName];
        collection.hosts[newName] = old;
        exists = true;
      }
    }
    if (!exists)
      throw error(
        'The requested host was not found in the current collection. Run `collection current` to make sure you have the correct collection selected.',
        'Not Found',
      );

    if (exists) {
      updateUser(user,options.local);
      console.log(`
  ${chalk.bold.green('Successfully')} changed host ${chalk.bold(oldName)} to ${chalk.bold(newName)}
      `);
    }
  },
});
