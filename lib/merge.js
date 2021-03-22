const fs = require('fs')
const merge = require('webpack-merge')

// 配置合并
function configMerge(Pconf, config) {
  const {
    dev = Object.create(null),
    pro = Object.create(null),
    base = Object.create(null)
  } = Pconf
  if(this.type === 'start') {
    return merge(config, base, dev)
  } else {
    return merge(config, base, pro)
  }
}

/**
 * Merge default and custom configuration items
 * @param {*} config default configuration
 */
function mergeConfig(config) {
  const targetPath = this.path + '/mycli.config.js'
  const isExi = fs.existsSync(targetPath)
  if(isExi) {
    const preConfig = require(targetPath)
    const mergeConfigResult = configMerge.call(this, preConfig, config)
    return mergeConfigResult
  }
  return config
}

module.exports = mergeConfig