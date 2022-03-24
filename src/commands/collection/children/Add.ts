import { getUser, updateUser } from '../../../utils/user.js';
import { error } from '../../../utils/error.js';
import { Command } from '../../../models/Command.js';

export const Add = new Command({
  name: 'add',
  description: 'Add a collection',
  aliases: ['a'],
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'The collection name',
      required: true,
    },
  ],
  action(name: string) {
    const user = getUser();

    for (const collection of user.collections) {
      if (collection.name === name)
        throw error(
          'That name has already been taken by a different collection. If you want to delete the old one, run `collection remove <collection-name>` to delete it, then rerun your creation command.',
          'Not Available',
        );
    }

    user.collections.push({
      name,
      requests: [],
      hosts: {},
    });

    user.currentSelectedCollection = name;

    updateUser(user);
  },
});
