import chalk from 'chalk';

export function help(cmd: any, root: boolean = false): string {
  return (
    `${header(
      {
        name: cmd.input.name,
        description: cmd.input.description,
        version: root ? '0.0.7' : '',
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
  ${chalk.bold('Usage:')}   ${chalk.magenta(
    `${name}${args && args[0] ? ' ' + args.join(' ') : ''} ${cmd.input.children && cmd.input.children[0] ? '<command>' : '[options]'}`,
  )}
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
  const maxArr1 = childs.map((child: any) => {
    return `${[child.name, ...(child.aliases || []).map((a: string) => a)].join(', ')}`;
  });

  let max = 0;
  for (const max1 of maxArr1) {
    max = Math.max(max, max1.length);
  }

  childs.map((child: any) => {
    return `${maxArr1[childs.indexOf(child)].padEnd(max + 2)}`;
  });

  const childCommands = childs.map((child: any) => {
    if (!child.arguments) return '';
    return child.arguments.map((arg: any) => `${arg.required ? '<' : '['}${arg.name}:${arg.type}${arg.required ? '>' : ']'}`).join(' ');
  });
  console.log(childCommands);

  let max2 = 0;
  for (const max1 of childCommands) {
    max2 = Math.max(max2, max1.length);
  }

  return `
  ${chalk.bold('Commands:')}

    ${childs
      .map((child: any) => {
        const command = maxArr1[childs.indexOf(child)]
          .padEnd(max + 4)
          .split(',')
          .map((c: any) => chalk.blue(c))
          .join(',');

        const arg = childCommands[childs.indexOf(child)]
          .padEnd(max2 + 2)
          .split(':')
          .map((c: string) =>
            c
              .split('')
              .map((char) => (!['<', '>', '[', ']'].includes(char) ? chalk.magenta(char) : chalk.yellow(char)))
              .join(''),
          )
          .join(chalk.yellow(':'));

        const description = child.description;

        return `${command}${arg} ${chalk.red('-')} ${description}`;
      })
      .join('\n    ')}
  `;
}
