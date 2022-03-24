import type { Collection } from 'src/types/Collection';
import { error } from '../utils/error.js';

const defaultMethod = 'GET';
const defaultMethodWithBody = 'POST';
const defaultEndpoint = '/';

export function safeToSend(name: string, collection: Collection): any | Error {
  let exists = false;
  let req: any = {};
  for (const request of collection.requests) {
    if (request.name !== name) continue;
    exists = true;

    if (!request.method) {
      request.method = defaultMethod;
      if (request.body) request.method = defaultMethodWithBody;
    }

    if (!request.body && request.method !== 'GET') request.body = '{}';
    if (!request.endpoint) request.endpoint = defaultEndpoint;
    if (!request.host && !request.url)
      return error(
        'A host/origin is required. The request needs a valid url to be sent to. Use the `collection set-host` command to create a named host, or pass the `--host <url>` flag into the request creation',
        'Invalid Arguments',
      );

    try {
      if (request.url) {
        new URL(request.url);
        req.parsedURL = request.url;
      }
    } catch (err) {
      return error(
        'The "url" property is not a valid Url. Upon the "new URL(<url>)" construction, an error was thrown. Check the "url" value to make sure it is actually a URL.',
        'Invalid Arguments',
      );
    }

    let hostExists = false;
    for (const [host, url] of Object.entries(collection.hosts)) {
      if (host !== request.host) continue;
      hostExists = true;
      req.parsedURL = url;
    }

    if (!hostExists && !request.url)
      return error('That host does not exist as a named host. Try running `collection set-host <hostname> <url>` to create it.', 'Invalid Arguments');

    req = { ...req, ...request };
    break;
  }

  if (!exists)
    return error(
      "The current collection does not contain the request that you're searching for. Run `collection current` to make sure you're using the collection you intend to.",
      'Invalid Arguments',
    );

  return req;
}
