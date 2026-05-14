'use strict';

const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: [ '**/*.js' ],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
                module: 'readonly',
                process: 'readonly',
                require: 'readonly'
            }
        },
        rules: {
            'array-bracket-spacing': [ 'error', 'always' ],
            'comma-dangle': [ 'error', 'never' ],
            'indent': [ 'error', 4 ],
            'quotes': [ 'error', 'single', { avoidEscape: true } ],
            'semi': [ 'error', 'always' ],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    asyncArrow: 'always',
                    named: 'never'
                }
            ]
        }
    }
];
