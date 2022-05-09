/*
 * @Author: shiliangL
 * @Date: 2021-05-06 14:12:03
 * @LastEditTime: 2022-05-08 09:16:12
 * @LastEditors: Do not edit
 * @Description:
 */
const fs = require('fs')
const path = require('path')
const { join } = path
const resolve = (dir) => path.join(__dirname, '../', dir)
const chalk = require('chalk')
const { outputPath } = require('../config/index')

module.exports = {
  resolve(_path) {
    return _path ? path.resolve(__dirname, _path) : path.resolve(__dirname, '..', outputPath)
  },
  getAssetsPath(_path = '.') {
    return path.posix.join(outputPath, _path)
  },
  fsExistsSync: (_path) => {
    try {
      fs.accessSync(_path, fs.F_OK)
    } catch (e) {
      return false
    }
    return true
  },
  env: process.env.NODE_ENV,
  isProduct: ['production', 'prod'].includes(process.env.NODE_ENV),
  chalkConsole: {
    success: () => {
      console.log(chalk.green(`=========================================`))
      console.log(chalk.green(`========打包成功(build success)!=========`))
      console.log(chalk.green(`=========================================`))
    },
    building: (index, total) => {
      console.log(chalk.blue(`正在打包第${index}/${total}个文件...`))
    }
  },
  getComponentEntries(path) {
    const files = fs.readdirSync(resolve(path))
    const componentEntries = files.reduce((ret, item) => {
      const itemPath = join(path, item)
      const isDir = fs.statSync(itemPath).isDirectory()
      if (isDir) {
        // eslint-disable-next-line no-param-reassign
        ret[item] = resolve(join(itemPath, 'index.js'))
      } else {
        const [name] = item.split('.')
        // eslint-disable-next-line no-param-reassign
        ret[name] = resolve(`${itemPath}`)
      }
      return ret
    }, {})
    // eslint-disable-next-line no-console
    console.dir(componentEntries)
    return componentEntries
  }
}

