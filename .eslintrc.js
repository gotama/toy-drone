module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': [
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'rules': {
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 4],
        'max-len': ['error', { 'code': 120 }],
    },
};
