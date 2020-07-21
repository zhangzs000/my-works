#aixuexi-train

> 爱学习-培训

## 安装git

Windows下面下载安装。
Mac用户可以看下网络教程。

## 注册coding.net 

可以用公司邮箱注册，最好使用真实姓名的全拼，然后发给组长，加入群组。

## 生成ssh-key

1：执行命令 ssh-keygen -t rsa 然后一直回车

2：cat ~/.ssh/id_rsa.pub 复制公钥

3：进入coding.net，个人设置-》ssh公钥 添加公钥

## clone代码

```git
clone代码
git clone git@git.coding.net:baiyunfei/aixuexi-train.git

子模块初始化
git submodule init && git submodule update

子模块从master检出
cd build && git checkout master && git pull
cd ../src/common && git checkout master && git pull && cd ../..

```

## 安装node

首先你需要安装node,版本 5.0以上。安装办法Google一下吧。
node 在Windows下面 可能需要配置一下变量环境。

接下来 打开`terminal` 或者`git bash` npm 就可以用了



## Build Setup

``` bash
切换dev分支
git checkout dev

# install dependencies
npm install
可以使用: cnpm install 不过可能报错或run不起来, 需要再重新npm install

# serve with hot reload at localhost:8080
npm run dev
注意:
1 config/index.js 的 dev.proxyTable 中跨域代理的地址(默认是线上), 根据开发环境进行配置

# build for production with minification
npm run build
打包时候需要注意:
1 src/config.js 中 IS_MOCK 需要关闭
2 config/index.js 中的 assetsPublicPath为静态资源目录, 需要跟服务端约定位置 或 对应cdn域名路径

# build for production with source-map and watching when modified
npm run build:dev

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# 更新 build层 和 common层 的新子模块
npm run us

```

 
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 上线流程
1 合并dev
2 合并master
3 打tag

## tag 格式

通用层打标签格式: v时间(精准到分钟)_上线内容
@example: v201704011212_addTarget
