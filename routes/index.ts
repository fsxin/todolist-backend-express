import * as express from 'express';
import userRouter from './user';
import todoListRouter from './todoList';
import { jwtAuth } from '../utils/user-jwt'; // 引入jwt认证函数
const router = express.Router(); // 注册路由 

router.use(jwtAuth); // 注入认证模块

router.use('/api/user', userRouter); // 注入 user 路由模块
router.use('/api/todolist', todoListRouter); 

// 自定义统一的异常处理中间件，需要放到代码最后
router.use((err: any, req: any, res: any, next: any) => {
    if (err && err.name === 'UnauthorizedError') {
        const { status = 401, message } = err;
        // 抛出401异常
        res.status(status).json({
            code: status,
            msg: 'token失效，请重新登录',
            data: null
        });
    } else {
        const { output } = err || {};
        // 错误码和错误信息
        const errCode = (output && output.statusCode) || 500;
        const errMsg = (output && output.payload && output.payload.error) || err.message;
        res.status(errCode).json({
            code: errCode,
            msg: errMsg
        });
    }
});

export default router;