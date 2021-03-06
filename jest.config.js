module.exports = {
  verbose: false,
  collectCoverageFrom: ['src/**/*.ts', '!src/interfaces/**'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src/'],
  globalSetup: '<rootDir>/src/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/src/tests/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTestFramework.ts'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^app$': '<rootDir>/src/app.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests($|/.*)': '<rootDir>/src/tests$1',
    '^services($|/.*)': '<rootDir>/src/services$1',
    '^drivers($|/.*)': '<rootDir>/src/drivers$1',
    '^utils($|/.*)': '<rootDir>/src/utils$1',
    '^enums($|/.*)': '<rootDir>/src/enums$1',
    '^errors($|/.*)': '<rootDir>/src/errors$1',
    '^helpers($|/.*)': '<rootDir>/src/helpers$1',
    '^interfaces($|/.*)': '<rootDir>/src/interfaces$1',
    '^middlewares($|/.*)': '<rootDir>/src/middlewares$1',
    '^models($|/.*)': '<rootDir>/src/models$1',
    '^transformers($|/.*)': '<rootDir>/src/transformers$1',
    '^validators($|/.*)': '<rootDir>/src/validators$1',
    '^controllers($|/.*)': '<rootDir>/src/controllers$1',
  },
}
