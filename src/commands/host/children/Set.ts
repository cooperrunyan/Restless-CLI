import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { trim } from '../../../utils/trim.js';
import { error } from '../../../utils/error.js';
import chalk from 'chalk';

export const Set = new Command({
  name: 'set',
  aliases: ['s'],
  description: 'Add or update a host',
  arguments: [
    {
      name: 'indentifier',
      type: 'string',
      description: 'The name to indentify the host',
      required: true,
    },
    {
      name: 'url',
      type: 'string',
      description: 'Url to the host (ex. http://localhost:4000)',
      required: true,
    },
  ],
  action(indentifier: string, url, options) {
    const user = getUser(options.local);
    if (!user.currentSelectedCollection)
      throw error(
        'No current collection to work on. Run `collection list` to see available collections, then to select one, run `collection use <name>`. To create one, run `collection add <name>`, the new collection will be automatically selected to use.',
        'Not Found',
      );
    for (const collection of user.collections) {
      if (collection.name === user.currentSelectedCollection) {
        let link = trim(url, false);

        try {
          new URL(link);
        } catch (err) {
          try {
            new URL(url);
            link = url;
          } catch (err) {
            throw error('That is not a valid URL.', 'Invalid Arguments');
          }
        }

        collection.hosts[indentifier] = link;
      }
    }
    updateUser(user,options.local);
    console.log(`
  ${chalk.bold.green('Successfully')} set host ${chalk.bold(indentifier)} to reference the url: ${chalk.bold(url)}
      `);
  },
});
