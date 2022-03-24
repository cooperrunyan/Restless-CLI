import type { CommandInput } from '../types/CommandInput.js';
import { Command } from './Command.js';

export class Program extends Command {
  constructor(input: CommandInput) {
    super(input);

    this.addHelpText('after', 'dfgadfgdsfgdfg');

    this.parse(process.argv);
  }
}
