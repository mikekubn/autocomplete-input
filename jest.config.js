// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: '.' });

const customJestConfig = {
  clearMocks: true,
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
      enableTsDiagnostics: true,
    },
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/provider/(.*)$': '<rootDir>/src/providers/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)test)\\.[jt]sx?$',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  setupFilesAfterEnv: ['<rootDir>/utils/setupTests.ts'],
};

module.exports = createJestConfig(customJestConfig);
