### 创建一个https服务：

```
方法一： 

1、 参照链接，生成的文件应该在根目录下，不好找。配置基本webpack。

2、配置本地环境信任自签名根证书，打开macOS中的“钥匙串访问”应用， 信任生成证书。

3、签发域名SSL证书

4、本地host: 127.0.0.1 test.example.com

结果： 报这个错，openssl:Error: 'x509 -req -in test.example.com.csr' is an invalid command. 不知为什么。


方法二： 

快速生成本地证书，后怎么用。并且证书安装会报错。

用这种方法生成的证书，没什么卵用，即使转换.pem文件到.crt文件还是不行。最后虽然是https服务，但提示“您访问的链接不是私密链接”
openssl x509 -outform der -in your-cert.pem -out your-cert.crt

并且那个base64的key.pem(私匙)不知怎么用


方法三： 

这个cli怎么用，能自动启动一个https服务？


```

### 查看端口占用情况

```

sudo lsof -i :443(端口)

sudo kill -9 1304(PID)

```

### 命令中的\

```
\ 倒斜线
在交互模式下的escape 字元，有几个作用；放在指令前，有取消 aliases的作用；放在特殊符号前，则该特殊符号的作用消失；放在指令的最末端，表示指令连接下一行。
# type rmrm is aliased to `rm -i'# \rm ./*.log
上例，我在 rm 指令前加上 escape 字元，作用是暂时取消别名的功能，将 rm 指令还原。
# bkdir=/home# echo "Backup dir, \$bkdir = $bkdir"Backup dir,$bkdir = /home
上例 echo 内的 \$bkdir，escape 将 $ 变数的功能取消了，因此，会输出 $bkdir，而第二个 $bkdir则会输出变数的内容 /home。

```

### 参考链接

* 方法一： https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650588952&idx=1&sn=ced271d329e9e77cf5d97539e265a8d1&chksm=8891d73cbfe65e2a3c08c8de410afdd77ad6e513e0c130459f79ced68fbb536ec4736095b36b&mpshare=1&scene=1&srcid=&rd2werd=1#wechat_redirect

* 方法二： 快速生成本地证书 https://github.com/FiloSottile/mkcert

* 方法三： 一条龙自动自签发证书的轮子 https://www.npmjs.com/package/myca-cli