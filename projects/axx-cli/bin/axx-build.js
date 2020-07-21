let colors = require('colors')
let program = require('commander')

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red(txt) {
  return colors.red(txt); //display the help text in red on the console
}

program
  .usage('<command> [options]')
  .command('init', '初始化')
  .command('service', '编译&本地调试')
  .command('add <lang>', '添加新的npm包依赖')
  .parse(process.argv)