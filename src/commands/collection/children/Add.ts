import { getUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';

export const Add = new Command({
  name: 'add',
  description: 'Add a collection',
  aliases: ['a', 'create', 'make'],
  arguments: [
    {
      name: 'name',
      description: 'The collection name',
      required: true,
    },
  ],
  action(name: string, options: { [key: string]: any }) {
    const user = getUser();
    user.collections.push({
      name,
      requests: [],
    });
  },
});
