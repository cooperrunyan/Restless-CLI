import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import type { Request } from '../../../types/Request.js';
import chalk from 'chalk';

export const Remove = new Command({
  name: 'remove',
  aliases: ['rm'],
  description: 'Remove an existing request',
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'Request to be removed',
      required: true,
    },
  ],
  action(name: string) {
    const user = getUser();

    for (const collection of user.collections) {
      for (const request of collection.requests) {
        if (request.name === name) collection.requests.splice(collection.requests.indexOf(request), 1);
      }
    }

    updateUser(user);
    console.log(`
    ${chalk.bold.green('Successfully')} deleted request ${chalk.grey(name)}
    `);
  },
});
