/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/index.js"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
