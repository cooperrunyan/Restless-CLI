import { Program } from './commands/Program.js';

new Program({
  name: 'restless',
  version: '0.0.0',
  aliases: [],
  arguments: [],
  options: [],
  action() {
    console.log('hello world');
  },
});
