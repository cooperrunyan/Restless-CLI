import type { Request } from './Request';

export type Collection = {
  name: string;
  requests: Request[];
  hosts: Hosts;
};

type Hosts = { [key: string]: string };
