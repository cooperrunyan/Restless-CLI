export function trim(str: string, before: boolean) {
  const without = str.replaceAll(/(^\/)|(\/$)/gi, '').trim();
  return `${before ? '/' : ''}${without}`;
}
