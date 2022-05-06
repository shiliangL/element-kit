/*
 * @Author: shiliangL
 * @Date: 2021-05-06 14:12:03
 * @LastEditTime: 2021-05-07 09:40:20
 * @LastEditors: Do not edit
 * @Description:
 */
const { join } = path
const fs = require('fs')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '../', dir)

module.exports = {
  resolve,
  getComponentEntries (path) {
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
