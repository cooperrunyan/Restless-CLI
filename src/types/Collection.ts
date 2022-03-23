import type { Request } from './Request';

export type Collection = {
  name: string;
  requests: Request[];
};
