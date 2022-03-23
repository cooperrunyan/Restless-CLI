import type { Collection } from "./Collection"

export type User = {
  currentSelectedCollection: number | null,
  collections: Collection[]
}