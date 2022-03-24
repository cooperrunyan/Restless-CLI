import chalk from 'chalk';

export function error(str: string, type: string) {
  console.log(`
  ${chalk.bold.red(`Error: ${type}`)}

  ${chalk.bold('Message:')}

    ${color(trim(str)).split('\n').join('\n    ')}
  `);

  process.exit(1);
}

function trim(str: any) {
  str = str.split('');
  let lastSplit = 0;
  for (let i = 0; i < str.length; i++) {
    if (i % 70 <= 69 && i % 70 >= 60) {
      if (str[i] === ' ' && lastSplit < i - 20) {
        lastSplit = i;
        // (str as any[]).splice(i, 0, '\n');
        str[i] = '\n';
        continue;
      }
    }
  }
  return str.join('');
}

function color(str: string) {
  return str.replaceAll(/`.+`/gi, (c) => chalk.yellow('`') + chalk.green(c.replaceAll('`', '')) + chalk.yellow('`'));
}
