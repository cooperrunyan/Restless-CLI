import { Program } from './models/Program.js';
import { Collection } from './commands/collection/Collection.js';
import { GetStarted } from './commands/get-started/GetStarted.js';
import { createUser } from './utils/user.js';

new Program({
  name: 'rest',
  version: '0.0.0',
  description: 'A CLI-Based REST client',
  children: [Collection, GetStarted],
  action() {
    createUser();
  },
});
