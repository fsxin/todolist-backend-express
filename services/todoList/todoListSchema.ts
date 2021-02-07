import mongoose from '../../utils/dbConfig';

const ToDoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    finishTime: Number,
    createTime: Number
})

const todoListModel = mongoose.model('TodoList', ToDoListSchema, 'todolist');

export interface ITodoItem {
    name: string;
    content?: string;
    finishTime?: number;
    createTime?: number;
}

// 获取所有代办事项
export function getAll(): Promise<ITodoItem[]> {
    return new Promise((resolve, reject) => {
        todoListModel.find({}, (error: any, todoList: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(todoList);
            };
        });
    });
}

// 根据名称获取代办事项
export function getTodoItemByName(name: string): Promise<ITodoItem[]> {
    return new Promise((resolve, reject) => {
        todoListModel.find({ name }, (error: any, todoItem: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(todoItem);
            }
        })
    })
}

// 保存代办事项
export function saveTodoItem(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
        const newTodoList = new todoListModel({...item});
        newTodoList.save((error: any, docs: any) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}