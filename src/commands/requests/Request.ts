import { Command } from '../../models/Command.js';

import { Add } from './children/Add.js';

export const Request = new Command({
  name: 'request',
  aliases: ['req', 'r', 'rq'],
  description: 'Manage requests',
  children: [Add],
});
