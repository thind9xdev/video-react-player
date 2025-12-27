module.exports = {
  setupFilesAfterEnv: ['<rootDir>src/setupTests.js'],
  coverageReporters: ['html', 'text-summary', 'cobertura', 'lcov'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
  coveragePathIgnorePatterns: ['setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
};
