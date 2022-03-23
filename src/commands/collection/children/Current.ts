import { Command } from '../../../models/Command.js';
import { getUser, updateUser } from '../../../utils/user.js';

export const Current = new Command({
  name: 'current',
  aliases: ['c'],
  description: 'Get current selected collection',
  action() {
    const user = getUser();
    console.log(user.currentSelectedCollection);
  },
});
