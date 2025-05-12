/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
};
