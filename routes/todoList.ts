import * as express from 'express';
import { getTodoList } from '../services/todoListService';

const router = express.Router();

// 用户登录路由
router.get('/', getTodoList);

export default router;