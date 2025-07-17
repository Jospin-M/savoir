import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.node
    },
    plugins: {
      js
    },
    extends: ["js/recommended"]
  },

  ...tseslint.configs.recommended
]);
