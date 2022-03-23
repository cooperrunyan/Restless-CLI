import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';

export const Remove = new Command({
  name: 'remove',
  description: 'Remove a collection',
  aliases: ['rm', 'delete'],
  arguments: [
    {
      name: 'name',
      description: 'The name of the collection to delete',
      required: true,
    },
  ],
  action(name: string) {
    const user = getUser();
    let exists = false;

    for (const collection of user.collections) {
      if (collection.name === name) {
        user.collections.splice(user.collections.indexOf(collection), 1);
        exists = true;
        break;
      }
    }

    if (!exists) throw new Error('Could not find a collection with that name');

    updateUser(user);
  },
});
