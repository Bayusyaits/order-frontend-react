module.exports = {
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    env: {
        browser: true,
        es2020: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'import/first': 'off',
        'no-redeclare': 'warn',
        'no-unsafe-negation': 'warn',
        'require-await': 'off',
        'default-param-last': 'off',
        'no-prototype-builtins': 'off',
        'quote-props': 'off',
        'react/jsx-handler-names': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/display-name': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-confusing-arrow': 'off',
        'object-shorthand': ['warn', 'always'],
        'import/newline-after-import': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-restricted-exports': 'off',
        'react/function-component-definition': 'off',
        'space-in-parens': 'off',
        'prettier/indent': 'off',
        quotes: ['off', 'single'],
        indent: ['off', 2],
        'no-undef': 'off',
        'operator-linebreak': 'off',
        'arrow-parens': ['warn', 'always'],
        'computed-property-spacing': 'off',
        'linebreak-style': ['warn', 'unix'],
        'brace-style': ['warn', '1tbs', { allowSingleLine: false }],
        'comma-dangle': ['off', 'never'],
        'no-param-reassign': ['off', { props: false }],
        semi: ['off', 'never'],
        camelcase: ['warn', { properties: 'always' }],
        'object-curly-newline': ['warn', { ObjectPattern: 'never' }],
        'eol-last': 'off',
        'no-unused-expressions': ['warn', { allowTernary: true }],
        'function-paren-newline': ['warn', 'consistent'],
        'implicit-arrow-linebreak': 'off',
        'global-require': 'off',
        'space-before-function-paren': 'off',
        'prefer-arrow-callback': 'off',
        'arrow-body-style': 'off',
        'no-return-assign': 'off',
        'no-useless-return': 'off',
        'consistent-return': 'off',
        'no-new': 'off',
        'array-callback-return': 'off',
        'prefer-destructuring': 'off',
        'no-tabs': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'class-methods-use-this': 'off',
        'no-useless-escape': 'off',
        'no-unused-vars': ['warn', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true
        }],
        radix: ['warn', 'as-needed']
    },
    overrides: [{
        files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
            jest: true
        }
    }]
}