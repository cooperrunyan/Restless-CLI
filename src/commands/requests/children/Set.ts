import { Command } from '../../../models/Command.js';
import type { Request } from 'src/types/Request.js';
import { getUser, updateUser } from '../../../utils/user.js';
import { trim } from '../../../utils/trim.js';
import * as yml from 'yaml';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { error } from '../../../utils/error.js';

export const Set = new Command({
  name: 'set',
  aliases: ['s'],
  description: 'Create a request, or update an existing one',
  arguments: [
    {
      name: 'request-name',
      type: 'string',
      description: 'Create a request',
      required: true,
    },
  ],
  options: [
    {
      flag: '--host',
      type: 'string',
      name: 'host',
      description: 'The host for the request (see `collection set-host`)',
    },
    {
      flag: '--url',
      type: 'string',
      name: 'url',
      description: 'The url for the request',
    },
    {
      flag: '-e, --endpoint',
      type: 'string',
      name: 'endpoint',
      description: 'Endpoint of the request',
    },
    {
      flag: '-b, --body',
      type: 'string',
      name: 'body',
      description: 'Body of the request',
    },
    {
      flag: '-h, --header',
      type: 'string',
      name: 'header',
      description: 'Set a header to the request',
      repeatable: true,
    },
    {
      flag: '-m, --method',
      type: 'string',
      name: 'method',
      description: 'Change the request method',
    },
    {
      flag: '--yml',
      type: 'boolean',
      description: 'Use a Yaml body',
    },
  ],
  action(name: string, args: any, options) {
    const user = getUser(options.local);

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
          let b = args.body;

          try {
            const content = fs.readFileSync(path.resolve(b), 'utf-8');
            if (content) {
              if (/\.txt/gi.test(b) || !b.split('').includes('.')) {
                b = content;
              } else {
                JSON.parse(content);
                b = JSON.stringify(JSON.parse(content));
              }
            }
          } catch {
            try {
              const content = fs.readFileSync(path.resolve(b), 'utf-8');
              if (content) {
                b = JSON.stringify(yml.parse(content));
              }
            } catch {
              throw error(
                'Invalid body inputted. Either the file was not found, or could not be parsed as JSON, YAML, or plaintext. To use plaintext, the file must have the extension ".txt" or none.',
                'Invalid Body',
              );
            }
          }

          const body = args.yml ? JSON.stringify(yml.parse(b)) : b;

          try {
            JSON.parse(body);
            setHeader(request, 'Content-type', 'application/json');
          } catch (err) {
            setHeader(request, 'Content-type', 'text/plain');
          }

          request.body = body;
        }

        if (args.url) {
          request.url = trim(args.url, false, false);
        }

        if (args.host) {
          for (const host of Object.keys(collection.hosts)) {
            if (args.host !== host) continue;
            request.host = host;
          }
        }

        if (args.endpoint) request.endpoint = trim(args.endpoint, true);

        if (args.header) {
          for (const header of args.header.map(parseHeader)) setHeader(request, header[0], header[1]);
        }

        if (args.method) {
          request.method = args.method.toUpperCase();

          if (request.method === 'GET') {
            delete request.body;
            for (const header of request.headers || []) {
              if (header[0] === 'Content-type') request.headers?.splice(request.headers?.indexOf(header), 1);
            }
          }
        }

        updateUser(user, options.local);
        console.log(`
  ${chalk.bold(`Added Fields to ${request.name}:`)}

    ${Object.entries(args)
      .map(([arg, value]) => {
        if (arg === 'header' && (request as any)[arg] === {}) return;
        if (arg === 'header' && (request as any)[arg] !== {}) return `${chalk.italic.blue('headers')},`;
        return `${chalk.blue(arg)}: ${chalk.grey((request as any)[arg] || '')}`;
      })
      .join('\n    ')}
        `);
      }
    }

    updateUser(user, options.local);
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
