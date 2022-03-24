import * as commander from 'commander';
import type { CommandInput } from '../types/CommandInput';
import { help } from '../utils/helpMessage.js';

export class Command extends commander.Command {
  constructor(public input: CommandInput) {
    super(input.name);
    this.initialize(input);
  }

  private initialize(command: CommandInput) {
    if (command.version) this.version(command.version);

    if (command.name) this.name(command.name);
    if (command.description) this.description(command.description);
    if (command.action) this.action(command.action);

    const isRoot = !!(this.input as any).root;
    this.configureHelp({
      formatHelp(cmd) {
        return help(cmd, isRoot);
      },
    });

    if (command.options)
      for (const option of command.options) {
        const f = [`${option.flag} ${option.name ? '<' + option.name + '>' : ''}`.trim(), option.description] as const;

        option.repeatable ? this.option(...f, accumulator, []) : this.option(...f, option.default);
      }

    if (command.arguments)
      for (const arg of command.arguments) {
        this.argument(wrapArgument(arg.name, !!arg.required), arg.description, arg.default);
      }

    if (command.aliases)
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

function accumulator(val: any, memo: any) {
  memo.push(val);
  return memo;
}
