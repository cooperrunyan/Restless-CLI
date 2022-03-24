import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';

export const Use = new Command({
  name: 'use',
  aliases: ['u'],
  description: 'Start using a certain collection',
  arguments: [
    {
      name: 'name',
      type: 'string',
      description: 'The name of the collection to start using',
    },
  ],
  action(name: string) {
    const user = getUser();
    let exists = false;

    for (const collection of user.collections) {
      if (collection.name === name) {
        user.currentSelectedCollection = name;
        exists = true;
        break;
      }
    }

    if (!exists) throw new Error('Could not find a collection by that name');

    updateUser(user);
  },
});
