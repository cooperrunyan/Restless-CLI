import { Command } from '../../models/Command.js';

import { Set } from './children/Set.js';
import { Remove } from './children/Remove.js';

export const Request = new Command({
  name: 'request',
  aliases: ['req', 'r', 'rq'],
  description: 'Manage requests',
  children: [Set, Remove],
});
