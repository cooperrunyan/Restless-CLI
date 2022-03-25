#!/usr/bin/env node

import { Program } from './models/Program.js';
import { getPackage } from './utils/getProjectRoot.js';

import { Collection } from './commands/collection/Collection.js';
import { GetStarted } from './commands/get-started/GetStarted.js';
import { Request } from './commands/requests/Request.js';
import { Send } from './commands/send/Send.js';
import { Host } from './commands/host/Host.js';
import { Cat } from './commands/cat/Cat.js';

new Program({
  root: true,
  name: 'rest',
  version: getPackage().version,
  description: 'A CLI-Based REST client',
  children: [Collection, Request, GetStarted, Send, Host, Cat],
});
