module.exports = [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**', 'infra/terraform/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        setTimeout: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^next$', varsIgnorePattern: '^_.*' }],
      'no-console': 'off'
    }
  }
];