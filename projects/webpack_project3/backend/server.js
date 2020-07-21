const express = require('express');
const cors = require('cors');

const app = express();
const localPort = 4000
app.use(cors());

// 解析post的请求
const bodyParser = require('body-parser');
// 解析json
app.use(bodyParser.json());
// var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/token/bb', (req, res) => {
  const { role, password, username } = req.body;
  // // if (username === 'Chris') {
  // //   let srole = '3';
  // //   req.session.user = { name: username };
  // //   req.session.role = srole;
  console.log('req.body: ',role, password, username )
    res.send(
      success({
        username: 'respose name',
        role: 'respose role'
      })
    );
    return;
  	// res.send('abc')
  }
 )
app.get('/token/aa', urlencodedParser, (req, res) => {
  const { role, password, username } = req.body;
  // // if (username === 'Chris') {
  // //   let srole = '3';
  // //   req.session.user = { name: username };
  // //   req.session.role = srole;
  console.log('req.body: ',role, password, username )
    res.send(
      success({
        username: 'respose name',
        role: 'respose role'
      })
    );
    return;
  	// res.send('abc')
  })
.put('/token/cc', (req, res) => {
  const { role, password, username } = req.body;
  console.log('req.body: ',role, password, username )
  res.send(
    success({
      username: 'respose name',
      role: 'respose role'
    })
  );
  return;
})
.delete('/token/dd', (req, res) => {
  const { role, password, username } = req.body;
  console.log('req.body: ',role, password, username )
  res.send(
    success({
      username: 'respose name',
      role: 'respose role'
    })
  );
  return;
})
function success(data) {
	return {
      success: true,
      data: {
        body: data,
        status: 1
      }
	  };
}
app.listen(localPort, () => {
    console.log('http://127.0.0.1:%s')
})
// var express = require('express')
// var bodyParser = require('body-parser')

// const localPort = 4000
// var app = express()

// // create application/json parser
// var jsonParser = bodyParser.json()

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// app.get('/api', (req, res) => {
//     console.log('********************')
//     console.log(req.body)

//     res.end();
// })

// app.listen(localPort, () => {
//     console.log('http://127.0.0.1:%s', )
// })