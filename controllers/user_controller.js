const User = require('../models/user_model');
const crypto = require('crypto');
let userController = {
  addUser: (req, res) => {
    let username = req.body.name;
    let password = crypto.createHash('md5').update(req.body.password).digest('hex');
    let user = new User({
      name: username,
      password: password,
      age: req.body.age,
      sex: req.body.sex
    });
    User.find({
      name: username
    }, function (err, result) {
      if (result.length !== 0) {
        res.send(JSON.stringify({
          code: 1000,
          msg: 'user haved existed'
        }));
        return false;
      }
      user.save(err => {
        if (err) {
          res.status(500);
          return;
        }
        res.send(JSON.stringify({
          code: 0,
          msg: 'success'
        }));
      });
    });
  },

  getUserInfo: (req, res) => {
    // get获取参数:req.query
    User.findOne({
      name: req.query.name
    }, (err, result) => {
      if (err) {
        res.status(500);
        return;
      }
      if (result === null) {
        res.send(JSON.stringify({
          code: 1001,
          msg: 'unexist this user'
        }));
        return;
      }
      let data = {
        name: result.name,
        age: result.age,
        sex: result.sex
      }
      res.send(JSON.stringify({
        code: 0,
        data: data,
        msg: 'success'
      }));
    });
  },

  verifyUser: (req, res) => {
    // 获得数据
    let data = req.body;
    // 查找用户
    User.findOne({
      name: data.name
    }, (err, result) => {
      if (err) {
        res.status(500);
        return;
      }
      // 存在账号
      if (result !== null) {
        // 判断密码是否相同
        let cryptPassword = crypto.createHash('md5').update(data.password).digest('hex');
        if (result.password == cryptPassword) {
          let sid = req.session.id;
          // 发送cookies 来识别已登陆
          res.cookie('sid', req.session.id);
          // 关联sid 和 username
          req.session[sid] = data.name;
          res.json({
            code: 0,
            data: {},
            msg: 'success'
          });
        } else {
          res.json({
            code: 1002,
            data: {},
            msg: 'password error!'
          });
        }
      }
      // 不存在
      else {
        res.json({
          code: 1001,
          data: {},
          msg: 'unexist this user'
        });
      }
    })
  }
}

module.exports = userController;