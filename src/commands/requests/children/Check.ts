import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import type { Request } from '../../../types/Request.js';
import { safeToSend } from '../../../checks/safeToSend.js';
import chalk from 'chalk';

export const Check = new Command({
  name: 'check',
  aliases: ['c'],
  description: 'Check a request to see if it has enough information to be sent',
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'Request to be checked',
      required: true,
    },
  ],
  action(name: string, options) {
    const user = getUser();
    let val;
    for (const collection of user.collections) {
      for (const request of collection.requests) {
        if (request.name !== name) continue;
        val = safeToSend(name, collection);
      }
    }

    val
      ? console.log(`
  ${chalk.bold(name + ':')}

    ${chalk.bold.green('Ready')} to send.
    `)
      : null;
  },
});
