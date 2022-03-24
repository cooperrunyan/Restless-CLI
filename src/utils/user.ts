import fs from 'fs';
import { getProjectRoot } from './getProjectRoot.js';
import { userTemplate } from '../models/userTemplate.js';
import type { User } from '../types/User.js';

export function createUser() {
  if (checkForUser()) return;

  const root = getProjectRoot();

  if (!fs.existsSync(root)) fs.mkdirSync(root);
  fs.writeFileSync(`${root}/user.json`, JSON.stringify(userTemplate, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}

export function checkForUser() {
  const root = getProjectRoot();
  return fs.existsSync(`${root}/user.json`);
}

export function updateUser(user: User) {
  if (!checkForUser()) createUser();

  const root = getProjectRoot();
  fs.writeFileSync(`${root}/user.json`, JSON.stringify(user, null, process.env.NODE_ENV !== 'production' ? 2 : undefined));
}

export function getUser(): User {
  if (!checkForUser()) createUser();
  return JSON.parse(fs.readFileSync(`${getProjectRoot()}/user.json`, 'utf-8') || '{}');
}
