module.exports = {
  "arrowParens": "always",
  "tabWidth": 2,
  "trailingComma": "none",
  "semi": true,
  "printWidth": 80,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "endOfLine": "auto",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "overrides": [
    {
      "files": ["**/*.html"],
      "options": {
        "parser": "html",
        "singleQuote": false
      }
    },
    {
      "files": ["**/*.scss"],
      "options": {
        "parser": "scss",
        "singleQuote": false
      }
    }
  ]
};