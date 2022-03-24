import { Command } from '../../models/Command.js';

import { Add } from './children/Add.js';
import { List } from './children/List.js';
import { Remove } from './children/Remove.js';
import { Rename } from './children/Rename.js';
import { Use } from './children/Use.js';
import { Current } from './children/Current.js';
import { SetHost } from './children/SetHost.js';

export const Collection = new Command({
  name: 'collection',
  description: 'Control API request collections',
  aliases: ['c'],
  children: [Add, Rename, Remove, List, Use, Current, SetHost],
});
