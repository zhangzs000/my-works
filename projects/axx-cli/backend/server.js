const express  = require('express');
let app =  express();
const port = 8080;
app.post('/publish/gerrit_login',(req, res)=>{
  let data = {body: 'aaa'};
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(data));
})

app.get('/getinfo',(req, res)=>{
  console.log('req.query: ',req.query)
  // 这一步JSONP必备
  var _callback = req.query.callback;
  // 这个responseData是后台要传回给前台的数据
  var responseData = { email: 'example@163.com', name: 'jaxu' };
  if (_callback){
      // 这两步设置发送也是NODE.JS发送JSONP必备
      res.type('text/javascript');
      res.send(_callback + '(' + JSON.stringify(responseData) + ')');
  }
  else{
      res.json(responseData);
  }
})

app.listen(port,()=>{
  console.log('listener...'+port)
})