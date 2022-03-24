import { safeToSend } from '../../checks/safeToSend.js';
import { getUser } from '../../utils/user.js';
import { error } from '../../utils/error.js';
import { Command } from '../../models/Command.js';
import type { Method } from 'src/types/Request.js';
import fetch from 'node-fetch';

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
  async action(name: string) {
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

          console.log(`Status: ${response.status}`);
          console.log('Response:', await response.json());
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
