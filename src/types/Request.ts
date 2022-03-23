type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'DELETE';
type Body = object | string;

export type Request = {
  name: string;
  method?: Method;
  body?: Body;
  host?: string;
  url?: string;
  endpoint?: string;
  contentType?: 'application/json' | 'text/plain' | 'text/yaml';
  headers?: [string, string][];
};
