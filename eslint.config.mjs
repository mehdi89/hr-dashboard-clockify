import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations from Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Ignore generated Prisma client code
  {
    ignores: [
      "**/src/generated/**",
      "**/node_modules/**"
    ]
  },
  
  // Specific rule overrides for application code
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Silence specific warnings in application code if needed
      "@typescript-eslint/no-unused-vars": "warn", // Downgrade from error to warning
      "@typescript-eslint/no-explicit-any": "warn", // Downgrade from error to warning
    },
    // Don't apply these rules to generated code
    ignores: ["**/src/generated/**"]
  }
];

export default eslintConfig;
