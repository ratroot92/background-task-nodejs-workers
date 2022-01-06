module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['prettier', 'airbnb-base'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'prettier/prettier': 'off',
        'max-len': ['off', { code: 200 }],
        indent: 'off',
    },
};
