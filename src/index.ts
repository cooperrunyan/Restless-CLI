import { Program } from './models/Program.js';
import { Collection } from './commands/collection/Collection.js';
import { GetStarted } from './commands/get-started/GetStarted.js';

new Program({
  name: 'rest',
  version: '0.0.0',
  description: 'A CLI-Based REST client',
  children: [Collection, GetStarted],
});
