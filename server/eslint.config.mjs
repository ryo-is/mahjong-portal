/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-unresolved */

import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import TypeScriptESLint from '@typescript-eslint/eslint-plugin';
import TypeScriptESLintParser from '@typescript-eslint/parser';
import ESlintConfigPrettier from 'eslint-config-prettier';
import PluginUnusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      'build',
      'src/build',
      'tailwind.config.js',
      'postcss.config.js',
      'dist',
      'node_modules',
    ],
  },
  js.configs.recommended,
  ESlintConfigPrettier,
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ),
  {
    plugins: {
      TypeScriptESLint,
      // import: PluginImport,
      'unused-imports': PluginUnusedImports,
    },
    languageOptions: {
      parser: TypeScriptESLintParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-param-reassign': [2, { props: false }],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/components/common',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/hooks',
              group: 'internal',
              position: 'before',
            },
          ],
        },
      ],
      'import/extensions': [
        'error',
        {
          js: 'never',
          ts: 'never',
        },
      ],
      'import/no-extraneous-dependencies': 0,
      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      '@typescript-eslint/indent': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      // eslint-disable-next-line no-dupe-keys
      'import/extensions': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
];
