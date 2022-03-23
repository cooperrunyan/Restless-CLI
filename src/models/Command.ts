import * as commander from 'commander';
import type { CommandInput } from '~/types/CommandInput';

export class Command extends commander.Command {
  constructor(public input: CommandInput) {
    super(input.name);
    this.initialize(input);
  }

  private initialize(command: CommandInput) {
    this.version(command.version);
    this.name(command.name);

    this.action(command.action);

    for (const option of command.options) {
      this.option(option.flag, option.description, option.default);
    }

    for (const arg of command.arguments) {
      this.argument(wrapArgument(arg.name, !!arg.required), arg.description, arg.default);
    }

    for (const alias of command.aliases) {
      this.alias(alias);
    }

    if (command.children)
      for (const child of command.children) {
        this.addCommand(child);
      }
  }
}

function wrapArgument(str: string, required: boolean) {
  const open = required ? '<' : '[';
  const close = required ? '>' : ']';

  return `${open}${str}${close}`;
}
