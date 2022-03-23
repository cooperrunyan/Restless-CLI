export default {
  collectCoverage: false,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  errorOnDeprecated: true,
  globalSetup: undefined,
  globalTeardown: undefined,
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  notify: true,
  notifyMode: 'failure-change',
};
