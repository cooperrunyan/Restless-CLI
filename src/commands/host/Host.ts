import { Command } from '../../models/Command.js';

import { Set as SetCommand } from './children/Set.js';
import { Rename } from './children/Rename.js';

export const Host = new Command({
  name: 'host',
  description: 'Manage all selected hosts',
  aliases: ['h'],
  children: [SetCommand, Rename],
});
