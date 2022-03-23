export function getProjectRoot() {
  return new URL(import.meta.url.replace('/bin/utils/getProjectRoot.js', ''));
}
