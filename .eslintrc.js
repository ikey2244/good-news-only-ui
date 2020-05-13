module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/recommended'
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      "multiline": "never"
    }],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
  }],
  }
}
