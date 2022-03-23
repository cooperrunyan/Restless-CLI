import type { Request } from './Request';

export type Collection = {
  name: string;
  requests: Request[];
  hosts: Host[];
};

type Host = {
  indentifier: string;
  url: string | URL;
};
