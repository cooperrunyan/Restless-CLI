import { Command } from '../../../models/Command.js';
import type { Request } from 'src/types/Request.js';
import { getUser, updateUser } from '../../../utils/user.js';
import { trim } from '../../../utils/trim.js';
import * as yml from 'yaml';

export const Set = new Command({
  name: 'set',
  aliases: ['s'],
  description: 'Set request',
  arguments: [
    {
      name: 'name',
      description: 'Create a request',
      required: true,
    },
  ],
  options: [
    {
      flag: '--host',
      name: 'host',
      description: 'The host for the request',
    },
    {
      flag: '-e, --endpoint',
      name: 'endpoint',
      description: 'Endpoint of the request',
    },
    {
      flag: '-b, --body',
      name: 'body',
      description: 'Body of the request',
    },
    {
      flag: '-h, --headers',
      name: 'key:value',
      description: 'Set a header to the request',
      repeatable: true,
    },
    {
      flag: '-m, --method',
      name: 'method',
      description: 'Change the request method',
    },
    {
      flag: '--yml',
      description: 'Use a Yaml body',
    },
  ],
  action(name: string, args: any) {
    const user = getUser();

    for (const collection of user.collections) {
      if (collection.name !== user.currentSelectedCollection) continue;

      let exists = false;
      for (const request of collection.requests) {
        if (request.name !== name) continue;
        exists = true;
      }

      if (!exists) {
        collection.requests.push({ name });
      }

      for (const request of collection.requests) {
        if (request.name !== name) continue;

        if (args.body) {
          const body = args.yml ? JSON.stringify(yml.parse(args.body)) : args.body;

          try {
            JSON.parse(body);
            setHeader(request, 'Content-type', 'application/json');
          } catch (err) {
            setHeader(request, 'Content-type', 'text/plain');
          }

          request.body = body;
        }

        if (args.host) {
          for (const host of Object.keys(collection.hosts)) {
            if (args.host !== host) continue;
            request.host = host;
          }
        }

        if (args.endpoint) request.endpoint = trim(args.endpoint, true);

        if (args.headers) {
          for (const header of args.headers.map(parseHeader)) setHeader(request, header[0], header[1]);
        }

        if (args.method) {
          request.method = args.method.toUpperCase();
        }

        updateUser(user);
      }
    }

    // if (args.headers) args.headers = (args.headers as any).map(parseHeader);
    // if (args.yml && args.body) args.body = JSON.stringify(yml.parse(args.body));

    // if (args.body) {

    // }

    // try {
    //   if (args.body) {
    //     JSON.parse(args.body);
    //     args.headers.unshift(['Content-type', 'application/json']);
    //   }
    // } catch (err) {
    //   args.headers.unshift(['Content-type', 'text/plain']);
    // }

    // const request: Request = {
    //   name,
    // };

    // if (args.endpoint) request.endpoint = trim(args.endpoint, true);
    // if (args.method) request.method = args.method.toUpperCase() || args.method;
    // if (args.body) request.body = args.body;
    // if (args.headers) request.headers = args.headers;

    // const user = getUser();

    // for (const collection of user.collections) {
    //   if (collection.name === user.currentSelectedCollection) {
    //     for (const [id] of Object.entries(collection.hosts)) {
    //       if (args.host === id) {
    //         request.host = id;
    //         break;
    //       }
    //     }

    //     let exists = false;

    //     for (const req of collection.requests) {
    //       if (req.name === request.name) exists = true;
    //     }

    //     if (!exists) collection.requests.push(request);
    //     else {
    //       for (const req of collection.requests) {
    //         if (req.name === name) {
    //           for (const [key, value] of Object.entries(request)) {
    //             (req as any)[key] = value;
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    updateUser(user);
  },
});

function parseHeader(inp: string) {
  return inp.split(':');
}

function setHeader(request: Request, key: string, value: string) {
  let exists = false;
  const headers = request.headers || [];

  for (const header of headers) {
    if (header[0] !== key) continue;

    exists = true;
    header[0] = key;
    header[1] = value;
  }

  if (!exists) headers.push([key, value]);
  request.headers = headers;
}
