/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['expect-puppeteer'],
  testTimeout: 20000,
  globals: {
    URL:'localhost:5173',
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
};