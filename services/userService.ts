import md5 from '../utils/md5';
import * as jwt from 'jsonwebtoken';
import * as boom from 'boom';
import { validationResult } from 'express-validator';
import { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } from '../utils/constant';
import { userModel } from '../schemas';

// 登录
export function login(req: any, res: any, next: any) {
    const err: any = validationResult(req);
    // 如果验证错误，empty 不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let { username, password } = req.body;
        // md5 加密
        password = md5(password);
        userModel.find({ username, password }, (err: any, user: any) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    msg: err,
                    data: null
                });
                return;
            }
            if (user && user.length) {
                // 登录成功，签发一个token并返回给前端
                const token = jwt.sign(
                    // payload：签发的 token 里面要包含的一些数据。
                    { username },
                    // 私钥
                    PRIVATE_KEY,
                    // 设置过期时间
                    { expiresIn: JWT_EXPIRED }
                );

                let userData = {
                    id: user[0].id,
                    username: user[0].username,
                    // nickname: user[0].nickname,
                    // avator: user[0].avator,
                    // sex: user[0].sex,
                    // gmt_create: user[0].gmt_create,
                    // gmt_modify: user[0].gmt_modify
                };

                res.json({
                    code: CODE_SUCCESS,
                    msg: '登录成功',
                    data: {
                        token,
                        userData
                    }
                });
            } else {
                res.json({
                    code: CODE_ERROR,
                    msg: '用户名或密码错误',
                    data: null
                })
            }
        });
    }
}

// 注册
export function register(req: any, res: any, next: any) {
    const err: any = validationResult(req);
    if (!err.isEmpty()) {
        const [{ msg }] = err.errors;
        next(boom.badRequest(msg));
    } else {
        let { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res.json({
                code: CODE_ERROR,
                msg: '密码与确认密码不一致',
                data: null
            })
            return;
        }
        userModel.find({ username }, (err: any, docs: any) => {
            if (err) {
                res.json({
                    code: CODE_ERROR,
                    msg: '注册失败',
                    data: null
                })
                return;
            }
            if (docs && docs.length) {
                res.json({
                    code: CODE_ERROR,
                    msg: '用户已存在',
                    data: null
                });
            } else {
                password = md5(password);
                const newUser = new userModel({ username, password });
                newUser.save((err: any, docs: any) => {
                    if (err) {
                        res.json({
                            code: CODE_ERROR,
                            msg: '注册失败',
                            data: null
                        })
                        return;
                    }
                    res.json({
                        code: CODE_SUCCESS,
                        msg: '注册成功',
                        data: null,
                    });
                });
            }
        });
    }
}

// 重置密码
// function resetPwd(req, res, next) {
//     const err = validationResult(req);
//     if (!err.isEmpty()) {
//         const [{ msg }] = err.errors;
//         next(boom.badRequest(msg));
//     } else {
//         let { username, oldPassword, newPassword } = req.body;
//         oldPassword = md5(oldPassword);
//         validateUser(username, oldPassword) .then(data => {
//             if (data) {
//                 if (newPassword) {
//                     newPassword = md5(newPassword);
//                     const query = `update sys_user set password='${newPassword}' where username='${username}'`;
//                     querySql(query).then(user => {
//                         if (!user || user.length === 0) {
//                             res.json({ 
//                                 code: CODE_ERROR, 
//                                 msg: '重置密码失败', 
//                                 data: null 
//                             });
//                         } else {
//                             res.json({ 
//                                 code: CODE_SUCCESS, 
//                                 msg: '重置密码成功', 
//                                 data: null
//                             });
//                         }
//                     });
//                 } else {
//                     res.json({ 
//                         code: CODE_ERROR, 
//                         msg: '新密码不能为空', 
//                         data: null 
//                     });
//                 }
//             } else {
//                 res.json({ 
//                     code: CODE_ERROR, 
//                     msg: '用户名或旧密码错误', 
//                     data: null 
//                 });
//             }
//         });
//     }
// }

// // 校验用户名和密码
// function validateUser(username, oldPassword) {
//     const query = `select id, username from sys_user where username='${username}' and password='${oldPassword}'`;
//     return queryOne(query);
// }

// // 通过用户名查询用户信息
// function findUser(username) {
//     const query = `select id, username from sys_user where username='${username}'`;
//     return queryOne(query);
// }