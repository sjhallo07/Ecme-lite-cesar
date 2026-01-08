// @ts-check
import js from '@eslint/js'

/**
 * Minimal ESLint flat config for the backend placeholder API.
 * Uses ECMAScript modules and Node 18+ runtime assumptions.
 */
export default [
    {
        ignores: ['node_modules/', 'dist/'],
    },
    {
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },
]
