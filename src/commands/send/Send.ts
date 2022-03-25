import { safeToSend } from '../../checks/safeToSend.js';
import { getUser } from '../../utils/user.js';
import { error } from '../../utils/error.js';
import { Command } from '../../models/Command.js';
import type { Method } from 'src/types/Request.js';
import fetch from 'node-fetch';
import chalk from 'chalk';
import yml from 'yaml';

export const Send = new Command({
  name: 'send',
  aliases: ['s'],
  description: 'Send a request',
  arguments: [
    {
      name: 'request-name',
      type: 'string',
      description: 'The name of the request to send',
      required: true,
    },
  ],
  options: [
    {
      flag: '-r, --raw',
      description: 'Ouput response as raw JSON',
      type: 'boolean',
    },
    {
      flag: '-c, --collapse',
      description: 'If --raw is true, minify JSON output',
      type: 'boolean',
    },
  ],
  async action(name: string, options) {
    const user = getUser();
    let exists = false;
    for (const collection of user.collections) {
      for (const request of collection.requests) {
        if (request.name !== name) continue;
        exists = true;
        const reqs = safeToSend(name, collection);

        const req = reqs as unknown as {
          parsedURL: string;
          headers: [string, string][];
          endpoint: string;
          method: Method;
          body: string;
        };

        const url = new URL(req.endpoint, req.parsedURL).href;

        let status;
        try {
          const response = await fetch(url, {
            body: req.body,
            headers: req.headers,
            method: req.method,
          });
          status = response.status;
          let data = await response.text();

          try {
            data = JSON.parse(data);
          } catch {
            try {
              data = yml.parse(data);
            } catch {}
          }

          if (options.raw) {
            try {
              let d = options.collapse ? JSON.stringify(JSON.parse(data)) : JSON.stringify(JSON.parse(data), null, 2);

              process.stdout.write(d + '\n');
            } catch {}
          } else {
            const firstStatusChar = response.status.toString().split('')[0];
            const statusColor =
              firstStatusChar === '2'
                ? 'green'
                : firstStatusChar === '4' || firstStatusChar === '5'
                ? 'red'
                : firstStatusChar === '1'
                ? 'blue'
                : firstStatusChar === '3'
                ? 'magenta'
                : ('grey' as const);
            console.log(`
  ${chalk.bold(`Status: ${chalk[statusColor](response.status)}`)}

  ${chalk.bold(`Body:`)}

    ${typeof data === 'string' ? chalk.green(`"${data}"`) : parseJSONData(data)}
  `);
          }
        } catch (err: any) {
          if (err.erroredSysCall === 'connect') console.log('ERROR: Could not connect');
          if (/unexpected token.+JSON/gi.test(err.message)) {
          } else {
          }
        }
      }
      if (!exists)
        return error(
          'Could not find a request by that name in the current collection. Run `collection current` to verify that you are using the correct collection. Run `collection use <name>` to use a collection, `collection list` to see all, and `collection add <name>` to make one.',
          'Not Found',
        );
    }
  },
});

function parseJSONData(data: string) {
  data = JSON.stringify(data, null, 2).replaceAll('\n', '\n    ');

  const j = {
    replacer: function (match: any, pIndent: any, pKey: any, pVal: any, pEnd: any) {
      var key = 'RESTLESS_STYLE_KEY';
      var val = 'RESTLESS_STYLE_VALUE';
      var str = 'RESTLESS_STYLE_STRING';
      var r = pIndent || '';
      if (pKey) r = r + key + pKey.replace(/[": ]/g, '') + 'RESTLESS_STYLE_END: ';
      if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + 'RESTLESS_STYLE_END';
      return r + (pEnd || '');
    },
    prettyPrint(obj: object) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
      return JSON.stringify(obj, null, 2).replace(jsonLine, j.replacer);
    },
  };

  data;
  data = j
    .prettyPrint(JSON.parse(data))
    .replaceAll(/RESTLESS_STYLE_KEY(\w+)RESTLESS_STYLE_END/gms, (c) => chalk.red(c.replaceAll('RESTLESS_STYLE_KEY', '"').replaceAll('RESTLESS_STYLE_END', '"')))
    .replaceAll(/RESTLESS_STYLE_STRING"\w+"RESTLESS_STYLE_END/gms, (c) =>
      chalk.green(c.replaceAll('RESTLESS_STYLE_STRING', '').replaceAll('RESTLESS_STYLE_END', '')),
    )
    .replaceAll(/RESTLESS_STYLE_VALUE(\w+)RESTLESS_STYLE_END/gms, (c) =>
      chalk.yellow(c.replaceAll('RESTLESS_STYLE_VALUE', '').replaceAll('RESTLESS_STYLE_END', '')),
    )
    .replaceAll('\n', '\n    ')

    .replaceAll('{', chalk.grey('{'))
    .replaceAll('}', chalk.grey('}'))
    .replaceAll(' [ ', chalk.grey(' [ '))
    .replaceAll(' [\n', chalk.grey(' [\n'))
    .replaceAll(' ] ', chalk.grey(' ] '))
    .replaceAll(' ]\n', chalk.grey(' ]\n'));

  return data;
}
