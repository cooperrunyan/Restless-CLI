import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { error } from '../../../utils/error.js';
import chalk from 'chalk';

export const Remove = new Command({
  name: 'remove',
  aliases: ['rm'],
  description: 'Remove an existing host',
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'The old name of the host',
      required: true,
    },
  ],
  action(name: string, options) {
    const user = getUser();
    if (!user.currentSelectedCollection)
      throw error(
        'No current collection to work on. Run `collection list` to see available collections, then to select one, run `collection use <name>`. To create one, run `collection add <name>`, the new collection will be automatically selected to use.',
        'Not Found',
      );
    let exists = false;
    for (const collection of user.collections) {
      if (collection.name !== user.currentSelectedCollection) continue;

      const host = collection.hosts[name];

      if (host) {
        delete collection.hosts[name];
        exists = true;
      }
    }
    if (!exists)
      throw error(
        'The requested host was not found in the current collection. Run `collection current` to make sure you have the correct collection selected.',
        'Not Found',
      );

    if (exists) {
      updateUser(user);
      console.log(`
  ${chalk.bold.green('Successfully')} removed host ${chalk.bold(name)}
      `);
    }
  },
});
