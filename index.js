const { prototype } = require('html-webpack-plugin')
const RunningWebpack = require('./lib/run')

/**
 * create a runner to run the configuration files under different enviroments of webpack
 */
const runner = new RunningWebpack()

process.on('message', (message) => {
  const msg = JSON.parse(message)
  if(msg.type && msg.cwdPath) {
    runner.listen(msg).then(() => {
      process.send(JSON.parse({ type: 'end' }))
    }, (error) => {
      process.send(JSON.stringify({ type: 'error', error }))
    })
  }
})