const { defineConfig } = require('@vue/cli-service');
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  // 这个是给 webpack-dev-server开启可IP和域名访问权限。
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all',
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  chainWebpack: config => {
    // 图片加载
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 50000 }))
    }
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
})
