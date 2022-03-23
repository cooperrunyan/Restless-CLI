import { Command } from '~/commands/Command';

export interface CommandInput {
  name: string;
  version: string;
  aliases: string[];
  options: {
    flag: string;
    description: string;
    default?: string | boolean;
  }[];
  arguments: {
    required?: boolean;
    name: string;
    description: string;
    default?: unknown;
  }[];
  children?: Command[];
  action: () => void;
}
