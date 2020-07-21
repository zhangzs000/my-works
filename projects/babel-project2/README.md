1.本地安装babel命令行工具，便于移植
cnpm install --save-dev babel-cli
2.本地安装的babel是不能够在直接命令行中运行的，为了在命令行中运行babel，2中方法：
《1》package.json文件的scripts项，(npm run build)的时候就会在命令行执行babel src -d lib。
《2》进入node_modules文件夹，再进入.bin文件夹，然后执行在命令行中执行babel src -d lib。
babel src -d lib。这个命令目的是把src文件夹下的文件都转译，转译后的文件放到lib目录下
3.创建.babelrc配置文件，要转译的时候，还要在.babelrc文件或者命令行中配置这些转译器(presets)选项
4.安装babel的转译器
cnpm install babel-preset-env --save-dev
5.配置.babelrc文件
.babelrc用于配置除回调以外的所有babel api 选项。例如plugins和presets。plugins用于配置我们转译所需要的插件，presets用于配置我们所需要的转译器。
.babelrc不是必须的，我们在.babelrc中配置的选项都可以通过命令行添加，比如在命令行执行 babel src -d lib --presets=env 等价于在.babelrc中配置 "presets":["env"]。当然.babelrc要明显方便很多。
babel在转译代码的过程中会自动读取当前目录.babelrc配置文件，如果当前目录没有的话就遍历整个目录树去寻找，直到找到.babelrc文件或者`含有"babel"字段的package.json文件`，然后使用这些配置选项来转译代码。
6..babelrc的替代方案
.package.json
"babel":{
    //babel选项
    "presets":["es2015"],
    "comments":false
  },
7.常见的几种babel转译器和插件
7.1 babel-preset-env
7.2 babel-core
babel-core主要在`node等环境`中使用，可以用来开发自己的babel转译器。直接调用babel的api对某些代码或者某些文件进行转译。
8.出现类似“Couldn't find preset "stage-2" relative to directory”这样的错误，也带安装响应的包
cnpm install --save-dev babel-preset-stage-2
cnpm install --save-dev babel-preset-es2015
9.如果build是webpack方式
"build": "webpack --config webpack/webpack.prod.config.js"
待安装loader
cnpm install --save-dev webpack
cnpm install --save-dev babel-preset-env babel-loader
entry为入口文件，我们选择当前目录下，src文件夹下的person.js文件作为入口。output为输出选项，path为输出的目录，filename为输出文件名。`query选项为.babelrc中的配置选项。在webpack中设置了query字段后，就不再需要.babelrc文件了`。
问题： webpack不是可识别命令，One CLI for webpack must be installed. These are recommended choices。
安装cli, configuration.module has an unknown property 'loaders'. These properties are valid。
把module里的那个loaders改成rules
问题：“ babel-loader@8 requires Babel 7.x (the package '@babel/core')”
"babel-core": "^6.0.0",
"babel-loader": "^7.0.5",
presets:["env", "stage-0"],添加stage-0这个选项。

