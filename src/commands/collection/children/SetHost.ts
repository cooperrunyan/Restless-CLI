import { getUser, updateUser } from '../../../utils/user.js';
import { Command } from '../../../models/Command.js';
import { trim } from '../../../utils/trim.js';
import { error } from '../../../utils/error.js';

export const SetHost = new Command({
  name: 'set-host',
  description: 'Set a host',
  arguments: [
    {
      name: 'indentifier',
      type: 'string',
      description: 'The name to indentify the host',
      required: true,
    },
    {
      name: 'url',
      type: 'string',
      description: 'Url to the host (ex. http://localhost:4000)',
      required: true,
    },
  ],
  action(indentifier: string, url) {
    const user = getUser();
    if (!user.currentSelectedCollection)
      throw error(
        'No current collection to work on. Run `collection list` to see available collections, then to select one, run `collection use <name>`. To create one, run `collection add <name>`, the new collection will be automatically selected to use.',
        'Not Found',
      );
    for (const collection of user.collections) {
      if (collection.name === user.currentSelectedCollection) {
        collection.hosts[indentifier] = trim(url, false);
      }
    }
    updateUser(user);
  },
});
