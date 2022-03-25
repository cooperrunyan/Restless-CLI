import { getUser } from '../../utils/user.js';
import { Command } from '../../models/Command.js';

export const Cat = new Command({
  name: 'cat',
  description: 'Show contents of the file that stores your data',
  options: [
    {
      description: 'Collapse output',
      flag: '-c, --collapse',
      type: '',
      default: false,
    },
  ],
  action(options: { collapse?: boolean }) {
    const user = getUser();
    const content = options.collapse ? JSON.stringify(user) : JSON.stringify(user, null, 2);
    process.stdout.write(content + '\n');
  },
});
