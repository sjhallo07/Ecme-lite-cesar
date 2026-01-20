// @ts-check
import js from '@eslint/js'

/**
 * ESLint flat config for the backend API.
 * Uses ECMAScript modules and Node 18+ runtime assumptions.
 */
export default [
  {
    ignores: ['node_modules/', 'dist/', 'uploads/'],
  },
  {
    ...js.configs.recommended,
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        // __dirname and __filename are included for CommonJS/legacy files.
        // In ES modules, prefer `import.meta.url` instead.
        __dirname: 'readonly',

        require: 'readonly',
        exports: 'writable',
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-undef': 'error',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'indent': ['warn', 2, { SwitchCase: 1 }],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-trailing-spaces': 'warn',
      'eol-last': ['warn', 'always'],
    },
  },
]
