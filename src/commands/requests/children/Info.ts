import { safeToSend } from '../../../checks/safeToSend.js';
import { getUser } from '../../../utils/user.js';
import { error } from '../../../utils/error.js';
import { Command } from '../../../models/Command.js';
import type { Method } from 'src/types/Request.js';
import chalk from 'chalk';

export const Info = new Command({
  name: 'info',
  aliases: ['i'],
  description: 'Get the information about a request',
  arguments: [
    {
      name: 'request-name',
      type: 'string',
      description: 'The name of the request',
      required: true,
    },
  ],
  options: [
    {
      flag: '-b, --body',
      type: 'boolean',
      description: 'Examine the body of the request',
    },
    {
      flag: '-c, --collapse',
      type: 'boolean',
      description: 'If checking the body, collapse the response',
    },
  ],
  async action(name: string, options) {
    const user = getUser();
    let exists = false;
    for (const collection of user.collections) {
      for (const request of collection.requests) {
        if (request.name !== name) continue;
        exists = true;

        const reqs = safeToSend(name, collection, true);
        const req = reqs as unknown as {
          parsedURL: string;
          headers: [string, string][];
          endpoint: string;
          method: Method;
          body: string;
        };

        if (options.body) {
          process.stdout.write(
            (!options.collapse ? JSON.stringify(request.body || '{}', null, 2) : JSON.stringify(request.body || '{}'))
              .replaceAll('"{', '{')
              .replaceAll('\\', '')
              .replaceAll('}"', '}') + '\n',
          );
        } else {
          console.log(`
  ${chalk.bold(request.name + ':')}

    ${chalk.blue('Url') + ':'}      ${req.parsedURL || chalk.grey('undefined')}
    ${chalk.blue('Endpoint') + ':'} ${request.endpoint || chalk.grey('undefined')}
    ${chalk.blue('Method') + ':'}   ${request.method || chalk.grey('undefined')}
    ${chalk.blue('Host') + ':'}     ${request.host || chalk.grey('undefined')}

  `);
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
