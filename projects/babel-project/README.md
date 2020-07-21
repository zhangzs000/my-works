cnpm i ava@1.0.0-beta.3 @babel/preset-env@7.0.0-beta.42 @babel/preset-stage-0@7.0.0-beta.42 @babel/register@7.0.0-beta.42 @babel/polyfill@7.0.0-beta.42 @babel/plugin-transform-runtime@7.0.0-beta.42 @babel/runtime@7.0.0-beta.42 --save-dev

package.json
{
  "scripts": {
    "test": "ava"
  },
  "ava": {
    "require": [
      "@babel/register",
      "@babel/polyfill"
    ]
  }
}

.babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ],
    "@babel/preset-stage-0"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

cnpm install webpack@4.16.0 webpack-cli webpack-dev-server --save-dev

参考链接：
https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650589068&idx=1&sn=971285ade41c09eedb169d4720d03df6&chksm=8891d7a8bfe65ebed033b4d461dd9750ce944b09fa3174d5bfb658e818717c42737f7b6331c0&mpshare=1&scene=1&srcid=&rd2werd=1#wechat_redirect


