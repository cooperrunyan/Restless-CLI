import { Command } from '../models/Command';

export interface CommandInput {
  name: string;
  description: string;
  version?: string;
  aliases?: string[];
  options?: {
    flag: string;
    description: string;
    type: string;
    name?: string;
    repeatable?: boolean;
    default?: string | boolean;
  }[];
  arguments?: {
    type: string;
    name: string;
    description: string;
    required?: boolean;
    default?: unknown;
  }[];
  children?: Command[];
  action?: (...args: any) => void;
}
