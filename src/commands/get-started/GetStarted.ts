import { Command } from '../../models/Command.js'


export const GetStarted = new Command({
  name: 'get-started',
  aliases: ['getting-started', 'init-help', 'gs'],
  description: 'Get help with getting started',
  action() {}
})