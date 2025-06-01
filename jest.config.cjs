// jest.config.js

module.exports = {
  //testEnvironment: 'jest-environment-jsdom', // default for unit/integration tests
  testEnvironment: 'jsdom', // Changed to jsdom for testing with Recharts "ResizeObserver = window" issue
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files using Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Path to the setup file

  //---ADDED ENTRIES BELOW OR COVERAGE REPORTING WILL NOT WORK---(Per ChatGPT)
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Directory where coverage information will be saved
  coverageReporters: ['text', 'lcov'], // Types of coverage reports to generate
};