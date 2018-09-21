module.exports = {
  verbose: true, // 用于显示每个测试用例的通过与否
  coverageDirectory: 'coverage', // 指定输出测试覆盖率报告的目录
  collectCoverage: true,
  coverageReporters: [
    'lcov', // 会生成lcov测试结果以及HTML格式的漂亮的测试覆盖率报告
    'text' // 会在命令行界面输出简单的测试报告
  ],
  collectCoverageFrom: ['test/**/*.{js,jsx}'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/common/images',
    '\\.(css|less|scss)$': '<rootDir>/src'
  }
};
