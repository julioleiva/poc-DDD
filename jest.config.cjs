const tsJestPreset = require('ts-jest/jest-preset');

module.exports = {
  ...tsJestPreset,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    ...tsJestPreset.transform,
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  setupFiles: [
    "jest-fetch-mock/setupJest"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    ...tsJestPreset.moduleNameMapper,
  },
  setupFilesAfterEnv: ['./setupTests.js']
};
