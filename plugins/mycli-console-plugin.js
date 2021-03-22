const chalk = require('chalk')
let slog = require('single-line-log')

class MyCliConsolePlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    /**
     * 监听文件改变
     */
    compiler.hooks.watchRun.tap('MyCliConsolePlugin', (watching) => {
      const changeFiles = watching.watchFileSystem.watcher.mtimes
      for(let file in changeFiles) {
        console.log(chalk.green('当前改动文件：' + file))
      }
    })

    /**
     * 新的编译过程创建之前
     * before compilation created
     */
    compiler.hooks.compile.tap('MyCliConsolePlugin', () => {
      this.beginCompile()
    })

    /** Executed when the compilation has completed */
    compiler.hooks.done.tap('MyCliConsolePlugin', () => {
      this.timer && clearInterval(this.timer)
      console.log(chalk.yellow('编译完成'))
    })
  }
  beginCompile() {
    const lineSlog = slog.stdout
    let text = '开始编译：'
    this.timer = setInterval(() => {
      text += '█'
      lineSlog(chalk.green(text))
    }, (50));
  }
}

module.exports = MyCliConsolePlugin