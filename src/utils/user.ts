import fs from 'fs';
import { getProjectRoot } from './getProjectRoot.js';
import { userTemplate } from '../models/userTemplate.js';

export function createUser() {
  if (checkForUser()) return;

  const root = getProjectRoot().pathname;
  fs.writeFileSync(`${root}/user.json`, JSON.stringify(userTemplate, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}

export function checkForUser() {
  const root = getProjectRoot().pathname;
  return fs.existsSync(`${root}/user.json`);
}

export function updateUser(user: any) {
  if (!checkForUser()) createUser();

  const root = getProjectRoot().pathname;
  fs.writeFileSync(`${root}/user.json`, JSON.stringify(user, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}
