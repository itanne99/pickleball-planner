import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const eslintConfig = defineConfig([
  ...nextVitals,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/name-replacements": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "error",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/logical-assignment-operators": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".agents/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;

