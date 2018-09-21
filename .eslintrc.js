// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-var': 'error',
    semi: [2, 'always'],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    indent: ['error', 2, { SwitchCase: 1 }],
    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    'comma-dangle': [2, 'never'],
    'no-multi-spaces': 1,
    'react/jsx-tag-spacing': 1, // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
    'jsx-quotes': 1,
    'react/jsx-closing-bracket-location': 1, // 遵循JSX语法缩进/格式
    'react/jsx-boolean-value': 1, // 如果属性值为 true, 可以直接省略
    'react/no-string-refs': 1, // 总是在Refs里使用回调函数
    'react/self-closing-comp': 1, // 对于没有子元素的标签来说总是自己关闭标签
    'react/sort-comp': 1, // 按照具体规范的React.createClass 的生命周期函数书写代码
    'react/jsx-pascal-case': 1, // React模块名使用帕斯卡命名，实例使用骆驼式命名
    'jsx-a11y/href-no-hash': 'off', // 关闭这条规则　版本冲突导致规则缺失
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  },
  plugins: ['react', 'babel']
};
