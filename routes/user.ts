import * as express from 'express';
import { body } from 'express-validator';
import { login, register } from '../services/user/userService';

const router = express.Router();

// 登录/注册校验
const vaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误'),
];

// 重置密码校验
const resetPwdVaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('oldPassword').isString().withMessage('密码类型错误'),
  body('newPassword').isString().withMessage('密码类型错误'),
];

// 用户登录路由
router.post('/login', vaildator, login);

// 用户注册路由
router.post('/register', vaildator, register);

// 密码重置路由
// router.post('/resetPwd', resetPwdVaildator, service.resetPwd);

export default router;
