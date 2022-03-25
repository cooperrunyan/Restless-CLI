import chalk from 'chalk';
import { Command } from '../../../models/Command.js';
import { getUser, updateUser } from '../../../utils/user.js';

export const Current = new Command({
  name: 'current',
  aliases: ['c'],
  description: 'Get current selected collection',
  action(options) {
    const user = getUser(options.local);
    console.log(`
  ${chalk.bold('Current Collection:')}

    ${user.currentSelectedCollection ? chalk.blue(user.currentSelectedCollection) : chalk.grey('undefined')}
      `);
  },
});
