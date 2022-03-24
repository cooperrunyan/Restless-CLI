import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';

export const Rename = new Command({
  name: 'rename',
  description: 'Rename a collection',
  arguments: [
    {
      name: 'oldName',
      type: 'string',
      description: 'The old collection name',
      required: true,
    },
    {
      name: 'newName',
      type: 'string',
      description: 'The new collection name',
      required: true,
    },
  ],
  action(oldName: string, newName: string) {
    const user = getUser();
    let exists = false;

    for (const collection of user.collections) {
      if (collection.name === newName) throw new Error('The new name is already in use by a different collection');
    }

    for (const collection of user.collections) {
      if (collection.name === oldName) {
        collection.name = newName;

        if (user.currentSelectedCollection === oldName) user.currentSelectedCollection = newName;

        exists = true;
        break;
      }
    }

    if (!exists) throw new Error('Could not find a collection with that name');

    updateUser(user);
  },
});
