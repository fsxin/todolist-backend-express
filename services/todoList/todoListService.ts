import { CODE_ERROR, CODE_SUCCESS } from '../../utils/constant';
import { getAll, getTodoItemByName, saveTodoItem } from './todoListSchema';

// 获取代办事项列表
export async function getTodoList(req: any, res: any, next: any) {
    try {
        let todoList: any = await getAll();
        let { current = 1, size = 10 } = req.query;
        let end = current * size;
        let start = end - size;
        let todoListResult = todoList.slice(start, end);
        res.json({
            code: CODE_SUCCESS,
            data: {
                todoList: todoListResult,
                totalCount: todoList.length
            }
        });
    } catch(e: any) {
        res.json({
            code: CODE_ERROR,
            msg: e.err,
            data: null
        });
    };
}

// 保存待办事项
export async function saveTodoList(req: any, res: any, next: any) {
    let { name, content } = req.body;
    try {
        let todoItem: any = await getTodoItemByName(name);
        if (todoItem?.length > 0) {
            res.json({
                code: CODE_ERROR,
                msg: '名称重复',
                data: null
            })
            return;
        } else {
            await saveTodoItem({ name, content });
            res.json({
                code: CODE_SUCCESS,
                msg: '保存成功',
                data: null,
            });
        }
    } catch(e) {
        res.json({
            code: CODE_ERROR,
            msg: e.err,
            data: null
        });
    }
}