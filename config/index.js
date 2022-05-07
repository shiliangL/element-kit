/*
 * @Author: shiliangL
 * @Date: 2022-05-07 09:33:12
 * @LastEditTime: 2022-05-07 11:10:08
 * @LastEditors: Do not edit
 * @Description:
 */
const devConfig = require('./dev');
const prodConfig = require('./prod');
const isProduct = ['production', 'prod'].includes(process.env.NODE_ENV);
const config = isProduct ? prodConfig : devConfig;

module.exports = {
  styleOutputPath: 'theme',
  outputPath: 'lib',
  clearConsole: config.clearConsole,
  // 打包忽略
  externals: {
    vue: {
      amd: 'vue',
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
    },
  },
};
