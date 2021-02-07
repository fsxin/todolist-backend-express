import md5 from '../../utils/md5';
import * as jwt from 'jsonwebtoken';
import * as boom from 'boom';
import { validationResult } from 'express-validator';
import { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } from '../../utils/constant';
import { IUser, findOneUser, saveUser } from './userSchema';

// 登录
export async function login(req: any, res: any, next: any) {
    const error: any = validationResult(req);
    // 如果验证错误，empty 不为空
    if (!error.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = error.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        try {
            let { username, password } = req.body;
            password = md5(password);
            let users: Array<IUser> = await findOneUser({ username, password });
            console.log(users);
            if (users?.length > 0) {
                const token = jwt.sign(
                    { username },
                    PRIVATE_KEY,
                    { expiresIn: JWT_EXPIRED }
                );
                let userData = {
                    username: users[0].username
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
        } catch(e) {
            res.json({
                code: CODE_ERROR,
                msg: e,
                data: null
            })
        }
    }
}

// 注册
export async function register(req: any, res: any, next: any) {
    const error: any = validationResult(req);
    if (!error.isEmpty()) {
        const [{ msg }] = error.errors;
        next(boom.badRequest(msg));
    } else {
        let { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res.json({
                code: CODE_ERROR,
                msg: '密码与确认密码不一致',
                data: null
            })
        }
        try {
            let users: Array<IUser> = await findOneUser({ username });
            if (users?.length > 0) {
                res.json({
                    code: CODE_ERROR,
                    msg: '用户已存在',
                    data: null
                });
            } else {
                password = md5(password);
                await saveUser({ username, password });
                res.json({
                    code: CODE_SUCCESS,
                    msg: '注册成功',
                    data: null,
                });
            }
        } catch (e) {
            res.json({
                code: CODE_ERROR,
                msg: e,
                data: null
            })
        }
    }
}

// 重置密码
// function resetPwd(req, res, next) {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         const [{ msg }] = error.errors;
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