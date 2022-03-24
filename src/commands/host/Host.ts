import { Command } from '../../models/Command.js';

import { Set } from './children/Set.js';

export const Host = new Command({
  name: 'host',
  description: 'Manage all selected hosts',
  aliases: ['h'],
  children: [Set],
});
