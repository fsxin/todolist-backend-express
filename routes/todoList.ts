import * as express from 'express';
import {
  getTodoList,
  saveTodoList,
  updateTodoList,
  deleteTodoList,
} from '../services/todoList/todoListService';

const router = express.Router();

// 用户登录路由
router.get('/', getTodoList);
router.post('/', saveTodoList);
router.put('/', updateTodoList);
router.delete('/', deleteTodoList);

export default router;
