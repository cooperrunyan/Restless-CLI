import fs from 'fs';
import { getProjectRoot } from './getProjectRoot.js';
import { userTemplate } from '../models/userTemplate.js';
import type { User } from '../types/User.js';

export function createUser(local: boolean) {
  if (checkForUser(local)) return;

  const root = getProjectRoot();

  if (!fs.existsSync(root)) fs.mkdirSync(root);
  fs.writeFileSync(`${root}/data.json`, JSON.stringify(userTemplate, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}

export function checkForUser(local: boolean) {
  const root = getProjectRoot();
  return fs.existsSync(`${root}/data.json`);
}

export function updateUser(user: User, local: boolean) {
  if (!checkForUser(local)) createUser(local);

  const root = getProjectRoot();
  fs.writeFileSync(`${root}/data.json`, JSON.stringify(user, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}

export function getUser(local: boolean): User {
  if (!checkForUser(local)) createUser(local);
  return JSON.parse(fs.readFileSync(`${getProjectRoot()}/data.json`, 'utf-8') || '{}');
}
