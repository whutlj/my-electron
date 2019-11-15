module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/src/renderer/tests/*.spec.(js|jsx|ts|tsx)'
  ]
}
