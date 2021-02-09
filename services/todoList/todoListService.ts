import { CODE_ERROR, CODE_SUCCESS } from '../../utils/constant';
import { ITodoItem, getAll, getTodoItemByName, saveTodoItem, getTodoItemById, updateTodoItem, deleteTodoItemById } from './todoListSchema';

// 获取代办事项列表
export async function getTodoList(req: any, res: any, next: any) {
    try {
        let todoList: ITodoItem[] = await getAll();
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
    } catch(e) {
        res.json({
            code: CODE_ERROR,
            msg: e,
            data: null
        });
    };
}

// 保存待办事项
export async function saveTodoList(req: any, res: any, next: any) {
    let { name, content } = req.body;
    try {
        let todoItem: ITodoItem[] = await getTodoItemByName(name);
        if (todoItem?.length > 0) {
            res.json({
                code: CODE_ERROR,
                msg: '名称重复',
                data: null
            })
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
            msg: e,
            data: null
        });
    }
}

export async function updateTodoList(req: any, res: any, next: any) {
    let { _id, name, isFinished, content } = req.body;
    try {
        let todoItem: ITodoItem[] = await getTodoItemById(_id);
        if (todoItem?.length > 0) {
            if (isFinished) {
                await updateTodoItem({ _id, isFinished, finishTime: new Date().getTime()});
            } else {
                await updateTodoItem({ _id, name, content });
            }
            res.json({
                code: CODE_SUCCESS,
                msg: '修改成功',
                data: null,
            });
        } else {
            res.json({
                code: CODE_ERROR,
                msg: '代办事项不存在',
                data: null
            })
        }
    } catch(e) {
        res.json({
            code: CODE_ERROR,
            msg: e,
            data: null
        });
    }
}

export async function deleteTodoList(req: any, res: any, next: any) {
    let { _id } = req.body;
    try {
        await deleteTodoItemById( _id);
        res.json({
            code: CODE_SUCCESS,
            msg: '删除成功',
            data: null,
        });
    } catch(e) {
        res.json({
            code: CODE_ERROR,
            msg: e,
            data: null
        });
    }
}