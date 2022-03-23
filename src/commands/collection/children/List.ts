import { getUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';

export const List = new Command({
  name: 'list',
  description: 'List all collections',
  aliases: ['l'],
  arguments: [],
  action() {
    const user = getUser();
    const collections = user.collections.map((collection) => collection.name);

    console.log(collections.join('\n'));
  },
});
