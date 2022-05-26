module.exports = {
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testTimeout: 100000,
  testRegex: '/tests/.*(spec|test)\\.(ts|tsx|js)$',
  bail: 1,
  verbose: true,
};
