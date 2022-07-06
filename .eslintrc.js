module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off', // 在这禁止掉console报错检查
    'no-irregular-whitespace': 'off', // 这禁止掉 空格报错检查
    semi: 0, // 这里设置不检测结尾分号,
    'space-before-function-paren': 0, // 方法名和刮号之间不要空格
    quotes: [1, 'single'], // 引号类型 `` "" ''
    'comma-dangle': 'off',
    'no-unused-vars': 'off'// vant loacl报错
  }
}
