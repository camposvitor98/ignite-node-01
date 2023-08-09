module.exports = {
  "env": {
    "es2021": true,
    "node": true,
  },
  "extends": ["standard", "plugin:@typescript-eslint/recommended", 'plugin:prettier/recommended'],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint", 'prettier'],
  "rules": {
    "prettier/prettier": ["error"],
  },
  "settings": {
    "import/parsers": {
      [require.resolve("@typescript-eslint/parser")]: [".ts", ".d.ts"],
    },
  },
}
