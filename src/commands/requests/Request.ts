import { Command } from '../../models/Command.js';

import { Set as SetCommand } from './children/Set.js';
import { Remove } from './children/Remove.js';
import { Check } from './children/Check.js';

export const Request = new Command({
  name: 'request',
  aliases: ['r'],
  description: 'Manage requests',
  children: [SetCommand, Remove, Check],
});
