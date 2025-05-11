import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  {
    ignores: ["dist/**", "**/*.d.ts", "node_modules/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      semi: ["error", "always"],
    },
  },
]);
