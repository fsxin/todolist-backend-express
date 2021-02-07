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

// 获取所有代办事项
export function getAll() {
    return new Promise((resolve, reject) => {
        todoListModel.find({}, (err: any, todoList: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(todoList);
            };
        });
    });
}

// 根据名称获取代办事项
export function getTodoItemByName(name: string) {
    return new Promise((resolve, reject) => {
        todoListModel.find({ name }, (err: any, todoItem: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(todoItem);
            }
        })
    })
}

// 保存代办事项
export function saveTodoItem(item: any) {
    return new Promise((resolve, reject) => {
        const newTodoList = new todoListModel(...item);
        newTodoList.save((err: any, docs: any) => {
            if (err) {
                reject(err);
            } else {
                resolve({});
            }
        });
    });
}