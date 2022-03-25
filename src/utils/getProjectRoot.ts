import fs from 'fs';

export function getProjectRoot() {
  return '/tmp/restlss';
}

export function getPackage() {
  return JSON.parse(fs.readFileSync(import.meta.url.replace('/bin/utils/getProjectRoot.js', '/package.json').replace('file://', ''), 'utf-8'));
}
