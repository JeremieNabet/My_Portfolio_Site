import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ["template/**", "example/**", ".next/**", "node_modules/**", "playwright-artifacts/**", ".playwright-mcp/**"] },
];

export default config;
