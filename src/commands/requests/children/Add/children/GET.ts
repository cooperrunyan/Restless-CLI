import { Command } from '../../../../../models/Command.js';
import { defaultOptions } from '../defaultReqOptions.js';

export const GET = new Command({
  name: 'get',
  aliases: ['GET'],
  description: 'GET request',
  options: [...defaultOptions],
  arguments: [
    {
      name: 'name',
      description: 'Create a GET request',
      required: true,
    },
  ],
  action(name: string) {
    console.log(`New GET request with the name: ${name}`);
  },
});
