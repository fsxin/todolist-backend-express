import * as jwt from 'jsonwebtoken'; // 引入验证jsonwebtoken模块
import * as expressJwt from 'express-jwt'; // 引入express-jwt模块
import { PRIVATE_KEY } from './constant'; // 引入自定义的jwt密钥

// 验证token是否过期
export const jwtAuth = expressJwt({
  algorithms: ['HS256'],
  // 设置密钥
  secret: PRIVATE_KEY,
  // 设置为 true 表示校验，设置为 false 表示不校验
  credentialsRequired: true,
  // 自定义获取 token 函数
  getToken: (req: any) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({
  // 设置 jwt 认证白名单
  path: ['/', '/api/user/login', '/api/user/register', '/api/user/resetPwd'],
});

// jwt 解析
// export function decode(req: any) {
//     const token = req.get('Authorization');
//     console.log("verify >>>>>>>>>>>")
//     console.log(token)
//     return jwt.verify(token, PRIVATE_KEY);
// }
