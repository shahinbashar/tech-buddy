/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  // prisma/: the Learning content importer has unit tests too.
  roots: ['<rootDir>/src', '<rootDir>/prisma'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
