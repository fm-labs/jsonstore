import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
//import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

const customRules = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-prototype-builtins': 'warn',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-self-assign': 'warn',
    'no-empty': 'warn',
    'no-useless-escape': 'warn',
    'no-control-regex': 'warn',

    '@typescript-eslint/no-this-alias': 'warn',
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',

    // react rules
    //'react/jsx-uses-react': 'error',
    //'react/jsx-uses-vars': 'error',
    'react/display-name': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/prop-types': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-key': 'warn',

    // 'react-refresh/only-export-components': [
    //   'warn',
    //   { allowConstantExport: true },
    // ],
  },
}

const ignoreRules = {
  ignores: [
    '.idea/',
    '.git/',
    'node_modules/',
    'bak/',
    'build/',
    'dist/',
    'docker/',
    'public/',
    'reports/',
  ],
}

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  //eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  customRules,
  ignoreRules,
]
