import { Linter } from 'eslint';

const config: Linter.Config = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'standard',
    '@nuxtjs/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
  ],
  plugins: ['standard', 'vue'],
  globals: {
    defineEventHandler: 'readonly',
    console: 'readonly',
    readBody: 'readonly',
    // Add other global variables as needed
  },
  rules: {
    eqeqeq: 2,
    'generator-star-spacing': 'off',
    'space-before-function-paren': ['error', 'always'],
    'no-console': 'off',
    'no-useless-return': 'error',
    'no-trailing-spaces': 0,
    indent: 'off',
    'key-spacing': 2,
    'vue/eqeqeq': 2,
    'vue/object-curly-spacing': [2, 'always'],
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
    // 'vue/component-name-in-template-casing': [2, 'PascalCase' | 'kebab-case', {
    //   'registeredComponentsOnly': true,
    //   'ignores': []
    // }],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
      },
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'methods',
          'LIFECYCLE_HOOKS',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
    'no-useless-catch': 'off',
    'no-misleading-character-class': 'off',
    'no-async-promise-executor': 'off',
    'switch-colon-spacing': 2,
    'rest-spread-spacing': 2,
    'space-infix-ops': 2,
    'space-unary-ops': 2,
    'comma-dangle': 2,
    semi: [2, 'never'],
    'keyword-spacing': 'error',
    'array-bracket-spacing': [2, 'never'],
    'comma-spacing': 2,
    'func-call-spacing': 2,
  },
};

export default config;
