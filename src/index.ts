import { Program } from './models/Program.js';
import { Collection } from './commands/collection/Collection.js';

new Program({
  name: 'rest',
  version: '0.0.0',
  description: 'A CLI-Based REST client',
  aliases: [],
  arguments: [],
  options: [],
  children: [Collection],
  action() {},
});
