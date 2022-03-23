import type { Collection } from 'src/types/Collection';

const defaultMethod = 'GET';
const defaultMethodWithBody = 'POST';
const defaultEndpoint = '/';

export function safeToSend(name: string, collection: Collection) {
  let exists = false;
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

    break;
  }

  if (!exists) throw new Error('That request does not exist in the selected collection');
}
