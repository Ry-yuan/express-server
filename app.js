const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/router.js');
const config = require('./config/config');
const mongodbConnect = require('./config/mongodb-connect');
const session = require('express-session');
const MongoseStroe = require('connect-mongo')(session);
//连接mongodb数据库
mongodbConnect();
// 应用session中间件
app.use(session({
  secret: 'sid',
  resave: false,
  saveUninitialized: true,
  store:new MongoseStroe({url:config.mongosePath}), //使用mongodb存储session
  cookie: {
      maxAge: 60000 * 1 // 有效期，单位是毫秒
  }
}));
// 静态资源
app.use(express.static('public'));
// 解析post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// 解析cookie
app.use(cookieParser());
// api
app.use('/api', router);
// 跨域支持
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'x-Request-with')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '4.15.2')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next() //执行下一个中间件。
});
app.listen(config.port,()=>{
  console.log('application run at port: ', config.port);
});