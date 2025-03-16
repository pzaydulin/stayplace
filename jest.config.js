module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  globals: {
    "\\.(html|svg)$": ["ts-jest", "<rootDir>/tsconfig.spec.json"],
  },
  coverageDirectory: "coverage"
};
