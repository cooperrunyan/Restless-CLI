import { getUser, updateUser } from '../../../utils/user.js';
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
  action(name: string) {
    const user = getUser();

    for (const collection of user.collections) {
      if (collection.name === name) throw new Error('That name is already in use');
    }

    user.collections.push({
      name,
      requests: [],
    });

    user.currentSelectedCollection = name;

    updateUser(user);
  },
});
