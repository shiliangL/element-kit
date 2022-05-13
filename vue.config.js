/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-13 11:49:38
 * @LastEditors: Do not edit
 * @Description:
 */
const path = require('path')
const { join } = path
const utils = require('./build/utils.js')
const { externals } = require('./config/index')

module.exports = {
  // publicPath: './',
  assetsDir: 'static',
  outputDir: !utils.isProduct ? 'dist' : 'lib',
  transpileDependencies: true,
  lintOnSave: !utils.isProduct,
  runtimeCompiler: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: {
    sourceMap: false,
    extract: {
      filename: 'style/[name].css'
    },
    loaderOptions: {}
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    config.module.rule('js').include.add(join(process.cwd(), 'src')).end()
    // 设置别名
    // 关闭利用空余带宽加载文件 提升首页速度
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 配置别名
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
  },
  configureWebpack: (config) => {
    if (utils.isProduct) {
      config.externals = externals
      config.mode = 'production'
      config['performance'] = { // 打包文件大小配置
        'maxEntrypointSize': 10000000,
        'maxAssetSize': 30000000
      }
    }
  },
  devServer: {
    port: 8090
  }
}
