# axx-cli
> https://github.com/gaosife/axx-cli


## Install

```sh
    npm install axx-cli -g
```

## Command
### init

```sh
    axx build init <option>
```
```
Options:
    -b, --begin   初始化一个空项目（暂无）
    -c, --config  初始化配置文件
    -s, --start   执行配置文件
```

### service

```sh
    axx build service <option>
```

```
Options:
    -b, --build  启动编译
    -d, --dev    启动本地调试
```

### add

```sh
    axx build add <npm package name>
```

## 初始化
- axx build init -c
- axx build init -s
## 调试
- axx build service -d 
## 打包
- axx build service -b

## 使用redux
- cd project
- cnpm i
- test1
## 测试后端
- /backend

### 把webpack的config配置都拷贝到本地项目，避免全局安装
### webpack 配置项的优化 optimization dllplugin放在development 