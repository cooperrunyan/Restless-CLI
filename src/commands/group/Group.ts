import { Command } from '../../models/Command.js';
import { Add } from './children/Add.js';
import { List } from './children/List.js';
import { Remove } from './children/Remove.js';
import { Rename } from './children/Rename.js';

export const Group = new Command({
  name: 'group',
  description: 'Control API request groups',
  aliases: ['g', 'groups'],
  children: [Add, Rename, Remove, List],
  action() {},
});
