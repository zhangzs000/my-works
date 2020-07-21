init webpack project

// 初始化配置文件
npm init -y
// 安装webpack相关包
npm install -D webpack@4.16.0 webpack-cli
// 运行webpack打包文件
npx webpack
node_modules/.bin/webpack
// 配置快捷方式后(package.json的scripts属性)
"build": "webpack --config config/webpack.config.js"
npm run build
// 安装开发环境依赖包
cnpm install -D clean-webpack-plugin --save-dev
cnpm install -D html-webpack-plugin  --save-dev
cnpm install -D webpack-merge  --save-dev
cnpm install -D webpack-dev-server  --save-dev
cnpm install -D style-loader  --save-dev
cnpm install -D css-loader  --save-dev
cnpm install -D postcss-loader  --save-dev
cnpm install -D autoprefixer  --save-dev
// 安装生产环境依赖包
npm install jquery
// 启动一个服务
cnpm i http-server -g



cnpm install -D babel-loader babel-core babel-preset-env 
<!-- 
全局环境添加，副作用大，污染全局环境
npm install babel-polyfill 
入口文件['babel-polyfill', './src/main.js']
main增加100kb;
-->


cnpm install -D babel-plugin-transform-runtime
cnpm install babel-runtime
cnpm install -D babel-plugin-syntax-dynamic-import

#### browserslist

```
browserslist这个包是postcss兼容浏览器一个重要的包。

package.json中增加，这是其实默认配置
"browserslist": [
    "> 0.5%", // 市场占有率
    "last 2 versions",
    "Firefox ESR", // ff的esr延长支持版本
    "not dead" // 不排除一些浏览器，比如ie
]
运行 npx browserslist 命令会显示浏览器的兼容情况。
去掉
"Firefox ESR",
"not dead"
flex布局也添加上了各种前缀。dead 代表ie10, not dead不兼容ie10。自然不会有-ms前缀。

或增加.browserslistrc文件，里面增加配置
> 0.5%
last 2 versions

2中方式不能共存。

```
过程：
1、
src文件夹下放了空index.js和random.js照样可以打包出dist/main.js，经过测试必须有index.js才能npx webpack，这里运行的是webpack的默认配置文件。
2、
npm run build运行base.config，发现entry的路径entry: './src/index.js'这样写；output的路径path: path.resolve(__dirname, '../dist')，可以发现output是相对当前目录的。
3、
filename: 'bundle.[hash].js'给打包后的文件增加hash值。
4、
clean-webpack-plugin在使用的时候第二个参数传路径。
5、
new htmlWebpackPlugin()后src文件中什么都没有，打包后的dist文件照样有index.html并且自动引入打包后的js。后来把index.html放入到src目录下，把里面script标签引入的js去掉，在配置文件中配置htmlWebpackPlugin,很完美。webpack配置中无论是new HtmlWebpackPlugin() 还是new htmlWebpackPlugin()在模板引入变量时，都可以用小写htmlWebpackPlugin这个。
6、
修改mode:'development'，打包后的文件没有压缩。
7、
多页面应用。入口文件配置了多个入口
entry: {
		main: './src/index.js',
		other: './src/other.js'
	}
，new HtmlWebpackPlugin中的chunks模块要配置相应的js，生成的html文件就会有引入相应的js。
output: {
		filename: '[name].bundle.[hash].js',
	},
output的filename中[name]参数对应入口的key值。
入口文件是主的js，里面会引入别的js（库，自己写得模块js）这样整个项目就串起来了。
8、
引入webpack4新的属性splitChunks，将公共模块打包出来，*注意* new HtmlWebpackPlugin中的chunks属性中加入公共模块的名字。chunks: ['other', 'commons']，优化项目。
9、
区别开发和生产模式，开发环境启动devServer（"webpack-dev-server"），package.json配置相应的script快捷方式，启动，默认8080端口。设置了mode这个属性，webpack会默认添加一些插件，这个见官网。如果没有"inline-source-map"，错误在浏览器将指向bundle文件，很难定位。
10、
loader做一些更专一的事情，比如css,less,js编译之类？post-css，css处理完后再处理一些事情，比如加前缀。
导入css也是通过import 'xxx'，它并没有通过style或link方式写入模板。现在再想webpack那个依赖图，感觉还是很有感觉的，webpack的思想就是将所有的css,js做作为一个模块依赖。
11、
引入关于css的loader和postcss.config.js后，style标签出现新的兼容样式。
.test::-webkit-input-placeholder {
	color: blue;
}
.test:-ms-input-placeholder {
	color: blue;
}
12、
output 的filename 由原来的 [hash] 变为 打包的hash[thunkhash],文件不变，它就不变
13、
js按需加载，安装 babel-plugin-syntax-dynamic-import 
loader 增加  plugins: ['transform-runtime', 'syntax-dynamic-import']
async await default ......
output 的 chunkFilename 并没有写，打包的时候也会出现1.bundle.xxx......2.bundle.xxx,照样可以修改打包后的名字。
14、
treeShaking 无用的代码不打包。前提不是按需加载。
presets: [['env', { modules: false }]]，其中{ modules: false }告诉webpack模块化不要编译。这样treeShaking才能识别。
3个条件见官网。
15、
修改项目目录，增加analysis.js
16、
 splitchunks 和dllplugin 2者有冲突，都分离公共模块。但是dllplugin应该能加快打包速度。
19、
node xxx，在node环境下运行
规范         导出                           导入
CommonJS    * modules.exports; exports    require
webpack xxx,webpack编译
ES6         export; export default        import；require
20、
使用dllplugin 模板中引入不同的库;
引入前:
打包时间 7324ms 3075ms 2178ms 2232ms
build:analysis 公共模块：common.bundle,mockjs,jquery,src/common
引入后：
build:dll 生成第三方文件
build
发现mockjs竟然打包了2份
externals: {
    'Mock': 'Mock'
},
这样整就没打包进去,
其实我觉得，只要配置了dllplugin，它就不会打包进去。事实也确实如此，先打包dll,再打包analysis,再去掉splitchunk看下就知道了。
打包时间 5422ms 2544ms 2703ms 2950ms
`后来把externals去掉，build:analysis发现mockjs也没打包进去，很是奇怪。不像缓存。修改了dll.config，确实需要删除manifest.json。否则Analyzer还是以前的。`
`关于externals引入没毛用的问题：似乎externals只能配cdn资源，并且map中value值都是特定值。比如
externals: {  'element-ui': 'ELEMENT'}`

https://webpack.docschina.org/configuration/externals/
https://segmentfault.com/a/1190000006087638
后来发现，index.bundle.js 和 login.bundle.js 有相似的地方 src/common，src/mocks
加上splitChunks，可以把公共的提取出来
htmlGenerator.js 中chunks增加 [jsFile, 'commons'],
像mockJs应该只在开发环境中使用。
21、
通过dllplugin引入ui库和框架
cnpm i vue@2.1.6 vue-resource@1.0.3 vue-router@2.3.0 element-ui@2.0.11 --save-dev
22、
安装合适版本的less和less-loader,并且合适的配置
test: /\.(css|less)$/,
23、
可以在导入时不使用扩展名
resolve.extensions: ['.js', '.css', '.vue', '.styl', '.html', '.less']
24、
解决vue中的jsx写法
https://github.com/vuejs/babel-plugin-transform-vue-jsx
25、
.vue
You may need an appropriate loader to handle this file type.
安装vue-loader。这个对版本也有要求。
{
  test: /\.vue$/,
  loader: 'vue',
  include: projectRoot,
  exclude: /node_modules/
},
26、
Module build failed vue.runtime.common TypeError: this._init is not a function
https://github.com/vuejs/vue-loader/issues/409
修改vue-loader
{
  test: /\.vue$/,
  loader: 'vue-loader',
  include: projectRoot,
  exclude: /node_modules/
},
还要安装vue-loader插件
https://github.com/symfony/webpack-encore/issues/311
27、
解决png loader
nav/logo.png Module parse failed You may need an appropriate loader to handle this file type.
 cnpm install --save-dev file-loader url-loader
15、
问题： 
什么情况下才支持类静态属性。(在线版的stage-0可以)
加载图片的loader,可以直接require,或者后台返回链接
happypack;
假如vue,element-ui,vue-resource,原生ajax。
shell脚本，运行大项目的子项目
pm2的应用。
external这个感觉有问题，反正mock是不不行。
css抽离。
cdn路径。
待支持less中写.xxx()函数，样式中双斜杠// 
chris项目。

### IoC 理念

#### 控制反转，依赖倒置 最终实现面向接口编程，而不是面向实现编程

##### 方式一，最直观的方式

```
app.js

import Router from './router';
import Track from './track';

class App {
  constructor(options) {
      this.options = options;
      this.router = new Router();
      this.track = new Track();
      this.init();
  }

  init() {
      window.addEventListener('DOMContentLoaded', () => {
          this.router.to('home');
          this.track.tracking();
          this.options.onReady();
      });
  }
}
export default App;


index.js

import App from './app';

new App({
    onReady() {
        // do something here...
        console.log('do something here...')
    },
});


弊端：
修改Router的history模式，new Router({ mode: 'history' })，这就不得不在 App 内部去修改这两个模块，这是一个 INNER BREAKING 的操作，而对于之前测试通过了的 App 来说，也必须重新测试。

```

##### 方式二，依赖注入

* 高层模块所依赖的模块通过传参的方式把依赖「注入」到模块内部

```
app.js

class App {
  constructor(options) {
      this.options = options;
      this.router = options.router;
      this.track = options.track;
      this.init();
  }
  init() {
      window.addEventListener('DOMContentLoaded', () => {
        this.router.to('home');
        this.track.tracking();
        this.options.onReady();
      });
  }
}


index.js

import Router from './router';
import Track from './track';

new App({
  router: new Router(),
  track: new Track(),
  onReady() {
      // do something here...
      console.log('do something here...')
  },
});

弊端：
给 App 添加一个分享模块 Share。这样的话又回到了上面所提到的 INNER BREAKING 的问题上：你不得不对 App 模块进行修改加上一行 this.share = options.share，这明显不是我们所期望的。

虽然 App 通过依赖注入的方式在一定程度上解耦了与其他几个模块的依赖关系，但是还不够彻底，其中的 this.router 和 this.track 等属性其实都还是对「具体实现」的依赖，明显违背了 IoC 思想的准则

```

##### 方式三，LOC

```
app.js

class App {
  // 需要安装babel,还未发布babel也不行
  static modules = []

  constructor(options) {
      this.options = options;
      this.init();
  }

  init() {
      window.addEventListener('DOMContentLoaded', () => {
        this.initModules();
        this.options.onReady(this);
      });
  }
  static use(module) {
      Array.isArray(module) ? module.map(item => App.use(item)) : App.modules.push(module);
  }
  initModules() {
      App.modules.map(module => module.init && typeof module.init == 'function' && module.init(this));
  }

}


index.js

App.use([Router, Track, Share]);

new App({
  router: {
      mode: 'history',
  },
  track: {
      // ...
  },
  onReady(app) {
      // app.options ...
      app.setShare({
        title: 'Hello IoC.',
        description: 'description here...',
        // some other data here...
      });
  },
});

router.js

class Router {
  constructor(){
    
  }
  to(name) {
    console.log('Router to....',name)
  }
}

export default {

  init(app) {
      app.router = new Router(app.options.router);
      app.router.to('home');
  }

};


从这个方法中可以看出，要实现一个可以被 App.use() 的模块，就必须满足两个「约定」：

模块必须包含 init 属性

init 必须是一个函数

这其实就是 IoC 思想中对「面向接口编程 而不要面向实现编程」这一准则的很好的体现。App 不关心模块具体实现了什么，只要满足对 接口 init 的「约定」就可以了。

总结：
App 模块此时应该称之为「容器」比较合适了，跟业务已经没有任何关系了，它仅仅只是提供了一些方法来辅助管理注入的依赖和控制模块如何执行。

控制反转（Inversion of Control）是一种「思想」，依赖注入（Dependency Injection）则是这一思想的一种具体「实现方式」，而这里的 App 则是辅助依赖管理的一个「容器」。
```

参考链接：
https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650588872&idx=1&sn=db86390b56263c1860e4dcf978971964&chksm=8891d6ecbfe65ffaf49377a70e1d5889dd367e1d4fc883351692820689aba9f611ba5441fc0f&mpshare=1&scene=1&srcid=&rd2werd=1#wechat_redirect
