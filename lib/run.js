/** 有两种start和build */
const EventEmiiter = require('events').EventEmitter
const Server = require('webpack-dev-server/lib/Server')
const processOptions = require('webpack-dev-server/lib/utils/processOptions')
const yargs = require('yargs')

const merge = require('./merge')
const webpack = require('webpack')
const runMergeBaseConfig = require('../config/webpack.base')

// 根据命令不同运行不同的webpack
class RunningWebpack extends EventEmiiter {
  constructor(options) {
    super()
    this._options = options
    this.path = null
    this.config = null
    this.on('running', (type, ...args) => {
      this[type] && this[type](...args)
    })
  }

  /**
   * Listening to different compilation states of webpack
   */
  listen({ type, cwdPath }) {
    this.path = cwdPath
    this.type = type
    this.config = merge.call(this, runMergeBaseConfig(cwdPath)(type))
    return new Promise((resolve, reject) => {
      this.emit('running', type)
      this.emit('error', reject)
      this.emit('end', resolve)
    })
  }

  /**
   * running a pack for production environment
   */
  build() {
    try {
      webpack(this.config, (err) => {
        if(err) {
          this.emit('error')
        } else {
          this.emit('end')
        }
      })
    } catch(e) {
      this.emit('error')
    }
  }

  /**
   * running a pack for development environment
   */
  start() {
    const _this = this
    processOptions(this.config, yargs.argv, (config, options) => {
      const compiler = webpack(config)
      const server = new Server(compiler, options)
      server.listen(options.port, options.host, (err) => {
        if(err) {
          _this.emit('error')
          throw err
        }
      })
    })
  }
}

module.exports = RunningWebpack