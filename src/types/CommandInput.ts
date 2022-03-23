import { Command } from '../models/Command';

export interface CommandInput {
  name: string;
  description: string;
  version?: string;
  aliases?: string[];
  options?: {
    flag: string;
    name?: string;
    description: string;
    repeatable?: boolean;
    default?: string | boolean;
  }[];
  arguments?: {
    required?: boolean;
    name: string;
    description: string;
    default?: unknown;
  }[];
  children?: Command[];
  action?: (...args: any) => void;
}
