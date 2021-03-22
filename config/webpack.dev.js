const webpack = require('webpack')
const MycliConsolePlugin = require('../plugins/mycli-console-plugin')

const devConfig = (path) => {
  return {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
      contentBase: path + '/dist',
      open: true, /** 自动打开浏览器 */
      hot: true,
      historyApiFallback: true,
      publicPath: '/',
      port: 7778, /** 服务器端口 */
      inline: true,
      proxy: {
        // 代理服务器
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MycliConsolePlugin({
        dec: 1
      })
    ]
  }
}

module.exports = devConfig