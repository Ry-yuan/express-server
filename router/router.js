//新建一个router
const router = require('express').Router();
//controllers
const userController = require('./../controllers/user_controller');
// 获取用户信息
router.get('/userinfo',userController.getUserInfo);
// 注册接口
router.post('/register',userController.addUser);
// 登陆接口
router.post('/login',userController.verifyUser);

module.exports = router;