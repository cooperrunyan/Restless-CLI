import { getUser, updateUser } from '../../../utils/user.js';
import { error } from '../../../utils/error.js';
import { Command } from '../../../models/Command.js';
import chalk from 'chalk';

export const Use = new Command({
  name: 'use',
  aliases: ['u'],
  description: 'Start using a certain collection',
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'The name of the collection to start using',
    },
  ],
  action(name: string, options) {
    const user = getUser();
    let exists = false;

    for (const collection of user.collections) {
      if (collection.name === name) {
        user.currentSelectedCollection = name;
        exists = true;
        break;
      }
    }

    if (!exists) return error('Could not find a collection with that name. Run `collection list` to see all available collections.', 'Not Found');

    updateUser(user);

    console.log(`
  ${chalk.bold.green('Successfully')} switched current collection to ${chalk.bold(name)}
    `);
  },
});
