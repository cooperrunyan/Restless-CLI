import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { trim } from '../../../utils/trim.js';

export const SetHost = new Command({
  name: 'set-host',
  description: 'Set a host',
  arguments: [
    {
      name: 'indentifier',
      description: 'The name to indentify the host',
      required: true,
    },
    {
      name: 'url',
      description: 'Url to the host (ex. http://localhost:4000)',
      required: true,
    },
  ],
  action(indentifier: string, url) {
    const user = getUser();
    if (!user.currentSelectedCollection) throw new Error('No current collection to work on');
    for (const collection of user.collections) {
      if (collection.name === user.currentSelectedCollection) {
        collection.hosts[indentifier] = trim(url, false);
      }
    }
    updateUser(user);
  },
});
