import { Program } from './models/Program.js';
import { Group } from './commands/group/Group.js';

new Program({
  name: 'rest',
  version: '0.0.0',
  description: 'A CLI-Based REST client',
  aliases: [],
  arguments: [],
  options: [],
  children: [Group],
  action() {},
});
