import type { Collection } from 'src/types/Collection';

const defaultMethod = 'GET';
const defaultMethodWithBody = 'POST';
const defaultEndpoint = '/';

export function safeToSend(name: string, collection: Collection) {
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
    if (!request.host && !request.url) throw new Error('A host/origin is required');

    try {
      if (request.url) {
        new URL(request.url);
        req.parsedURL = request.url;
      }
    } catch (err) {
      throw new Error('"url" property is not a valid Url');
    }

    let hostExists = false;
    for (const [host, url] of Object.entries(collection.hosts)) {
      if (host !== request.host) continue;
      hostExists = true;
      req.parsedURL = url;
    }

    if (!hostExists && !request.url) throw new Error('That host does not exist');

    req = { ...req, ...request };
    break;
  }

  if (!exists) throw new Error('That request does not exist in the selected collection');

  return req;
}
