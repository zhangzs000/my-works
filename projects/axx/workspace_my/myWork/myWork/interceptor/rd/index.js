var http = require("http");
let fs=require("fs");

http.createServer(function(req,res){//回调函数
    console.log('httpVersion: ',req.httpVersion);
    console.log('headers: ',req.headers);
    console.log('method: ',req.method);
    console.log('url: ',req.url);
    console.log('trailers: ',req.trailers);
    console.log('complete: ',req.complete);
    console.log('__dirname: ',__dirname)
    // res.writeHead(200,{'Content-Type':'text/html'});
    console.log('aaa: ',req.url === '/a')
    
    if(req.url === '/a') {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.setHeader('token', '123456');
      res.setHeader("Access-Control-Allow-Origin","*");
      res.end("{body: {detail: 'abc'},status: 1,success: 1}");
    }
    if(req.url === '/b') {
      if (res.getHeader('token') === 'abc') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.setHeader('token', '123456');
        res.setHeader("Access-Control-Allow-Origin","*");
        res.end("{body: {detail: 'abc'},status: 1,success: 1}");
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin","*");
        res.end("{body:{},status: 0,errorMessage:'用户未登录'}");
      }
      
    }
    console.log(req.url,req.url === '/page1')
    if(req.url === '/page1') {
     
      //设置编码
      res.setHeader('Content-Type','text/html;charset=utf-8');
      fs.createReadStream(__dirname+'/static/index.html').pipe(res);
      
    }
    // res.write("holloe  world")    
    
}).listen(8000);
