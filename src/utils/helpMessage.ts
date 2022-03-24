import chalk from 'chalk';

export function help(cmd: any, root: boolean = false): string {
  return (
    `${header(
      {
        name: cmd.input.name,
        description: cmd.input.description,
        version: root ? '0.0.3' : '',
        aliases: cmd.input.aliases,
      },
      cmd,
    )}
  ${cmd.input.children ? children(cmd.input.children.map((child: any) => child.input)) : ''}${cmd.input.options ? options(cmd.input.options) : ''}
`
      .replaceAll('\n\n\n', '\n\n')
      .trimEnd() + '\n\n'
  );
}

function header({ name, version, description, aliases }: any, cmd: any) {
  const args = cmd.input.arguments?.map((arg: any) => `${arg.required ? '<' : '['}${arg.name}${arg.required ? '>' : ']'}`) || [];
  return `
  ${chalk.bold('Usage:')}   ${chalk.magenta(`${name}${args && args[0] ? ' ' + args.join(' ') : ''} [options]`)}
  ${aliases ? `${chalk.bold('Aliases:')} ${chalk.bold('[')}${aliases.map((alias: string) => chalk.blue(alias)).join(', ')}${chalk.bold(']')}\n  ` : ''}${
    version ? `${chalk.bold('Version:')} ${chalk.yellow(version)}\n` : ''
  }
  ${chalk.bold('Description:')}

    ${description}`;
}

function options(opts: any) {
  const processed =
    opts?.map((opt: any) => {
      return {
        ...opt,
        args: opt.flag
          .split(',')
          .map((f: string) => chalk.blue(f.trim()))
          .join(', '),
      };
    }) || [];

  const types = opts.map((opt: any) =>
    opt.name ? ' ' + chalk.yellow('<') + chalk.magenta(opt.name + (opt.type ? ':' + opt.type : '')) + chalk.yellow('>') : '',
  );

  let maxLength = 0;
  for (const x of processed.map((p: any) => p.args)) {
    maxLength = Math.max(x.length, maxLength);
  }
  let maxLength2 = 0;
  for (const x of types) {
    maxLength2 = Math.max(x.length, maxLength2);
  }

  return `
  ${chalk.bold('Options:')}

    ${processed
      .map((opt: any) => {
        return `${opt.args.padEnd(maxLength + 2)}${types[processed.indexOf(opt)].padEnd(maxLength2 + 4)}${chalk.red('-')} ${opt.description}`.replaceAll(
          '                 ',
          '       ',
        );
      })
      .join('\n    ')}`;
}

function children(childs: any) {
  const cmds = childs.map((child: any) => {
    return `${[chalk.blue(child.name), ...(child.aliases || []).map((a: string) => chalk.blue(a))].join(', ')}`;
  });

  let max = 0;
  for (const cmd of cmds) {
    max = Math.max(max, cmd.length);
  }

  return `
  ${chalk.bold('Commands:')}

    ${cmds
      .map((cmd: string) => `${cmd.padEnd(max + 4)} ${chalk.red('-')} ${childs[cmds.indexOf(cmd)].description}`)
      .join('\n    ')
      .replaceAll('                 ', '       ')}`;
}
