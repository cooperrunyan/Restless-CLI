import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { trim } from '../../../utils/trim.js';
import { error } from '../../../utils/error.js';
import chalk from 'chalk';

export const List = new Command({
  name: 'list',
  aliases: ['l'],
  description: 'Add or update a host',
  arguments: [],
  action() {
    let hosts = {};
    const user = getUser();
    if (!user.currentSelectedCollection)
      throw error(
        'No current collection to work on. Run `collection list` to see available collections, then to select one, run `collection use <name>`. To create one, run `collection add <name>`, the new collection will be automatically selected to use.',
        'Not Found',
      );
    for (const collection of user.collections) {
      if (collection.name === user.currentSelectedCollection) {
        hosts = collection.hosts;
      }
    }
    updateUser(user);
    console.log(`
  ${chalk.bold('Hosts:')}

    ${Object.entries(hosts)[0] ? Object.entries(hosts).map(([key, value]) => `${chalk.blue(key)}: ${chalk.grey(value)}`) : chalk.red('None')}
      `);
  },
});
