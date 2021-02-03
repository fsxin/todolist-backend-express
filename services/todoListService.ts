import { CODE_ERROR, CODE_SUCCESS } from '../utils/constant';
import { todoListModel } from '../schemas';

// 获取文件列表
export function getTodoList(req: any, res: any, next: any) {
    let { current = 1, size = 10 } = req.query;
    let end = current * size;
    let start = end - size;
    todoListModel.find({}, (err: any, todoList: any) => {
        if (err) {
            res.json({
                code: CODE_ERROR,
                msg: err,
                data: null
            });
            return;
        }
        let todoListResult = todoList.slice(start, end);
        res.json({
            code: CODE_SUCCESS,
            data: {
                todoList: todoListResult,
                totalCount: todoList.length
            }
        });
    });
}