import { safeToSend } from '../../checks/safeToSend.js';
import { getUser } from '../../utils/user.js';
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

        const req: {
          parsedURL: string;
          headers: [string, string][];
          endpoint: string;
          method: Method;
          body: string;
        } = safeToSend(name, collection);

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
    }

    if (!exists) throw new Error('That request does not exist');
  },
});
