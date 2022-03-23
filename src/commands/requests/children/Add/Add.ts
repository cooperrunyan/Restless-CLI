import { Command } from '../../../../models/Command.js';

import { GET } from './children/GET.js';

export const Add = new Command({
  name: 'add',
  aliases: ['a'],
  description: 'Create a request',
  children: [GET],
});
