export function trim(str: string, before: boolean, after: boolean = true) {
  const without = str.replaceAll(/(^\/)|(\/$)/gi, '').trim();
  return `${before ? '/' : ''}${without}`;
}
