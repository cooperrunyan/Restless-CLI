import type { Collection } from './Collection';

export type User = {
  currentSelectedCollection: string | null;
  collections: Collection[];
};
