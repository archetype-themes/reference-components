/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 120,
  semi: false,
  trailingComma: "none",
  plugins: [require.resolve("@shopify/prettier-plugin-liquid/standalone")],
  overrides: [
    {
      files: "*.liquid",
      options: {
        parser: "liquid-html",
        singleQuote: false
      }
    }
  ]
}
