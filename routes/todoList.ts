import * as express from 'express';
import { getTodoList, saveTodoList } from '../services/todoList/todoListService';

const router = express.Router();

// 用户登录路由
router.get('/', getTodoList);
router.post('/', saveTodoList);

export default router;