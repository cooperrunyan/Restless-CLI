import { getUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import chalk from 'chalk';

export const List = new Command({
  name: 'list',
  description: 'List all collections',
  aliases: ['l'],
  arguments: [],
  action(options) {
    const user = getUser(options.local);
    const collections = user.collections.map((collection) => collection.name);

    console.log(`
  ${chalk.bold('Collections:')}

    ${collections && collections[0] ? collections.map((collection) => chalk.blue(collection)).join('\n    ') : chalk.red('None')}
    `);
  },
});
