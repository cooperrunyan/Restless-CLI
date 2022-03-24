import type { CommandInput } from '../types/CommandInput.js';
import { Command } from './Command.js';

export class Program extends Command {
  constructor(input: CommandInput & { root: boolean }) {
    super(input);

    try {
      this.parse(process.argv);
    } catch (err) {
      console.log('d');
    }
  }
}
