import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import chalk from 'chalk';

export const List = new Command({
  name: 'list',
  aliases: ['l'],
  description: 'List all requests in the current collection',
  action() {
    const user = getUser();

    let requests = (() => {
      for (const collection of user.collections) {
        if (collection.name === user.currentSelectedCollection) return collection.requests;
      }
      return;
    })();

    console.log(`
  ${chalk.bold('Requests:')}

    ${requests && requests[0] ? requests.map((request) => `${chalk.blue(request.name)}: ${chalk.grey(request.endpoint)}`).join('\n    ') : chalk.red('None')}
    `);
  },
});
