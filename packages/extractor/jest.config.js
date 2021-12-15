module.exports = {
  preset: "./jest-preset.js",
  testRegex: ["\\/src\\/test\\/(?!common).*?.[jt]sx?$"],
  testEnvironment: "node",
  reporters: [
    "default",
    "jest-junit"
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "test",
    "output"
  ],
  setupFilesAfterEnv: ["jest-extended/all"],
}
