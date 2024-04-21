/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'acceptance',
  passWithNoTests: true,
  testTimeout: 5000,
  openHandlesTimeout: 5000,
  forceExit: true,
};
